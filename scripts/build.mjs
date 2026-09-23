import { createHash } from 'node:crypto';
import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { companyConfig } from '../src/config/companyConfig.mjs';
import { absoluteUrl, pageUpdatedAt } from '../src/lib/html.mjs';
import { layout } from '../src/lib/layout.mjs';
import * as home from '../src/pages/home.mjs';
import * as sobre from '../src/pages/sobre.mjs';
import * as metodo from '../src/pages/metodo4d.mjs';
import * as privacidade from '../src/pages/privacidade.mjs';
import * as termos from '../src/pages/termos.mjs';
import * as notFound from '../src/pages/404.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, 'src');
const out = join(root, 'site');

export const pages = [home, sobre, metodo, privacidade, termos, notFound];

function outputFile(page) {
  if (page.output) return page.output;
  return join(page.path.replace(/^\/|\/$/g, ''), 'index.html');
}

async function assetVersion() {
  const hash = createHash('sha1');
  for (const f of ['assets/css/style.css', 'assets/js/main.js']) {
    hash.update(await readFile(join(src, f)));
  }
  return hash.digest('hex').slice(0, 10);
}

function manifest(config) {
  return {
    name: config.brandName,
    short_name: '4D',
    description: config.description,
    lang: config.language,
    start_url: '/',
    scope: '/',
    display: 'browser',
    background_color: '#ffffff',
    theme_color: '#5b3df5',
    icons: [
      { src: '/assets/img/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/assets/img/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/assets/img/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}

// Conservador: não mexe em espaços dentro de valores (calc, seletores descendentes).
export function minifyCss(css) {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{};,>])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim();
}

function minifyHtml(html) {
  return html.split('\n').map((line) => line.trim()).filter(Boolean).join('\n');
}

export async function build(config = companyConfig) {
  await rm(out, { recursive: true, force: true });
  await mkdir(out, { recursive: true });
  await cp(join(src, 'assets'), join(out, 'assets'), { recursive: true });
  for (const f of await readdir(join(src, 'static'))) {
    await cp(join(src, 'static', f), join(out, f));
  }

  const version = await assetVersion();
  const css = minifyCss(await readFile(join(src, 'assets/css/style.css'), 'utf8'))
    .replaceAll('url("../fonts/', 'url("/assets/fonts/');
  await rm(join(out, 'assets/css'), { recursive: true, force: true });
  const written = [];
  for (const mod of pages) {
    const page = { ...mod.page, assetVersion: version, css };
    const file = join(out, outputFile(page));
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, `${minifyHtml(layout(config, page, mod.render(config)))}\n`);
    written.push(page);
  }

  const urls = written
    .filter((p) => p.sitemap !== false && !p.noindex)
    .map((p) => `  <url>\n    <loc>${absoluteUrl(config, p.path)}</loc>\n    <lastmod>${pageUpdatedAt(config, p)}</lastmod>\n  </url>`)
    .join('\n');
  await writeFile(join(out, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);

  await writeFile(join(out, 'robots.txt'),
    `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl(config, '/sitemap.xml')}\n`);

  await writeFile(join(out, 'site.webmanifest'), `${JSON.stringify(manifest(config), null, 2)}\n`);
  return written;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const written = await build();
  console.log(`Build concluído: ${written.length} páginas em site/`);
}
