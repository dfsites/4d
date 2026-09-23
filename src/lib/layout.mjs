import { absoluteUrl, esc } from './html.mjs';
import { buildSchema } from './schema.mjs';
import { footer, header } from './components.mjs';

export function breadcrumbNav(page) {
  if (!page.breadcrumb?.length) return '';
  const items = [{ name: 'Início', path: '/' }, ...page.breadcrumb];
  const li = items.map((item, i) => (i === items.length - 1
    ? `<li aria-current="page">${esc(item.name)}</li>`
    : `<li><a href="${item.path}">${esc(item.name)}</a></li>`)).join('');
  return `<nav class="breadcrumb container" aria-label="Você está em"><ol>${li}</ol></nav>`;
}

function googleTag(config) {
  const id = config.analytics?.googleId;
  if (!id) return '';
  return `
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=${esc(id)}"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${esc(id)}');
  </script>`;
}

export function layout(config, page, body) {
  const canonical = absoluteUrl(config, page.path);
  const schema = page.noindex ? '' : `
  <script type="application/ld+json">${JSON.stringify(buildSchema(config, page))}</script>`;
  const indexing = page.noindex
    ? '<meta name="robots" content="noindex, follow">'
    : `<link rel="canonical" href="${canonical}">`;

  return `<!DOCTYPE html>
<html lang="${config.language}">
<head>${googleTag(config)}
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(page.title)}</title>
  <meta name="description" content="${esc(page.description)}">
  ${indexing}
  <meta property="og:type" content="website">
  <meta property="og:locale" content="${config.locale}">
  <meta property="og:site_name" content="${esc(config.brandName)}">
  <meta property="og:title" content="${esc(page.title)}">
  <meta property="og:description" content="${esc(page.description)}">
  <meta property="og:url" content="${canonical}">
  <meta name="twitter:card" content="summary">
  <meta name="theme-color" content="#5b3df5">
  <link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
  <link rel="preload" href="/assets/fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="/assets/css/style.css?v=${page.assetVersion}">
  <script>document.documentElement.classList.add('js')</script>${schema}
</head>
<body>
  <a class="pular" href="#conteudo">Pular para o conteúdo</a>
  ${header(config, page.nav)}
  <main id="conteudo" tabindex="-1">
    ${breadcrumbNav(page)}
    ${body}
  </main>
  ${footer(config)}
  <script src="/assets/js/main.js?v=${page.assetVersion}" defer></script>
</body>
</html>
`;
}
