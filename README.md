# Space Wizard Studios - Monorepo Web

Este monorepo contém o código-fonte do site da Space Wizard Studios ([spacewiz.dev](https://spacewiz.dev)) e seu Sistema de Gerenciamento de Conteúdo (CMS) complementar.

## Estrutura do Projeto

Este projeto utiliza workspaces `pnpm` para gerenciar múltiplas aplicações dentro de um único repositório.

- `apps/site`: O site público construído com Astro, React e Tailwind CSS. Veja o [README do site](apps/site/README.md) para mais detalhes.
- `apps/cms`: O Payload CMS usado para gerenciar o conteúdo do site. Veja o [README do CMS](apps/cms/README.md) para mais detalhes.
- `libs/shared`: Bibliotecas ou componentes compartilhados potencialmente usados em diferentes aplicações (atualmente vazio).

## Começando

### Pré-requisitos

- Node.js (Verifique `.nvmrc` ou `package.json` engines se especificado)
- `pnpm` (Instale via `npm install -g pnpm`)

### Instalação

Clone o repositório e instale as dependências a partir do diretório raiz

```bash
git clone https://github.com/Space-Wizard-Studios/sw-site
cd sw-site
pnpm install
```

## Rodando as Aplicações

### Rodando o Website (`apps/site`)

Para rodar o site em modo de desenvolvimento:

```bash
pnpm run site:dev
```

Ou navegue até o diretório do site e execute o script de desenvolvimento:

```bash
cd apps/site
pnpm run dev
```

### Rodando the CMS (`apps/cms`)

Primeiro, certifique-se de ter configurado as variáveis de ambiente para o CMS conforme descrito no [README](apps/cms/README.md#setup-inicial).

Para rodar o CMS em modo de desenvolvimento:

```bash
pnpm run cms:dev
```

Ou navegue até o diretório do CMS e execute o script de desenvolvimento:

```bash
cd apps/cms
pnpm run dev
```

Consulte os arquivos README específicos para comandos de build e outros scripts:

- [README do Site](apps/site/README.md)
- [README do CMS](apps/cms/README.md)

## License

O código-fonte das aplicações dentro deste repositório está licenciado sob a Licença MIT. Veja o arquivo [LICENSE.md](LICENSE.md) file for more details.

**Nota**: Apesar de o *código* ser licenciado sob MIT, o *conteúdo* (texto, imagens e marca) exibido no site possui termos de uso diferentes. Consulte os termos de uso ([apps/site/src/content/policies/terms.md](apps/site/src/content/policies/terms.md)) e a política de privacidade ([apps/site/src/content/policies/privacy.md](apps/site/src/content/policies/privacy.md)) do site para detalhes sobre o uso do conteúdo.
