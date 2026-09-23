import { hasConfirmedContact } from '../config/companyConfig.mjs';
import { esc } from '../lib/html.mjs';
import { projectsSection, responsible } from '../lib/components.mjs';
import { appliedColumns, axes, dimensions, fronts, segments } from '../content/metodo.mjs';

export const page = {
  path: '/',
  nav: 'inicio',
  title: '4D Desenvolvimento Pessoal | Educação e Tecnologia',
  description: 'Conheça a 4D Desenvolvimento Pessoal: soluções educacionais, plataformas e projetos digitais para pessoas e organizações, orientados pelo Método 4D.',
  responsible: true,
};

function cubo() {
  const tiles = dimensions.map((d, i) => `<li class="cubo__d d${i + 1}">${esc(d.name)}</li>`).join('');
  return `<div class="hero__visual">
          <ol class="cubo" aria-label="As quatro dimensões do Método 4D">${tiles}</ol>
          <span class="cubo__centro" aria-hidden="true">4D</span>
        </div>`;
}

function metodo() {
  const steps = dimensions.map((d) => `<li class="dimensao">
            <span class="dimensao__num" aria-hidden="true">${d.num}</span>
            <h3 class="dimensao__nome">${esc(d.name)}</h3>
            <p class="dimensao__lead">${esc(d.lead)}</p>
            <p>${esc(d.text)}</p>
            <p class="dimensao__chaves">${d.keywords.map(esc).join(' · ')}</p>
          </li>`).join('');
  return `<section class="secao secao--escura" id="metodo" aria-labelledby="metodo-titulo">
      <div class="container">
        <div class="cabecalho cabecalho--split">
          <div>
            <p class="rotulo rotulo--claro">Método 4D</p>
            <h2 id="metodo-titulo">Quatro dimensões, uma progressão</h2>
          </div>
          <p>O Método 4D é a estrutura de desenvolvimento própria da 4D. Ele orienta pessoas e profissionais — e também a forma como a empresa concebe cursos, produtos, plataformas e projetos. Cada dimensão prepara a seguinte, em um ciclo contínuo.</p>
        </div>
        <ol class="dimensoes">
          ${steps}
        </ol>
        <p class="nota">O Método 4D é um caminho de organização e desenvolvimento, não uma promessa de resultado. O que se colhe depende do contexto e da aplicação de cada pessoa, projeto ou organização.</p>
        <p class="metodo__mais"><a class="link" href="/metodo-4d/">Entradas, saídas e um exemplo de cada dimensão</a></p>
      </div>
    </section>`;
}

function atuacao() {
  const cols = axes.map((a) => `<article class="eixo">
            <p class="eixo__num">${esc(a.num)}</p>
            <h3>${esc(a.title)}</h3>
            <p>${esc(a.text)}</p>
            <ul class="lista-colunas">${a.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
          </article>`).join('');
  return `<section class="secao" id="atuacao" aria-labelledby="atuacao-titulo">
      <div class="container">
        <div class="cabecalho">
          <p class="rotulo">O que fazemos</p>
          <h2 id="atuacao-titulo">Dois eixos de atuação</h2>
          <p>A 4D combina educação, estratégia, identidade e tecnologia para desenvolver pessoas, produtos, projetos e organizações.</p>
        </div>
        <div class="eixos">
          ${cols}
        </div>
      </div>
    </section>`;
}

function organizacoes() {
  const frentes = fronts.map((f, i) => `<li class="frente">
              <span class="frente__num" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3>${esc(f.name)}</h3>
                <p>${esc(f.text)}</p>
              </div>
            </li>`).join('');
  const segs = segments.map((s) => `<li class="segmento">
              <h4>${esc(s.name)}</h4>
              <p>${esc(s.text)}</p>
            </li>`).join('');
  return `<section class="secao secao--suave" id="organizacoes" aria-labelledby="organizacoes-titulo">
      <div class="container organizacoes">
        <div class="organizacoes__intro">
          <p class="rotulo">Para pessoas e organizações</p>
          <h2 id="organizacoes-titulo">Do posicionamento à implementação</h2>
          <p>A 4D também desenvolve soluções educacionais, digitais e institucionais para organizações que querem estruturar sua identidade, presença, comunicação, tecnologia e relação com seus públicos.</p>
          <p>O trabalho pode começar na definição do posicionamento e seguir até a solução em funcionamento — orientado pelas mesmas quatro dimensões do Método 4D.</p>
        </div>
        <ol class="frentes" aria-label="Frentes de solução">
            ${frentes}
        </ol>
      </div>
      <div class="container">
        <h3 class="segmentos__titulo">Segmentos atendidos</h3>
        <ul class="segmentos">
            ${segs}
        </ul>
      </div>
    </section>`;
}

function aplicado() {
  const head = appliedColumns.map((c) => `<th scope="col">${esc(c.label)}</th>`).join('');
  const rows = dimensions.map((d) => `<tr>
              <th scope="row"><span class="matriz__num">${d.num}</span> ${esc(d.name)}</th>
              ${appliedColumns.map((c) => `<td data-rotulo="${esc(c.label)}">${esc(d.applied[c.key])}</td>`).join('')}
            </tr>`).join('');
  return `<section class="secao" id="aplicado" aria-labelledby="aplicado-titulo">
      <div class="container">
        <div class="cabecalho">
          <p class="rotulo">Método 4D aplicado</p>
          <h2 id="aplicado-titulo">A mesma estrutura em contextos diferentes</h2>
          <p>As quatro dimensões orientam tanto o desenvolvimento de uma pessoa quanto a criação de um curso, de uma plataforma ou de um projeto organizacional.</p>
        </div>
        <div class="matriz-wrap">
          <table class="matriz">
            <caption class="sr-only">Como cada dimensão do Método 4D se aplica a pessoas, projetos e organizações</caption>
            <thead><tr><th scope="col"><span class="sr-only">Dimensão</span></th>${head}</tr></thead>
            <tbody>
            ${rows}
            </tbody>
          </table>
        </div>
      </div>
    </section>`;
}

export function render(config) {
  return `<section class="hero" id="inicio" aria-labelledby="hero-titulo">
      <div class="container hero__grid">
        <div class="hero__texto">
          <h1 id="hero-titulo"><span class="rotulo hero__kicker">Educação, desenvolvimento e tecnologia com o Método 4D</span> <span class="hero__frase">Desenvolvimento em <span class="destaque">quatro dimensões</span>.</span></h1>
          <p class="hero__sub">A ${esc(config.brandName)} cria soluções educacionais, digitais e institucionais para desenvolver pessoas, profissionais, projetos e organizações.</p>
          <div class="hero__acoes">
            ${hasConfirmedContact(config) ? '<a class="btn" href="/contato/" data-evento="clique_contato">Fale sobre um projeto</a>' : ''}
            <a class="${hasConfirmedContact(config) ? 'link' : 'btn'}" href="#atuacao">Conheça as soluções</a>
            <a class="link" href="/metodo-4d/">Entenda o Método 4D</a>
          </div>
        </div>
        ${cubo()}
      </div>
    </section>

    <section class="secao" id="sobre" aria-labelledby="sobre-titulo">
      <div class="container sobre">
        <div>
          <p class="rotulo">Sobre a 4D</p>
          <h2 id="sobre-titulo">Uma empresa de educação, desenvolvimento e tecnologia</h2>
        </div>
        <div class="sobre__texto">
          <p>A ${esc(config.brandName)} é uma empresa brasileira dedicada ao desenvolvimento de soluções educacionais, conteúdos, produtos digitais, metodologias e projetos voltados ao desenvolvimento pessoal, profissional e organizacional.</p>
          <p>A tecnologia entra como meio: plataformas, aplicativos e ferramentas a serviço da aprendizagem, da comunicação e da execução.</p>
          <ol class="estrutura" aria-label="Como a 4D se organiza">
            <li><span>Empresa</span> ${esc(config.brandName)}</li>
            <li><span>Método</span> Método 4D</li>
            <li><span>Soluções</span> Educação e desenvolvimento · Soluções digitais e organizacionais</li>
          </ol>
          <p><a class="link" href="/sobre/">Mais sobre a empresa</a></p>
        </div>
      </div>
    </section>

    ${metodo()}

    ${atuacao()}

    ${organizacoes()}

    ${aplicado()}

    ${projectsSection(config)}

    ${responsible(config)}`;
}
