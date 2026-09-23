# Auditoria e plano de SEO — 4D Desenvolvimento Pessoal

Domínio oficial: https://www.4ddesenvolvimentopessoal.com.br/ · Data: 23/09/2026

Este documento registra o estado do site depois da execução do P0 do plano de SEO e o que depende de informação ou acesso externo. Nenhuma ação aqui garante posição, indexação ou citação por IA.

## 1. Stack e publicação

- Site estático (HTML, CSS, JavaScript puro) gerado por `scripts/build.mjs` (Node, sem dependências).
- Conteúdo e dados da empresa centralizados em `src/config/companyConfig.mjs` e `src/content/metodo.mjs`.
- Hospedagem KingHost (Apache). Publicação por GitHub Actions (`.github/workflows/deploy.yml`): lint → testes → FTP para `/www/`.
- Todas as URLs são geradas a partir da lista `pages` do build; não existem rotas fora dela. O sitemap é gerado da mesma lista.

## 2. Inventário de URLs (produção, 23/09/2026)

| URL | Status | Indexação | Title | H1 | Schema |
|---|---|---|---|---|---|
| `/` | 200 | index | 4D Desenvolvimento Pessoal \| Educação e Tecnologia | Educação, desenvolvimento e tecnologia com o Método 4D — Desenvolvimento em quatro dimensões. | Organization, WebSite, WebPage, Person |
| `/sobre/` | 200 | index | Sobre a 4D Desenvolvimento Pessoal \| Empresa e atuação | Sobre a 4D Desenvolvimento Pessoal | Organization, WebSite, AboutPage, Person, BreadcrumbList |
| `/metodo-4d/` (nova) | 200 | index | Método 4D \| Descobrir, Decidir, Desenvolver e Destacar | Método 4D: Descobrir, Decidir, Desenvolver e Destacar | Organization, WebSite, WebPage, BreadcrumbList |
| `/politica-de-privacidade/` | 200 | index | Política de Privacidade \| 4D Desenvolvimento Pessoal Ltda. | Política de Privacidade | Organization, WebSite, WebPage, BreadcrumbList |
| `/termos-de-uso/` | 200 | index | Termos de Uso do Site \| 4D Desenvolvimento Pessoal Ltda. | Termos de Uso do Site | Organization, WebSite, WebPage, BreadcrumbList |
| `/404.html` | 404 para URLs inexistentes | noindex | Página não encontrada \| 4D Desenvolvimento Pessoal | Página não encontrada | — |

Intenções: `/` é dona das buscas pela marca; `/sobre/` da identidade da empresa; `/metodo-4d/` da explicação do Método 4D da 4D (sem reivindicar exclusividade do termo genérico); páginas legais cumprem função legal e permanecem indexáveis.

Links: todas as páginas recebem links do menu e do rodapé. No corpo, `/` ↔ `/sobre/` ↔ `/metodo-4d/` se ligam entre si; nenhuma página órfã. Canonical absoluto e autorreferente em todas as páginas indexáveis.

Redirecionamentos verificados (um salto, 301, parâmetros preservados): `http://` e sem `www` → `https://www`; `/pasta` → `/pasta/`; `/index.html` e `/pasta/index.html` → URL com barra; UTMs preservados e não alteram o canonical. URLs inexistentes respondem 404, com e sem barra final — não são redirecionadas para a home.

## 3. Resultado por categoria

### Existente e correto (preservado)
- Canonical com `https://www`, `lang="pt-BR"`, conteúdo principal em HTML sem depender de JavaScript.
- robots.txt permitindo tudo e apontando para o sitemap; sitemap apenas com URLs 200 indexáveis.
- JSON-LD `@graph` com Organization (`/#organizacao`), CNPJ, endereço; WebSite; WebPage por URL; BreadcrumbList nas internas.
- GA4 `G-931JV5ZF55` (uma única tag, um único `config` — sem page_view duplicado).
- 404 real e útil, com navegação.

### Corrigido
- `/pasta/index.html` respondia 200 como cópia da página → agora 301 para a URL com barra.
- Title e description da home e de `/sobre/` reescritos para descrever a empresa (CNPJ mantido em `/sobre/`, removido da description da home para explicar o valor).
- H1 da home passou a conter “Educação, desenvolvimento e tecnologia com o Método 4D”, mantendo “Desenvolvimento em quatro dimensões” como frase de marca (mesmo visual).
- CTAs da home: “Conheça as soluções” e “Entenda o Método 4D”; “Fale sobre um projeto” aparece automaticamente quando houver contato confirmado.
- Nome acessível do logo divergia do texto visível (Lighthouse `label-content-name-mismatch`).
- Contraste do número da 3ª dimensão em `/metodo-4d/`.
- CSS que bloqueava a renderização → embutido no HTML (4 KB comprimido).
- GA4 carregado após o evento `load` (a fila `dataLayer` é criada no início, então a visita continua sendo registrada).
- Publicação: `server-dir` absoluto `/www/`, necessário para remover arquivos antigos no servidor.
- Mobile — seção `#aplicado` (Método 4D aplicado): nomes Descobrir / Desenvolver / Destacar quebravam no meio da palavra porque `.matriz tbody th` mantinha `width: 18%` no layout em bloco; corrigido para `width: 100%` com `white-space: nowrap`.

### Novo
- Página `/metodo-4d/`: definição, as quatro dimensões com pergunta central, o que entra e o que sai, aplicação a pessoas/projetos/organizações, exemplo **ilustrativo** (sinalizado como tal), limites, dúvidas frequentes visíveis (sem FAQPage) e próximo passo.
- Imagem de compartilhamento 1200×630 (`/assets/img/og-4d.png`), `twitter:card summary_large_image`, `og:image:alt`.
- Ícones: `favicon.ico`, `apple-touch-icon.png`, ícones 192/512 e maskable; `site.webmanifest`. O favicon SVG original foi preservado.
- Organization com `logo` (ImageObject), `description`; WebPage com `dateModified` e `primaryImageOfPage`.
- `Person` para Daniel Ferreira apenas nas páginas em que ele aparece (home e `/sobre/`), só com nome, cargo e bio já publicados. Sem formação, credenciais, foto ou perfis.
- Eventos GA4 preparados: `clique_contato` (com `canal`) e `clique_projeto`, disparados por links com `data-evento`. Não enviam nome, e-mail, telefone ou mensagem; `generate_lead` não é usado porque não existe envio confirmado de lead.
- Compressão gzip, cache longo para arquivos versionados, HSTS e Permissions-Policy.

### Pendente — depende de informação
| Item | O que falta | Onde configurar |
|---|---|---|
| Contato e `/contato/` | Canal real (e-mail, telefone ou WhatsApp) confirmado pelo responsável | `contact` em `companyConfig.mjs` com `confirmed: true` — a página, o link no menu, o CTA e os eventos aparecem sozinhos |
| História real da empresa em `/sobre/` | Fatos verificáveis (início das atividades, marcos) | `src/pages/sobre.mjs` |
| Cases em `/projetos/` | Projeto atribuível à 4D, autorização, contexto, participação da 4D, imagens autorizadas, link e resultado comprovável (ex.: Vida com Deus, após verificação) | `projects` em `companyConfig.mjs` |
| Páginas de solução (`/solucoes-educacionais/`, `/solucoes-digitais/`, `/solucoes-para-igrejas/`) | Escopo comercial confirmado, entregáveis, processo, exemplos e contato; verificar se outro domínio do ecossistema já é dono da intenção | Novas páginas em `src/pages/` + lista `pages` no build |
| `/conteudos/` | 2 a 4 conteúdos substanciais prontos | — |
| Foto e LinkedIn do responsável | Arquivo autorizado e URL do perfil | `responsiblePerson` |
| Perfis oficiais (`sameAs`) | Perfis da própria 4D | `socialLinks` |
| Consentimento de cookies | Decisão sobre banner / Consent Mode para o GA4 | layout |

### Pendente — depende de acesso externo
1. **Google Search Console**: verificar a propriedade de Domínio por DNS (registro TXT) ou manter a propriedade de prefixo `https://www.4ddesenvolvimentopessoal.com.br/` (arquivo de verificação já publicado). Enviar `https://www.4ddesenvolvimentopessoal.com.br/sitemap.xml`. Inspecionar `/`, `/sobre/` e `/metodo-4d/` e solicitar indexação uma única vez.
2. **Bing Webmaster Tools**: importar a propriedade a partir do Search Console e enviar o mesmo sitemap.
3. **GA4**: conferir se Google Signals e personalização de anúncios estão desativados (a Política de Privacidade afirma isso); quando houver contato, marcar `clique_contato` como evento principal apenas se representar o objetivo comercial.
4. **Domínio `4ddesenvolve.com.br`**: não é canonical. Se for alias sem projeto próprio, configurar 301 para o domínio oficial em tarefa separada, no painel desse domínio.

## 4. Desempenho (laboratório)

Ferramenta: Lighthouse 12 (Chrome headless, configuração padrão de celular com limitação de rede/CPU e preset desktop). URL: home de produção. Data: 23/09/2026. São dados de **laboratório**; não há dados de campo (CrUX) disponíveis para o domínio — a API do PageSpeed Insights recusou a consulta por cota (HTTP 429) e o volume de visitas ainda é baixo para amostra de campo.

| Métrica | Celular antes | Celular depois | Desktop antes | Desktop depois |
|---|---|---|---|---|
| Desempenho | 79 | 85 | 99 | 98 |
| LCP | 1,8 s | 1,5 s | 0,8 s | 0,6 s |
| FCP | 1,5 s | 1,3 s | 0,3 s | 0,5 s |
| TBT | 850 ms | 600 ms | 90 ms | 130 ms |
| CLS | 0,003 | 0 | 0 | 0,008 |
| Acessibilidade / Boas práticas / SEO | 100 / 100 / 100 | 100 / 100 / 100 | 100 / 100 / 100 | 100 / 100 / 100 |

O TBT restante vem quase todo do script do Google Tag Manager (~176 KB). Metas de campo (p75): LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1 — acompanhar no Search Console (Core Web Vitals) quando houver amostra.

## 5. Regras de ecossistema aplicadas

- A 4D é dona da intenção institucional e da apresentação do método e da capacidade de execução.
- Nenhum link em massa para outros domínios, nenhuma página duplicada, nenhum canonical entre páginas diferentes.
- Antes de criar landing de igrejas, sites, cursos ou apps, verificar se já existe domínio/produto dono da intenção; se existir, a 4D apresenta atuação/case e encaminha ao produto.
- Nenhum outro domínio foi alterado nesta tarefa.

## 6. Busca com IA

Mesma base do SEO: HTML rastreável, entidade coerente, autoria e prova. Não foi criado `llms.txt` nem alterada a política de crawlers no robots.txt. Qualquer mudança sobre crawlers de IA deve distinguir buscadores de coleta para treinamento e ser decidida à parte.

## 7. Próximas etapas

- **P1**: completar `/sobre/` com história verificável; publicar a primeira página de solução com escopo confirmado; publicar ao menos um case verificável; ativar o contato.
- **P2**: primeiros 2 a 4 conteúdos originais ligados às páginas principais (pauta: aplicar o Método 4D em um projeto; estruturar uma trilha de aprendizagem; transformar conhecimento profissional em experiência de aprendizagem; site, plataforma ou aplicativo — como escolher; conteúdo e aprendizagem em comunidades; estudo de caso real).
- **Acompanhamento**: semanal no Search Console (consultas, páginas, impressões, cliques, CTR, posição média por grupo: marca, método, soluções). Revisão em 30 dias (indexação e consultas de marca) e entre 30 e 90 dias (quais soluções recebem impressões; ajuste de titles e conteúdo). São janelas de revisão, não prazos de ranking.
