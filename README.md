# spacewiz.dev

[![Site Status](https://img.shields.io/website?url=https%3A%2F%2Fspacewiz.dev%2F)](https://spacewiz.dev/)
[![Deploy Status](https://img.shields.io/github/actions/workflow/status/Space-Wizard-Studios/sw-site/deploy_firebase.yml?label=deploy)](https://github.com/Space-Wizard-Studios/sw_site/actions/workflows/deploy_firebase_live.yml)
[![Current Version](https://img.shields.io/github/package-json/v/Space-Wizard-Studios/sw-site)](https://spacewiz.dev/)
[![Release Progress](https://img.shields.io/github/milestones/progress/Space-Wizard-Studios/sw-site/1)](https://github.com/Space-Wizard-Studios/sw_site/milestone/1)
[![Codacy Badge](https://img.shields.io/codacy/grade/b41425b7246b40278a3db6b3a209710a?logo=codacy&style=flat)](https://app.codacy.com/gh/Space-Wizard-Studios/sw-site/dashboard)

[![node.js version](https://img.shields.io/github/package-json/node/Space-Wizard-Studios/sw-site?logo=nodedotjs)](https://nodejs.org/)
[![Astro Version](https://img.shields.io/github/package-json/dependency-version/Space-Wizard-Studios/sw-site/astro?logo=astro)](https://astro.build/)
[![React Version](https://img.shields.io/github/package-json/dependency-version/Space-Wizard-Studios/sw-site/react?logo=react)](https://pt-br.reactjs.org/)
[![Tailwind Version](https://img.shields.io/github/package-json/dependency-version/Space-Wizard-Studios/sw-site/tailwindcss?label=tailwind&logo=tailwindcss)](https://tailwindcss.com/)

![Relatório do Lighthouse resumido](./lighthouse_results/mobile/pagespeed.svg)
[Relatório do Lighthouse](https://htmlpreview.github.io/?https://github.com/Space-Wizard-Studios/sw-site/blob/main/lighthouse_results/mobile/sw_space_site__dev_vakkwqk0_web_app.html)

## Sobre o projeto

Baseado em [Astro](https://astro.build/) + [React](https://pt-br.reactjs.org/)  + [Tailwind CSS](https://tailwindcss.com/) e projetado levando em conta as melhores práticas de desenvolvimento web, este é um projeto open-source que tem como objetivo entregar um site rápido, otimizado e um ambiente amigável ao desenvolvedor.

Sinta-se livre para clonar este projeto, modificá-lo, alterar seu conteúdo, testar as funcionalidades ou utilizá-lo como **base** para um projeto de sua autoria (comercial ou não comercial). Para mais informações, veja em [Licença](https://github.com/Space-Wizard-Studios/sw-site#Licença).

## Comandos

Requerimentos:

- Node.js 14 ou superior
- npm

```pwsh
git clone https://github.com/Space-Wizard-Studios/sw-site.git
cd sw-site
```

Todos os comandos rodam em um terminal a partir da raiz do projeto.

| Comando                   | Ação                                              |
| :------------------------ | :-------------------------------------------------|
| `npm install`             | Instala as dependências                           |
| `npm run dev`             | Inicia um servidor local de desenvolvimento       |
| `npm run build`           | Builda o site para produção em .dist/             |
| `npm preview`             | Abre uma preview da build localmente              |
| `npm run astro`           | Roda o CLI do astro como `astro add`              |
| -                         | -                                                 |
| `npm run lint`            | Roda o StyleLint                                  |

## Estrutura do projeto

```txt
.
├── public/
│   ├── images/
│   │   ├── projects/
│   │   └── team/
│   └── models/
└── src/
    ├── assets/
    │   └── styles/
    ├── components/
    │   ├── atoms/
    │   ├── core/
    │   ├── icons/
    │   └── widgets/
    ├── data/
    │   ├── policies/
    │   └── projects/
    ├── hooks/
    ├── layout/
    └── pages/
```

### Configuração

Arquivo de configuração básica: `./src/config.mjs`

### Licença

Esse **projeto** é licenciado sobre a licença MIT em [LICENCE.md](https://github.com/Space-Wizard-Studios/sw-site/blob/main/LICENSE.md).

Os materiais audiovisuais distribuídos nesse projeto (como gráficos, imagens, textos, sons e outros) são de propriedade de Space Wizard Studios, pessoa jurídica de propriedade privada. Para mais informações, acesse [https://spacewiz.dev/policies/terms/](https://spacewiz.dev/policies/terms/). Em hipótese alguma distribua os **materiais** aqui disponíveis para uso comercial ou não comercial.
