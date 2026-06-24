# API Delivery

API REST para gerenciamento de entregas de encomendas. O projeto permite cadastrar usuarios, autenticar com JWT, criar entregas, atualizar o status de uma entrega e registrar logs de acompanhamento.

## Tecnologias

- Node.js
- TypeScript
- Express
- Prisma ORM
- PostgreSQL
- JWT
- Zod
- Jest e Supertest
- Docker Compose

## Requisitos

- Node.js 18 ou superior
- Docker e Docker Compose
- NPM

## Como executar

Clone o projeto e instale as dependencias:

```bash
npm install
```

Crie o arquivo `.env` com base no `.env-example`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/api_delivery?schema=public"
JWT_SECRET="sua_chave_secreta"
PORT=3333
```

Suba o banco de dados com Docker:

```bash
docker compose up -d
```

Execute as migrations do Prisma:

```bash
npx prisma migrate dev
```

Inicie a API em modo de desenvolvimento:

```bash
npm run dev
```

A API ficara disponivel em:

```text
http://localhost:3333
```

## Scripts

```bash
npm run dev
```

Executa a aplicacao em modo de desenvolvimento com `tsx watch`.

```bash
npm run build
```

Gera a versao de producao na pasta `build`.

```bash
npm start
```

Executa a versao compilada da aplicacao.

```bash
npm run test:dev
```

Executa os testes em modo watch.

Para rodar os testes uma unica vez:

```bash
npx jest --runInBand
```

## Estrutura do projeto

```text
src
|-- config
|-- controllers
|-- database
|-- middlewares
|-- routes
|-- tests
|-- types
|-- utils
|-- app.ts
|-- env.ts
`-- server.ts
```

## Banco de dados

O projeto usa PostgreSQL com Prisma. Os principais modelos sao:

- `User`: usuario da aplicacao.
- `Delivery`: entrega vinculada a um usuario.
- `DeliveryLog`: historico de movimentacoes de uma entrega.

Tipos de usuario:

- `customer`: cliente.
- `sale`: vendedor/operador responsavel por gerenciar entregas.

Status de entrega:

- `processing`
- `shipped`
- `delivered`

Por padrao, usuarios criados pela rota de cadastro recebem o papel `customer`. Para testar rotas administrativas, altere o papel de um usuario para `sale` diretamente no banco.

Exemplo:

```sql
UPDATE users SET role = 'sale' WHERE email = 'usuario@email.com';
```

## Autenticacao

As rotas protegidas usam JWT no header `Authorization`:

```http
Authorization: Bearer seu_token
```

O token e retornado pela rota de sessao.

## Rotas

### Health check

```http
GET /
```

Resposta:

```json
{
  "status": "online",
  "message": "API Delivery no ar!"
}
```

### Criar usuario

```http
POST /users
```

Body:

```json
{
  "name": "Luiz Gustavo",
  "email": "luiz@email.com",
  "password": "123456"
}
```

Resposta `201`:

```json
{
  "id": "uuid-do-usuario",
  "name": "Luiz Gustavo",
  "email": "luiz@email.com",
  "role": "customer",
  "createdAt": "2026-05-22T00:00:00.000Z",
  "updatedAt": "2026-05-22T00:00:00.000Z"
}
```

### Login

```http
POST /sessions
```

Body:

```json
{
  "email": "luiz@email.com",
  "password": "123456"
}
```

Resposta `200`:

```json
{
  "token": "jwt-token",
  "user": {
    "id": "uuid-do-usuario",
    "name": "Luiz Gustavo",
    "email": "luiz@email.com",
    "role": "customer"
  }
}
```

### Criar entrega

Requer autenticacao e papel `sale`.

```http
POST /deliveries
```

Body:

```json
{
  "user_id": "uuid-do-cliente",
  "description": "Pedido com 2 caixas"
}
```

Resposta:

```http
201 Created
```

### Listar entregas

Requer autenticacao e papel `sale`.

```http
GET /deliveries
```

Retorna todas as entregas cadastradas, incluindo nome e email do usuario vinculado.

### Atualizar status da entrega

Requer autenticacao e papel `sale`.

```http
PATCH /deliveries/:id/status
```

Body:

```json
{
  "status": "shipped"
}
```

Status permitidos:

- `processing`
- `shipped`
- `delivered`

Ao atualizar o status, a API tambem cria um registro em `delivery_logs`.

### Criar log de entrega

Requer autenticacao e papel `sale`.

```http
POST /delivery-logs
```

Body:

```json
{
  "delivery_id": "uuid-da-entrega",
  "description": "Pedido saiu para entrega"
}
```

Regras:

- A entrega precisa existir.
- Nao e permitido criar log se a entrega ja estiver com status `delivered`.
- Nao e permitido criar log manual se a entrega ainda estiver com status `processing`; primeiro altere para `shipped`.

### Visualizar entrega com logs

Requer autenticacao.

```http
GET /delivery-logs/:delivery_id/show
```

Permissoes:

- `sale`: pode visualizar qualquer entrega.
- `customer`: pode visualizar apenas as proprias entregas.

## Testes

Os testes ficam em `src/tests` e usam Jest com Supertest.

Execute em modo watch:

```bash
npm run test:dev
```

Ou execute uma unica vez:

```bash
npx jest --runInBand
```

## Build e producao

Gere o build:

```bash
npm run build
```

Execute a aplicacao compilada:

```bash
npm start
```

Antes de iniciar em producao, confirme se as variaveis `DATABASE_URL`, `JWT_SECRET` e `PORT` estao configuradas no ambiente.
