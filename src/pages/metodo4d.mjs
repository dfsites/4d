import { hasConfirmedContact } from '../config/companyConfig.mjs';
import { esc } from '../lib/html.mjs';
import { appliedColumns, dimensions } from '../content/metodo.mjs';

export const page = {
  path: '/metodo-4d/',
  nav: 'metodo',
  title: 'Método 4D | Descobrir, Decidir, Desenvolver e Destacar',
  description: 'Entenda o Método 4D da 4D Desenvolvimento Pessoal: as quatro dimensões, o que entra e o que sai de cada etapa, um exemplo aplicado e os limites do método.',
  breadcrumb: [{ name: 'Método 4D', path: '/metodo-4d/' }],
};

const exemplo = [
  'Uma associação quer organizar a formação de novos voluntários, hoje feita de maneira informal e diferente a cada turma.',
  'Descobrir: levantar quem são os voluntários, o que eles precisam saber, quais materiais já existem e onde a formação atual falha.',
  'Decidir: definir o objetivo da formação, os conteúdos prioritários, o formato (presencial, on-line ou híbrido) e como acompanhar a participação.',
  'Desenvolver: produzir os conteúdos e materiais, organizar uma trilha de aprendizagem e escolher ou construir a ferramenta adequada.',
  'Destacar: aplicar a trilha com uma turma, comunicar a nova formação, ouvir os participantes e ajustar o que for necessário para o ciclo seguinte.',
];

const duvidas = [
  {
    q: 'O Método 4D é um curso?',
    a: 'Não. É a estrutura que orienta o trabalho da 4D. Ele pode aparecer dentro de cursos, mentorias e projetos, mas não é um produto vendido separadamente.',
  },
  {
    q: 'É preciso seguir as quatro dimensões sempre na mesma ordem?',
    a: 'A ordem é a referência: cada dimensão prepara a seguinte. Na prática, é comum voltar a uma etapa anterior quando surge uma informação nova — o método é um ciclo, não uma linha reta.',
  },
  {
    q: 'O método serve para pessoas ou para organizações?',
    a: 'Para os dois. As perguntas são as mesmas; o que muda é a escala. Para uma pessoa, falamos de carreira e competências. Para uma organização, de identidade, comunicação, tecnologia e formação dos seus públicos.',
  },
  {
    q: 'O Método 4D garante resultados?',
    a: 'Não. Ele organiza o caminho e reduz decisões improvisadas, mas o resultado depende do contexto, dos recursos disponíveis e da aplicação de quem participa.',
  },
];

function lista(items) {
  return `<ul>${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`;
}

export function render(config) {
  const etapas = dimensions.map((d) => `<article class="etapa" aria-labelledby="etapa-${d.num}">
          <p class="etapa__num" aria-hidden="true">${d.num}</p>
          <div>
            <h2 id="etapa-${d.num}">${esc(d.name)}</h2>
            <p class="etapa__lead">${esc(d.lead)}</p>
            <p>${esc(d.text)}</p>
            <p class="etapa__pergunta"><strong>Pergunta central:</strong> ${esc(d.question)}</p>
            <div class="etapa__fluxo">
              <div>
                <h3>O que entra</h3>
                ${lista(d.inputs)}
              </div>
              <div>
                <h3>O que sai</h3>
                ${lista(d.outputs)}
              </div>
            </div>
            <ul class="etapa__aplicado">
              ${appliedColumns.map((c) => `<li><strong>${esc(c.label)}:</strong> ${esc(d.applied[c.key])}</li>`).join('\n              ')}
            </ul>
          </div>
        </article>`).join('\n        ');

  const [contexto, ...passos] = exemplo;
  const faq = duvidas.map((d) => `<h3>${esc(d.q)}</h3>
        <p>${esc(d.a)}</p>`).join('\n        ');
  const contato = hasConfirmedContact(config)
    ? '<a class="btn" href="/contato/" data-evento="clique_contato">Fale sobre um projeto</a>'
    : '';

  return `<section class="pagina-topo">
      <div class="container">
        <p class="rotulo">Método 4D</p>
        <h1>Método 4D: Descobrir, Decidir, Desenvolver e Destacar</h1>
        <p class="pagina-topo__sub">A estrutura que a ${esc(config.brandName)} usa para desenvolver pessoas, profissionais, projetos e organizações.</p>
      </div>
    </section>

    <section class="secao secao--texto" aria-labelledby="definicao-titulo">
      <div class="container texto">
        <h2 id="definicao-titulo">O que é o Método 4D</h2>
        <p>O Método 4D é a estrutura de desenvolvimento própria da ${esc(config.brandName)}. Ele organiza qualquer processo de desenvolvimento em quatro dimensões — <strong>Descobrir</strong>, <strong>Decidir</strong>, <strong>Desenvolver</strong> e <strong>Destacar</strong> — em que cada etapa gera o material de que a seguinte precisa.</p>
        <p>A 4D usa o método para orientar pessoas e profissionais e também para conceber os próprios cursos, produtos, plataformas e projetos. Ele não depende de ferramenta específica e pode ser aplicado em diferentes escalas.</p>
      </div>
    </section>

    <section class="secao secao--suave" aria-label="As quatro dimensões">
      <div class="container etapas">
        ${etapas}
      </div>
    </section>

    <section class="secao secao--texto" aria-labelledby="exemplo-titulo">
      <div class="container texto">
        <h2 id="exemplo-titulo">Exemplo aplicado</h2>
        <p><em>Exemplo ilustrativo, criado para explicar o método — não descreve um cliente real.</em></p>
        <p>${esc(contexto)}</p>
        <ol>${passos.map((p) => {
    const [nome, ...resto] = p.split(': ');
    return `<li><strong>${esc(nome)}:</strong> ${esc(resto.join(': '))}</li>`;
  }).join('')}</ol>

        <h2>Limites do método</h2>
        <p>O Método 4D é uma forma de organizar o desenvolvimento, não uma teoria científica nem uma promessa de resultado. Ele não substitui acompanhamento profissional especializado — como terapia, orientação jurídica ou financeira — quando a situação exigir.</p>

        <h2>Dúvidas frequentes</h2>
        ${faq}

        <h2>Próximo passo</h2>
        <p>Veja como o método se transforma em soluções de <a href="/#atuacao">educação e desenvolvimento e em soluções digitais e organizacionais</a>, ou conheça <a href="/sobre/">a empresa por trás do Método 4D</a>.</p>
        ${contato ? `<p>${contato}</p>` : ''}
      </div>
    </section>`;
}
