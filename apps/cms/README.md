# SW-SITE/CMS

Crie uma cópia do arquivo `.env.example`, renomeie para `.env` e preencha as variáveis de ambiente necessárias.

```bash
DATABASE_URI=file:./your-database-name.db
PAYLOAD_SECRET=YOUR_SECRET_HERE
```

Do root do projeto, execute o seguinte comando para instalar as dependências:

```bash
pnpm --filter sw-site-cms install
```

## Fly.io

Instale o `flyctl` seguindo as instruções em [Fly.io](https://fly.io/docs/getting-started/installing-flyctl/).

Para fazer o deploy do site, utilize o seguinte comando:

```bash
flyctl deploy
```

Para fazer o download do banco de dados SQLite, utilize o seguinte comando:

```bash
flyctl ssh sftp get /data/sqlite.db ./data/your-database-name.db
```
