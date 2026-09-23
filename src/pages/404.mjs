export const page = {
  path: '/404.html',
  output: '404.html',
  nav: null,
  noindex: true,
  sitemap: false,
  title: 'Página não encontrada | 4D Desenvolvimento Pessoal',
  description: 'O endereço acessado não existe no site da 4D Desenvolvimento Pessoal. Volte ao início.',
};

export function render() {
  return `<section class="pagina-topo pagina-topo--404">
      <div class="container">
        <p class="rotulo">Erro 404</p>
        <h1>Página não encontrada</h1>
        <p class="pagina-topo__sub">O endereço acessado não existe ou foi alterado.</p>
        <div class="hero__acoes">
          <a class="btn" href="/">Ir para a página inicial</a>
          <a class="link" href="/sobre/">Sobre a 4D</a>
        </div>
      </div>
    </section>`;
}
