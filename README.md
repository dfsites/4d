# 4D Desenvolvimento Pessoal

Site estático de https://www.4ddesenvolvimentopessoal.com.br (o `.htaccess` redireciona as outras variações para este endereço).

- `site/` — arquivos publicados em `/www/` no FTP da KingHost.
- Cada push na branch `main` publica automaticamente (`.github/workflows/deploy.yml`).
- A senha do FTP fica no secret `FTP_PASSWORD` do repositório (Settings → Secrets and variables → Actions).
- A KingHost bloqueia FTP de IPs fora do Brasil. Para o GitHub Actions publicar, libere o acesso global em
  Painel KingHost → Gerenciar FTP → Política de IPs.
