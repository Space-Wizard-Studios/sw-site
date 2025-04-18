# SW-SITE/CMS

## Setup inicial

Crie uma cópia do arquivo `.env.example`, renomeie para `.env` e preencha as variáveis de ambiente necessárias.

```bash
DATABASE_URI=file:./your-database-name.db
PAYLOAD_SECRET=YOUR_SECRET_HERE
```

Do root do projeto, execute o seguinte comando para instalar as dependências:

```bash
pnpm --filter sw-site-cms install
```

## Rodando o projeto localmente

Para rodar o projeto localmente, utilize o seguinte comando:

```bash
cd apps/cms
pnpm --filter sw-site-cms dev
```

ou, se estiver no root do projeto:

```bash
pnpm run cms:dev
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

### Deploy inicial - Novas aplicações

Para fazer o deploy inicial de uma nova aplicação [revise o arquivo `fly.toml`](https://fly.io/docs/reference/configuration/) e faça as alterações necessárias.

Então, crie um novo aplicativo com o seguinte comando:

```bash
flyctl launch
```

Para fazer o deploy inicial do banco de dados, utilize o seguinte comando:

```bash
fly volumes create <volume name>

<!-- TODO - Revisar e documentar o processo de criação do banco de dados SQLite no fly.io. -->