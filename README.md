# 4D Desenvolvimento Pessoal

Site institucional de https://www.4ddesenvolvimentopessoal.com.br (o `.htaccess` redireciona as outras variações para este endereço).

Site estático gerado por um script Node sem dependências.

- `src/config/companyConfig.mjs` — fonte única dos dados da empresa (CNPJ, endereço, contato, redes, responsável, projetos).
- `src/content/metodo.mjs` — conteúdo do Método 4D, eixos de atuação, frentes e segmentos.
- `src/pages/` — páginas; `src/lib/` — layout, componentes e schema; `src/assets/` — CSS, JS, fonte e favicon.
- `site/` — resultado do build, publicado em `/www/` no FTP da KingHost.

Comandos (Node 20+):

- `npm run build` — gera `site/`
- `npm run lint` — sintaxe, imports não usados e CSS
- `npm test` — build + testes dos critérios de aceite
- `node scripts/serve.mjs` — pré-visualização em http://localhost:4173

Regras de conteúdo:

- Contato só aparece com `contact.confirmed: true` (e cria o item Contato no menu/rodapé).
- Redes sociais só aparecem se `socialLinks` tiver itens.
- Projetos só aparecem como cartões se `projects` tiver itens.

Publicação: cada push na `main` roda lint, build e testes e publica via FTP (`.github/workflows/deploy.yml`).
A senha do FTP fica no secret `FTP_PASSWORD` do repositório. A KingHost bloqueia FTP de IPs fora do Brasil;
o acesso global precisa estar liberado em Painel KingHost → Gerenciar FTP → Política de IPs.

Relatórios: `docs/relatorio-2026-09-23.md` (resumo do trabalho e pendências) e `docs/seo-auditoria.md` (auditoria técnica de SEO).
Imagens de compartilhamento e ícones: `scripts/gerar-imagens.ps1`.

A fonte Inter (`src/assets/fonts`) é distribuída sob a SIL Open Font License.
