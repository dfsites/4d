import { esc, formatDate, hostOf } from '../lib/html.mjs';

export const page = {
  path: '/termos-de-uso/',
  nav: 'termos',
  title: 'Termos de Uso do Site | 4D Desenvolvimento Pessoal Ltda.',
  description: 'Termos de Uso do site institucional da 4D Desenvolvimento Pessoal Ltda. (CNPJ 49.142.726/0001-58).',
  breadcrumb: [{ name: 'Termos de Uso', path: '/termos-de-uso/' }],
};

export function render(config) {
  const site = hostOf(config.canonicalUrl);
  return `<section class="pagina-topo">
      <div class="container">
        <p class="rotulo">Documento legal</p>
        <h1>Termos de Uso do Site</h1>
        <p class="pagina-topo__sub">Última atualização: ${formatDate(config.legalUpdatedAt)}</p>
      </div>
    </section>

    <section class="secao secao--texto">
      <div class="container texto">
        <h2>1. Sobre estes termos</h2>
        <p>Estes termos regulam o uso do site institucional ${esc(site)}, mantido por <strong>${esc(config.legalName)}</strong>, CNPJ ${esc(config.cnpj)}. Ao navegar pelo site, você concorda com estas condições.</p>

        <h2>2. Finalidade do site</h2>
        <p>Este site tem caráter institucional e informativo: apresenta a empresa, o Método 4D, suas áreas de atuação e seus dados oficiais. Ele não realiza vendas, inscrições, contratações ou cadastros.</p>

        <h2>3. Produtos e serviços</h2>
        <p>Cursos, treinamentos, mentorias, plataformas, aplicativos e demais soluções da 4D possuem condições próprias — como termos de compra, contratos, prazos e políticas de reembolso — apresentadas no respectivo produto ou contrato. Estes termos não substituem esses documentos.</p>

        <h2>4. Conteúdo e propriedade intelectual</h2>
        <p>A marca 4D, o nome Método 4D, os textos, a identidade visual e os demais elementos deste site pertencem à ${esc(config.legalName)} ou são utilizados com autorização. É permitido compartilhar links para o site; a reprodução total ou parcial do conteúdo para fins comerciais depende de autorização prévia.</p>

        <h2>5. Caráter das informações</h2>
        <p>As informações publicadas têm finalidade institucional e educativa geral e não constituem aconselhamento profissional individual. A 4D busca manter o conteúdo correto e atualizado, mas ele pode ser revisto a qualquer momento.</p>

        <h2>6. Links externos</h2>
        <p>O site pode conter links para serviços de terceiros, como a consulta pública de CNPJ da Receita Federal. A 4D não controla esses serviços e não se responsabiliza por seu conteúdo ou por suas práticas.</p>

        <h2>7. Uso adequado</h2>
        <p>Não é permitido utilizar o site para fins ilícitos, tentar acessar áreas restritas do servidor ou comprometer sua segurança e disponibilidade.</p>

        <h2>8. Privacidade</h2>
        <p>O tratamento de dados neste site é descrito na <a class="link" href="/politica-de-privacidade/">Política de Privacidade</a>.</p>

        <h2>9. Alterações e legislação</h2>
        <p>Estes termos podem ser atualizados a qualquer momento, com indicação da data da última revisão no topo da página. Eles são regidos pela legislação brasileira.</p>
      </div>
    </section>`;
}
