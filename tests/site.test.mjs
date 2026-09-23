import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { build } from '../scripts/build.mjs';
import { companyConfig } from '../src/config/companyConfig.mjs';
import { footer, projectsSection, contactLinks, socialLinks, navItems } from '../src/lib/components.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const site = join(root, 'site');
const html = {};

async function walk(dir) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(p));
    else files.push(p);
  }
  return files;
}

function fileForUrl(url) {
  const path = new URL(url, companyConfig.canonicalUrl).pathname;
  return path.endsWith('/') ? join(site, path, 'index.html') : join(site, path);
}

before(async () => {
  const pages = await build();
  for (const p of pages) {
    const f = p.output ? join(site, p.output) : fileForUrl(p.path);
    html[p.path] = await readFile(f, 'utf8');
  }
});

test('rotas obrigatórias existem e /contato não existe sem canal confirmado', () => {
  for (const p of ['/', '/sobre/', '/metodo-4d/', '/politica-de-privacidade/', '/termos-de-uso/', '/404.html']) {
    assert.ok(html[p], `falta ${p}`);
  }
  assert.equal(html['/contato/'], undefined);
});

test('cada página tem exatamente um H1', () => {
  for (const [path, doc] of Object.entries(html)) {
    assert.equal((doc.match(/<h1[\s>]/g) || []).length, 1, path);
  }
});

test('remoções obrigatórias: redes sociais, depoimentos, formulário e contatos não confirmados', async () => {
  const files = (await walk(site)).filter((f) => /\.(html|css|js|xml|txt)$/.test(f));
  for (const f of files) {
    const doc = await readFile(f, 'utf8');
    assert.doesNotMatch(doc, /instagram|facebook|twitter\.com|linkedin\.com|tiktok|youtube/i, f);
    assert.doesNotMatch(doc, /depoiment|testimonial|nome do cliente|avalia[çc][õo]es/i, f);
    assert.doesNotMatch(doc, /<form|<input|<textarea|type="submit"/i, f);
    assert.doesNotMatch(doc, /mailto:|tel:|wa\.me|whatsapp/i, f);
    assert.doesNotMatch(doc, /comprovado|garantid|revolucion|fórmula definitiva|vagas abertas|inscrições abertas|compre agora/i, f);
  }
});

test('dados da empresa ficam no rodapé de todas as páginas (e não no corpo da Home e de /sobre)', () => {
  const { cnpj, address } = companyConfig;
  for (const p of ['/', '/sobre/']) {
    const main = html[p].split('<main')[1].split('</main>')[0];
    assert.ok(!main.includes(cnpj), `CNPJ não deve estar no corpo de ${p}`);
  }
  for (const [path, doc] of Object.entries(html)) {
    const foot = doc.split('<footer')[1];
    assert.ok(foot.includes(cnpj), `CNPJ no rodapé de ${path}`);
    assert.ok(foot.includes(address.street), `endereço no rodapé de ${path}`);
    assert.ok(foot.includes(`© ${new Date().getFullYear()} Todos os direitos reservados.`), `copyright em ${path}`);
    assert.ok(foot.includes(`${companyConfig.legalName} · CNPJ ${cnpj} · ${address.street}`), `linha legal em ${path}`);
  }
});

test('dados oficiais corretos na configuração central', () => {
  assert.equal(companyConfig.legalName, '4D Desenvolvimento Pessoal Ltda.');
  assert.equal(companyConfig.cnpj, '49.142.726/0001-58');
  assert.equal(companyConfig.address.street, 'Av. Prefeito Osmar Cunha, 416');
  assert.equal(companyConfig.address.zip, '88015-100');
  assert.equal(companyConfig.canonicalUrl, 'https://www.4ddesenvolvimentopessoal.com.br/');
  assert.deepEqual(companyConfig.socialLinks, []);
  assert.equal(companyConfig.contact.confirmed, false);
});

test('schema: Organization, WebSite e WebPage válidos, sem campos inventados', () => {
  for (const [path, doc] of Object.entries(html)) {
    if (path === '/404.html') {
      assert.doesNotMatch(doc, /application\/ld\+json/);
      assert.match(doc, /noindex/);
      continue;
    }
    const json = JSON.parse(doc.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
    const types = json['@graph'].map((n) => n['@type']);
    assert.ok(types.includes('Organization'));
    assert.ok(types.includes('WebSite'));
    assert.ok(types.some((t) => t === 'WebPage' || t === 'AboutPage'));
    if (path !== '/') assert.ok(types.includes('BreadcrumbList'), path);
    const org = json['@graph'].find((n) => n['@type'] === 'Organization');
    assert.equal(org.taxID, '49.142.726/0001-58');
    assert.equal(org.legalName, '4D Desenvolvimento Pessoal Ltda.');
    assert.equal(org.address.addressCountry, 'BR');
    for (const k of ['sameAs', 'telephone', 'contactPoint', 'founder', 'foundingDate', 'email']) {
      assert.equal(org[k], undefined, `${k} não deve existir`);
    }
  }
});

test('canonical, sitemap e robots consistentes', async () => {
  for (const [path, doc] of Object.entries(html)) {
    if (path === '/404.html') continue;
    assert.ok(doc.includes(`<link rel="canonical" href="${new URL(path, companyConfig.canonicalUrl).href}">`), path);
  }
  const sitemap = await readFile(join(site, 'sitemap.xml'), 'utf8');
  const locs = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
  assert.equal(locs.length, 5);
  for (const loc of locs) {
    assert.ok(loc.startsWith(companyConfig.canonicalUrl));
    await stat(fileForUrl(loc));
  }
  assert.ok(!sitemap.includes('404'));
  const robots = await readFile(join(site, 'robots.txt'), 'utf8');
  assert.match(robots, /Sitemap: https:\/\/www\.4ddesenvolvimentopessoal\.com\.br\/sitemap\.xml/);
});

test('links internos e âncoras apontam para destinos existentes', async () => {
  for (const [path, doc] of Object.entries(html)) {
    const ids = new Set([...doc.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
    assert.equal(ids.size, [...doc.matchAll(/\sid="([^"]+)"/g)].length, `ids duplicados em ${path}`);
    for (const [, href] of doc.matchAll(/href="([^"]+)"/g)) {
      if (/^https?:/.test(href)) continue;
      const [target, hash] = href.split('#');
      if (!target) { assert.ok(ids.has(hash), `âncora #${hash} em ${path}`); continue; }
      const clean = target.split('?')[0];
      await stat(fileForUrl(clean));
      if (hash) {
        const other = html[clean] ?? '';
        assert.ok(other.includes(`id="${hash}"`), `âncora ${href} em ${path}`);
      }
    }
  }
});

test('imagens têm alt e a Home não usa avatar fictício', () => {
  for (const [path, doc] of Object.entries(html)) {
    for (const [tag] of doc.matchAll(/<img\b[^>]*>/g)) assert.match(tag, /\salt="/, path);
  }
  assert.doesNotMatch(html['/'], /<img[^>]*responsavel__foto/);
});

test('seções condicionais: projetos, contato e redes sociais', () => {
  const vazio = projectsSection(companyConfig);
  assert.doesNotMatch(vazio, /class="projeto"/);
  assert.doesNotMatch(vazio, /<ul class="projetos">/);

  const comProjeto = projectsSection({
    ...companyConfig,
    projects: [{ name: 'Projeto X', slug: 'x', description: 'Descrição', category: 'Plataforma', url: 'https://exemplo.com', status: 'Publicado', cta: 'Acessar' }],
  });
  assert.match(comProjeto, /class="projeto"/);
  assert.match(comProjeto, /Projeto X/);

  assert.equal(contactLinks(companyConfig), '');
  assert.equal(contactLinks({ ...companyConfig, contact: { email: 'a@b.com', phone: null, whatsapp: null, confirmed: false } }), '');
  assert.match(contactLinks({ ...companyConfig, contact: { email: 'a@b.com', phone: null, whatsapp: null, confirmed: true } }), /mailto:a@b\.com/);
  assert.ok(!navItems(companyConfig).some((i) => i.href === '/contato/'));

  assert.equal(socialLinks(companyConfig), '');
  assert.doesNotMatch(footer(companyConfig), /class="social"/);
});

test('posicionamento: empresa, Método 4D, dois eixos, organizações e segmentos', () => {
  const home = html['/'];
  for (const termo of ['Descobrir', 'Decidir', 'Desenvolver', 'Destacar', 'Método 4D',
    'Educação e desenvolvimento', 'Soluções digitais e organizacionais',
    'Igrejas e comunidades', 'Empresas e organizações', 'Profissionais e especialistas']) {
    assert.ok(home.includes(termo), termo);
  }
  const ordem = ['id="inicio"', 'id="sobre"', 'id="metodo"', 'id="atuacao"', 'id="organizacoes"', 'id="aplicado"', 'id="responsavel"'].map((s) => home.indexOf(s));
  assert.ok(ordem.every((i) => i >= 0), 'todas as seções existem');
  assert.deepEqual([...ordem].sort((a, b) => a - b), ordem, 'ordem Empresa → Método → Soluções');
  assert.match(home, /class="cubo"/, 'cubo original preservado');
});

test('Google Analytics presente em todas as páginas e declarado na Política de Privacidade', () => {
  const id = companyConfig.analytics.googleId;
  assert.match(id, /^G-[A-Z0-9]+$/);
  for (const [path, doc] of Object.entries(html)) {
    assert.ok(doc.includes(`googletagmanager.com/gtag/js?id=${id}`), `gtag ausente em ${path}`);
    assert.ok(doc.includes(`gtag('config', '${id}')`), `config ausente em ${path}`);
  }
  const politica = html['/politica-de-privacidade/'];
  assert.match(politica, /Google Analytics/);
  assert.doesNotMatch(politica, /não utiliza cookies/);
});

test('SEO: títulos, descrições, Open Graph, ícones, manifesto e datas', async () => {
  const titles = new Set();
  const descriptions = new Set();
  for (const [path, doc] of Object.entries(html)) {
    const title = doc.match(/<title>(.*?)<\/title>/)[1];
    const description = doc.match(/<meta name="description" content="(.*?)">/)[1];
    assert.ok(title.length <= 60, `título longo em ${path}: ${title.length}`);
    assert.ok(description.length >= 70 && description.length <= 160, `descrição fora do padrão em ${path}: ${description.length}`);
    titles.add(title);
    descriptions.add(description);
    for (const tag of ['og:image"', 'og:image:alt', 'twitter:card" content="summary_large_image', 'rel="apple-touch-icon"', 'rel="manifest"', 'href="/favicon.ico"']) {
      assert.ok(doc.includes(tag), `${tag} ausente em ${path}`);
    }
  }
  assert.equal(titles.size, Object.keys(html).length, 'títulos duplicados');
  assert.equal(descriptions.size, Object.keys(html).length, 'descrições duplicadas');

  for (const f of ['favicon.ico', 'assets/img/og-4d.png', 'assets/img/apple-touch-icon.png', 'assets/img/icon-192.png', 'assets/img/icon-512.png', 'assets/img/icon-maskable-512.png']) {
    assert.ok((await stat(join(site, f))).size > 0, f);
  }
  const manifest = JSON.parse(await readFile(join(site, 'site.webmanifest'), 'utf8'));
  assert.equal(manifest.name, companyConfig.brandName);
  for (const icon of manifest.icons) await stat(join(site, icon.src));

  const json = JSON.parse(html['/'].match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
  const org = json['@graph'].find((n) => n['@type'] === 'Organization');
  assert.ok(org.logo.url.endsWith('/assets/img/icon-512.png'));
  const pagina = json['@graph'].find((n) => n['@type'] === 'WebPage');
  assert.equal(pagina.dateModified, companyConfig.contentUpdatedAt);

  const sitemap = await readFile(join(site, 'sitemap.xml'), 'utf8');
  assert.match(sitemap, new RegExp(`politica-de-privacidade/</loc>\\s*<lastmod>${companyConfig.legalUpdatedAt}`));
});

test('Método 4D: página própria com entradas, saídas, exemplo, limites e dúvidas', () => {
  const doc = html['/metodo-4d/'];
  for (const t of ['O que entra', 'O que sai', 'Exemplo aplicado', 'Exemplo ilustrativo', 'Limites do método', 'Dúvidas frequentes', 'Próximo passo']) {
    assert.ok(doc.includes(t), t);
  }
  assert.doesNotMatch(doc, /FAQPage/);
  for (const path of ['/', '/sobre/']) assert.ok(html[path].includes('href="/metodo-4d/"'), `sem link para /metodo-4d/ em ${path}`);
  assert.match(html['/'], /<h1 id="hero-titulo">.*Método 4D.*Desenvolvimento em <span class="destaque">quatro dimensões<\/span>\.<\/span><\/h1>/s);
});

test('schema: Person do responsável somente onde ele aparece, sem credenciais inventadas', () => {
  const graph = (path) => JSON.parse(html[path].match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1])['@graph'];
  for (const path of ['/', '/sobre/']) {
    const person = graph(path).find((n) => n['@type'] === 'Person');
    assert.equal(person.name, companyConfig.responsiblePerson.name);
    assert.equal(person.worksFor['@id'], `${companyConfig.canonicalUrl}#organizacao`);
    for (const k of ['alumniOf', 'hasCredential', 'award', 'sameAs', 'image']) assert.equal(person[k], undefined, k);
  }
  assert.ok(!graph('/metodo-4d/').some((n) => n['@type'] === 'Person'));
});

test('eventos GA4 preparados sem dados pessoais e sem lead falso', async () => {
  const js = await readFile(join(site, 'assets/js/main.js'), 'utf8');
  assert.match(js, /data-evento/);
  assert.doesNotMatch(js, /generate_lead/);
  const confirmado = { ...companyConfig, contact: { email: 'a@b.com', phone: null, whatsapp: null, confirmed: true } };
  assert.match(contactLinks(confirmado), /data-evento="clique_contato" data-canal="email"/);
  assert.match(projectsSection({ ...companyConfig, projects: [{ name: 'P', url: 'https://p.com', cta: 'Ver' }] }), /data-evento="clique_projeto"/);
});
