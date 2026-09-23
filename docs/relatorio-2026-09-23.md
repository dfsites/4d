# Relatório do dia — 23/09/2026

Site: https://www.4ddesenvolvimentopessoal.com.br/ · Repositório: https://github.com/dfsites/4d

## Onde o site está hoje

- Publicado na KingHost e atualizado automaticamente a cada `git push` na branch `main` (GitHub Actions: lint → testes → FTP para `/www/`).
- Páginas: `/`, `/sobre/`, `/metodo-4d/`, `/politica-de-privacidade/`, `/termos-de-uso/` e página 404.
- 16 testes automáticos passando; lint sem erros.

## O que foi feito

### 1. Hospedagem e publicação automática
- Repositório `dfsites/4d` criado e conectado; pasta `site/` é a versão publicada.
- Publicação automática por FTP configurada; a senha fica apenas no segredo `FTP_PASSWORD` do GitHub.
- Liberado o acesso FTP internacional na KingHost (necessário para o GitHub publicar).
- Arquivos do site antigo removidos do servidor.
- Caminho do FTP corrigido para `/www/` absoluto, permitindo que arquivos apagados no projeto também sejam apagados no servidor.

### 2. Endereço oficial e redirecionamentos
- Todas as variantes (`http://`, sem `www`, `index.html`, sem barra final) redirecionam em um único salto (301) para `https://www.4ddesenvolvimentopessoal.com.br/`, preservando parâmetros de campanha.
- Endereços inexistentes respondem 404 com página útil.

### 3. Evolução do site (brief "Evolução final")
- Posicionamento: empresa de educação, desenvolvimento e tecnologia; hierarquia Empresa → Método 4D → Soluções.
- Método 4D (Descobrir, Decidir, Desenvolver, Destacar), dois eixos de atuação, frentes para organizações e segmentos atendidos (igrejas e comunidades, empresas e organizações, profissionais e especialistas).
- Removidos: Instagram e redes sociais, depoimentos e formulário de contato.
- Dados da empresa (razão social, CNPJ, endereço) no rodapé de todas as páginas, centralizados em `src/config/companyConfig.mjs`.
- Topo com o cubo colorido original e o destaque "quatro dimensões" em degradê roxo com traço âmbar; botão principal roxo.
- Páginas legais: Política de Privacidade (LGPD, incluindo o Google Analytics) e Termos de Uso.

### 4. Google
- Google Analytics `G-931JV5ZF55` em todas as páginas, carregado após a página para não atrasar a exibição.
- Eventos preparados: `clique_contato` e `clique_projeto` (sem dados pessoais).
- Arquivo de verificação do Search Console publicado (`/google204b7648e51e65df.html`).

### 5. SEO e desempenho
- Títulos e descrições únicos por página; um H1 por página; canonical absoluto.
- `sitemap.xml` e `robots.txt` gerados automaticamente a partir das páginas publicadas.
- Imagem de compartilhamento 1200×630, ícones (favicon, iPhone/Android) e manifesto.
- Dados estruturados: Organization (com CNPJ, endereço e logo), WebSite, WebPage/AboutPage, BreadcrumbList e Person (responsável), sem dados inventados.
- Nova página `/metodo-4d/` com entradas e saídas de cada dimensão, exemplo ilustrativo, limites e dúvidas frequentes.
- Compressão, cache, HSTS e cabeçalhos de segurança no `.htaccess`.
- Lighthouse (laboratório, home): celular 79 → 85, LCP 1,8 s → 1,5 s; acessibilidade, boas práticas e SEO em 100.

### 6. Correção mobile (seção Método 4D aplicado)
- No celular, os nomes Descobrir, Desenvolver e Destacar quebravam no meio da palavra porque a coluna da dimensão ficava com só 18% da largura.
- Corrigido: no mobile a coluna usa a largura toda e o nome permanece em uma linha. Publicado em produção.

Detalhes técnicos, inventário de URLs e medições: `docs/seo-auditoria.md`.

## Arquivos de relatório neste repositório

| Arquivo | Conteúdo |
|---|---|
| `docs/relatorio-2026-09-23.md` | Este resumo do trabalho do dia, pendências e como atualizar o site |
| `docs/seo-auditoria.md` | Auditoria técnica de SEO (inventário de URLs, o que foi corrigido/novo/pendente, medições Lighthouse) |

## Pendências

### Informações a fornecer
- Canal de contato real (e-mail, telefone ou WhatsApp) — ativa `/contato/`, o botão "Fale sobre um projeto" e os eventos de contato.
- História da empresa com fatos verificáveis, para a página Sobre.
- Projetos/cases atribuíveis à 4D e autorizados.
- Escopo das páginas de solução (educacionais, digitais, igrejas).
- Foto e LinkedIn do responsável; perfis oficiais da 4D, se houver.

### Ações externas
- Search Console: verificar a propriedade, enviar `https://www.4ddesenvolvimentopessoal.com.br/sitemap.xml` e solicitar indexação de `/`, `/sobre/` e `/metodo-4d/`.
- Bing Webmaster Tools: importar do Search Console e enviar o sitemap.
- Google Analytics: confirmar que Google Signals e personalização de anúncios estão desligados.
- Decidir sobre barra de consentimento de cookies.
- Domínio `4ddesenvolve.com.br`: configurar redirecionamento para o domínio oficial em tarefa separada.
- Segurança: trocar a senha do FTP (foi compartilhada em conversa) e atualizar o segredo `FTP_PASSWORD` no GitHub.

## Como atualizar o site

1. Editar o conteúdo em `src/` (dados da empresa em `src/config/companyConfig.mjs`).
2. `npm run check` para gerar o site e rodar lint e testes.
3. `git add -A`, `git commit` e `git push` — a publicação na KingHost é automática.
