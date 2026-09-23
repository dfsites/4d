import { esc } from '../lib/html.mjs';
import { responsible } from '../lib/components.mjs';
import { axes, dimensions, segments } from '../content/metodo.mjs';

export const page = {
  path: '/sobre/',
  nav: 'sobre',
  title: 'Sobre a 4D Desenvolvimento Pessoal Ltda. | Educação, Desenvolvimento e Tecnologia',
  description: 'Conheça a 4D Desenvolvimento Pessoal Ltda., CNPJ 49.142.726/0001-58, empresa de Florianópolis/SC que desenvolve soluções educacionais, digitais e institucionais a partir do Método 4D.',
  schemaType: 'AboutPage',
  breadcrumb: [{ name: 'Sobre a 4D', path: '/sobre/' }],
};

export function render(config) {
  const dims = dimensions.map((d) => `<li><strong>${esc(d.name)}</strong> — ${esc(d.lead)}</li>`).join('');
  const eixos = axes.map((a) => `<li><strong>${esc(a.title)}:</strong> ${esc(a.items.join(', ').toLowerCase())}.</li>`).join('');
  const segs = segments.map((s) => esc(s.name.toLowerCase())).join('; ');

  return `<section class="pagina-topo">
      <div class="container">
        <p class="rotulo">A empresa</p>
        <h1>Sobre a ${esc(config.brandName)}</h1>
        <p class="pagina-topo__sub">Educação, desenvolvimento e tecnologia em quatro dimensões.</p>
      </div>
    </section>

    <section class="secao secao--texto">
      <div class="container texto">
        <h2>Quem somos</h2>
        <p>A <strong>${esc(config.legalName)}</strong> é uma empresa brasileira dedicada ao desenvolvimento de soluções educacionais, conteúdos, produtos digitais, metodologias e projetos voltados ao desenvolvimento pessoal, profissional e organizacional.</p>
        <p>A 4D atua com pessoas e com organizações. Combina educação, estratégia, identidade e tecnologia — incluindo plataformas, aplicativos e ferramentas — para desenvolver pessoas, produtos, projetos e organizações.</p>

        <h2>Como a 4D se organiza</h2>
        <p>A empresa é a estrutura responsável por tudo o que a marca 4D publica. Abaixo dela está o <strong>Método 4D</strong>, a estrutura conceitual própria que orienta o trabalho. Dele nascem as soluções, organizadas em dois eixos:</p>
        <ul>${eixos}</ul>
        <p>As soluções podem atender diferentes públicos, como ${segs}.</p>

        <h2>O Método 4D</h2>
        <p>O Método 4D organiza o desenvolvimento em quatro dimensões que se sucedem e se renovam:</p>
        <ol>${dims}</ol>
        <p>Ele se aplica a pessoas e profissionais, mas também é a forma como a 4D pensa e constrói seus cursos, produtos, plataformas e projetos. <a class="link" href="/#metodo">Ver o Método 4D em detalhe</a></p>

        <h2>Identificação em produtos e serviços</h2>
        <p>O nome <strong>${esc(config.legalName)}</strong> pode aparecer em rodapés, páginas de pagamento, termos, certificados, plataformas e produtos. Nesses casos, a 4D é a empresa responsável pela solução — os dados oficiais da empresa estão no rodapé deste site. Condições comerciais específicas, como preços, prazos e políticas de reembolso, são informadas no próprio produto ou contrato.</p>
      </div>
    </section>

    ${responsible(config)}`;
}
