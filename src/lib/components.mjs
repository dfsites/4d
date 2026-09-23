import { hasConfirmedContact } from '../config/companyConfig.mjs';
import { esc } from './html.mjs';

export function logo() {
  return `<span class="logo__marca">4D</span>
        <span class="logo__nome">Desenvolvimento <br>Pessoal</span><span class="sr-only"> — página inicial</span>`;
}

export function navItems(config) {
  const items = [
    { href: '/sobre/', label: 'A empresa', key: 'sobre' },
    { href: '/metodo-4d/', label: 'Método 4D', key: 'metodo' },
    { href: '/#atuacao', label: 'Atuação', key: 'atuacao' },
    { href: '/#organizacoes', label: 'Organizações', key: 'organizacoes' },
  ];
  if (hasConfirmedContact(config)) items.push({ href: '/contato/', label: 'Contato', key: 'contato' });
  return items;
}

export function header(config, current) {
  const links = navItems(config)
    .map((i) => `<li><a href="${i.href}"${i.key === current ? ' aria-current="page"' : ''}>${esc(i.label)}</a></li>`)
    .join('\n          ');
  return `<header class="topo">
    <div class="container topo__inner">
      <a href="/" class="logo">
        ${logo()}
      </a>
      <button type="button" class="menu-btn" aria-expanded="false" aria-controls="menu-principal">
        <span class="menu-btn__linhas" aria-hidden="true"></span>
        <span class="sr-only">Menu</span>
      </button>
      <nav class="nav" id="menu-principal" aria-label="Principal">
        <ul>
          ${links}
        </ul>
      </nav>
    </div>
  </header>`;
}

export function addressLines(config) {
  const a = config.address;
  return [a.street, `${a.city}/${a.state}`, `CEP ${a.zip}`, a.country];
}

export function socialLinks(config) {
  const links = config.socialLinks.filter((s) => s && s.url && s.name);
  if (!links.length) return '';
  return `<ul class="social">${links
    .map((s) => `<li><a href="${esc(s.url)}" rel="noopener" target="_blank">${esc(s.name)}</a></li>`)
    .join('')}</ul>`;
}

export function contactLinks(config) {
  if (!hasConfirmedContact(config)) return '';
  const c = config.contact;
  const items = [];
  const ev = 'data-evento="clique_contato"';
  if (c.email) items.push(`<li><a href="mailto:${esc(c.email)}" ${ev} data-canal="email">${esc(c.email)}</a></li>`);
  if (c.phone) items.push(`<li><a href="tel:${esc(c.phone.replace(/\D/g, ''))}" ${ev} data-canal="telefone">${esc(c.phone)}</a></li>`);
  if (c.whatsapp) items.push(`<li><a href="https://wa.me/${esc(c.whatsapp.replace(/\D/g, ''))}" rel="noopener" target="_blank" ${ev} data-canal="whatsapp">WhatsApp</a></li>`);
  return `<ul class="rodape__links rodape__contato">${items.join('')}</ul>`;
}

export function responsible(config, headingLevel = 2) {
  const p = config.responsiblePerson;
  if (!p?.name) return '';
  const h = `h${headingLevel}`;
  const photo = p.photo
    ? `<img class="responsavel__foto" src="${esc(p.photo)}" alt="${esc(p.name)}" width="160" height="160" loading="lazy">`
    : '';
  const linkedin = p.linkedin
    ? `<p><a class="link" href="${esc(p.linkedin)}" rel="noopener" target="_blank">Perfil no LinkedIn<span class="sr-only"> (abre em nova aba)</span></a></p>`
    : '';
  return `<section class="secao" id="responsavel" aria-labelledby="responsavel-titulo">
      <div class="container responsavel">
        <p class="rotulo">Quem está por trás</p>
        <div class="responsavel__corpo${photo ? ' responsavel__corpo--foto' : ''}">
          ${photo}
          <div>
            <${h} id="responsavel-titulo">${esc(p.name)}</${h}>
            <p class="responsavel__cargo">${esc(p.role)} · Responsável pela ${esc(config.brandName)}</p>
            <p class="responsavel__bio">${esc(p.bio)}</p>
            ${linkedin}
          </div>
        </div>
      </div>
    </section>`;
}

export function projectCard(project) {
  const title = project.url
    ? `<a href="${esc(project.url)}" rel="noopener" data-evento="clique_projeto">${esc(project.name)}</a>`
    : esc(project.name);
  const img = project.image || project.logo;
  return `<li class="projeto">
          ${img ? `<img src="${esc(img)}" alt="" width="640" height="360" loading="lazy">` : ''}
          <p class="projeto__meta">${[project.category, project.status].filter(Boolean).map(esc).join(' · ')}</p>
          <h3>${title}</h3>
          ${project.description ? `<p>${esc(project.description)}</p>` : ''}
          ${project.url && project.cta ? `<a class="link" href="${esc(project.url)}" rel="noopener" data-evento="clique_projeto">${esc(project.cta)}</a>` : ''}
        </li>`;
}

export function projectsSection(config) {
  const projects = (config.projects || []).filter((p) => p && p.name);
  const list = projects.length
    ? `<ul class="projetos">${projects.map(projectCard).join('')}</ul>`
    : '';
  return `<section class="secao" id="projetos" aria-labelledby="projetos-titulo">
      <div class="container projetos-intro">
        <div>
          <p class="rotulo">Produtos, projetos e soluções</p>
          <h2 id="projetos-titulo">Uma empresa por trás de cada produto</h2>
        </div>
        <div>
          <p>Cursos, plataformas, aplicativos, ferramentas e projetos educacionais desenvolvidos pela 4D são assinados por <strong>${esc(config.legalName)}</strong>.</p>
          ${projects.length ? '<p>Conheça alguns deles:</p>' : ''}
        </div>
      </div>
      ${list ? `<div class="container">${list}</div>` : ''}
    </section>`;
}

export function footer(config) {
  const year = new Date().getFullYear();
  const lines = addressLines(config).map(esc).join('<br>');
  const contato = hasConfirmedContact(config) ? '<li><a href="/contato/">Contato</a></li>' : '';
  return `<footer class="rodape">
    <div class="container rodape__grid">
      <div class="rodape__marca">
        <a href="/" class="logo logo--claro">
          ${logo()}
        </a>
        <p>Educação, desenvolvimento e tecnologia em quatro dimensões.</p>
      </div>
      <div>
        <p class="rodape__titulo">${esc(config.legalName)}</p>
        <p>CNPJ ${esc(config.cnpj)}<br>${lines}</p>
        ${contactLinks(config)}
      </div>
      <nav aria-label="Institucional">
        <p class="rodape__titulo">Institucional</p>
        <ul class="rodape__links">
          <li><a href="/sobre/">Sobre a 4D</a></li>
          <li><a href="/metodo-4d/">Método 4D</a></li>
          <li><a href="/politica-de-privacidade/">Política de Privacidade</a></li>
          <li><a href="/termos-de-uso/">Termos de Uso</a></li>
          ${contato}
        </ul>
        ${socialLinks(config)}
      </nav>
    </div>
    <div class="container rodape__base">
      <p>© ${year} ${esc(config.legalName)} Todos os direitos reservados.</p>
    </div>
  </footer>`;
}
