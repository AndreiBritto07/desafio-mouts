# Desafio Mouts — Automação de Testes com Cypress

Projeto de automação de testes **end-to-end (frontend)** e **API REST**, desenvolvido para um desafio técnico de Quality Assurance, utilizando **Cypress**, **JavaScript**, **Cucumber/Gherkin** e **Faker**.

A aplicação utilizada é o [ServeRest](https://serverest.dev/), com interface web em [front.serverest.dev](https://front.serverest.dev/).

## Escopo e cobertura

O projeto contém **16 cenários**, distribuídos em duas features:

| Arquivo | Cenários | Cobertura |
| --- | ---: | --- |
| `cypress/e2e/features/desafio.feature` | 6 | 3 cenários frontend e 3 cenários API do desafio original |
| `cypress/e2e/features/validacoes_negativas_api.feature` | 10 | 5 validações negativas de login e 5 de cadastro de usuários via API |

### Cenários do desafio original

**Frontend (3):**
1. Cadastrar administrador e acessar a listagem de produtos.
2. Cadastrar administrador e acessar a listagem de usuários.
3. Cadastrar cliente, acessar os detalhes de um produto, adicioná-lo à lista de compras e verificar a mensagem exibida ao seguir para o carrinho.

**API (3):**
1. Cadastrar administrador e consultar os dados persistidos por ID (`201` na criação).
2. Autenticar administrador e validar o token de autorização (`200` no login).
3. Cadastrar produto com autenticação de administrador e consultar os dados persistidos por ID (`201` na criação).

### Cenários negativos adicionais de API

**Login (5):** email não cadastrado, senha incorreta, email ausente, senha ausente e formato de email inválido.

**Cadastro (5):** email duplicado, nome ausente, email ausente, formato de email inválido e senha ausente.

Os cenários negativos verificam respostas de erro (`400` ou `401` conforme o caso), incluindo propriedades e mensagens de validação.

## Tecnologias

- **JavaScript** — linguagem de implementação.
- **Cypress 16.3.0** — execução de testes frontend e API.
- **Cucumber (`@badeball/cypress-cucumber-preprocessor`)** — cenários BDD em Gherkin.
- **esbuild** — pré-processamento dos arquivos de teste.
- **Faker (`@faker-js/faker`)** — geração de dados dinâmicos para testes.
- **GitHub Actions** — integração contínua e execução agendada dos cenários originais.

## Estrutura do projeto

```text
.
├── .github/
│   └── workflows/
│       └── cypress-tests.yml
├── cypress/
│   ├── e2e/
│   │   └── features/
│   │       ├── desafio.feature
│   │       └── validacoes_negativas_api.feature
│   └── support/
│       ├── api/
│       │   └── clients/              # Requisições à API ServeRest
│       ├── factories/                # Geração de usuários e produtos
│       ├── pages/                    # Page Objects da interface web
│       ├── step_definitions/         # Implementações dos passos Gherkin
│       ├── commands.js
│       └── e2e.js
├── cypress.config.js
├── package.json
└── package-lock.json
```

A organização separa a descrição dos comportamentos (`features`), os passos de execução (`step_definitions`), a interação com páginas (`pages`), o acesso à API (`api/clients`) e a criação de dados (`factories`).

## Pré-requisitos

- Node.js e npm instalados, em versões compatíveis com as dependências do projeto.
- Google Chrome instalado para os comandos que utilizam `--browser chrome`.
- Acesso à internet para utilizar os ambientes públicos do ServeRest.

## Instalação

Clone o repositório e instale as dependências:

```bash
git clone <URL_DO_SEU_REPOSITORIO>
cd desafio-mouts
npm ci
```

> Substitua `<URL_DO_SEU_REPOSITORIO>` pelo endereço do repositório publicado no GitHub.

## Execução dos testes

**Abrir a interface interativa do Cypress:**

```bash
npx cypress open
```

**Executar apenas os 6 cenários do desafio original (Chrome):**

```bash
npx cypress run --spec "cypress/e2e/features/desafio.feature" --browser chrome
```

**Executar apenas os 10 cenários negativos de API (Chrome):**

```bash
npx cypress run --spec "cypress/e2e/features/validacoes_negativas_api.feature" --browser chrome
```

**Executar as duas features (16 cenários):**

```bash
npx cypress run --browser chrome
```

Os testes utilizam os ambientes públicos do ServeRest. A disponibilidade desses serviços e os dados existentes no ambiente podem influenciar os resultados.

## Configuração

O arquivo `cypress.config.js` define:

- `baseUrl`: `https://front.serverest.dev/login`.
- `defaultCommandTimeout`: `5000` ms.
- `specPattern`: `cypress/e2e/features/*.feature`.
- Integração do preprocessor Cucumber com esbuild.

As requisições de API são feitas pelos clientes em `cypress/support/api/clients/`, direcionados ao serviço `https://serverest.dev`.

## Integração contínua — GitHub Actions

O workflow está definido em `.github/workflows/cypress-tests.yml` e foi configurado para executar **somente `desafio.feature`**, ou seja, **os 6 cenários originais**. Os 10 cenários negativos permanecem disponíveis para execução local, mas não integram esse workflow.

Gatilhos previstos no workflow:

- **Push** na branch `main`.
- **Execução manual** pela aba **Actions** do GitHub.
- **Agendamento diário** com cron `0 11 * * *` (11h UTC, equivalente a 8h em Brasília no UTC−3).

A execução utiliza um runner Ubuntu e o navegador Chrome, por meio de `cypress-io/github-action@v6`. Em caso de falha, o workflow tenta disponibilizar capturas de tela como artefatos (`cypress-screenshots`).

> **Atenção antes de publicar:** a versão enviada do workflow inclui `timezone: 'America/Sao_Paulo'` dentro de `schedule`, propriedade que não faz parte da sintaxe suportada para agendamento do GitHub Actions. Remova essa linha do YAML e mantenha `cron: '0 11 * * *'` para agendar às 8h de Brasília (UTC−3). O GitHub pode atrasar o início de execuções agendadas em períodos de alta carga.

## Evidências e resultados

O Cypress apresenta o resultado dos cenários no terminal e, quando configurado para isso, produz screenshots de falhas em `cypress/screenshots/`. No GitHub Actions, essas capturas podem ser consultadas nos artefatos da execução com falha.

## Boas práticas adotadas

- Cenários descritos em Gherkin, separando comportamento e implementação.
- Page Object Model para centralizar interações com a interface.
- Clientes de API para centralizar requisições HTTP.
- Factories com Faker para reduzir dependência de dados estáticos de usuários e produtos criados via API.
- Assertivas de status HTTP, conteúdo das respostas, rotas, componentes e dados apresentados.
- Separação entre o escopo obrigatório do desafio e a cobertura negativa adicional.

## Observações

- O fluxo de carrinho verifica a mensagem **“Em construção aguarde”**, conforme o comportamento contemplado no cenário existente.
- O ambiente ServeRest é externo ao repositório e pode sofrer alterações.
- A execução automática foi delimitada intencionalmente aos **6 cenários do desafio original**.

---

**Projeto desenvolvido para avaliação técnica de automação de testes em QA.**
