# 🏋️‍♂️ GymManager API

Uma API REST robusta para gestão de academias, focada no controle de alunos e planos de treinos.
Desenvolvida com **Node.js**, **Prisma ORM** e seguindo rigorosamente a arquitetura **MVC** e
princípios de **Clean Code**.

---

## 🚀 Sobre o Projeto

Este sistema foi concebido para simular um ambiente real de backend para academias. Ele gerencia o
ciclo de vida dos alunos (com integração de endereço via ViaCEP) e o catálogo de treinos com sistema
de disponibilidade de itens.

### Principais Diferenciais:

- **Arquitetura MVC:** Separação clara entre rotas, controladores e modelos para facilitar a
  manutenção.
- **Segurança:** Proteção de todas as rotas via Header `X-API-Key`.
- **Resiliência:** Tratamento de erros detalhado para falhas em serviços externos e validações de
  negócio.
- **Disponibilidade:** Sistema inteligente de controle de disponibilidade de treinos (visualização e
  utilização).

---

## 🛠️ Tecnologias e Ferramentas

- **Node.js**
- **Express**
- **Prisma ORM**
- **API ViaCEP**
- **PostgreSQL**

---

# File Tree: academiaAPI

```
├── 📁 prisma
│   ├── 📄 schema.prisma
│   └── 📄 seed.js
├── 📁 src
│   ├── 📁 controllers
│   │   ├── 📄 alunoController.js
│   │   └── 📄 treinoController.js
│   ├── 📁 models
│   │   ├── 📄 AlunoModel.js
│   │   └── 📄 TreinoModel.js
│   ├── 📁 routes
│   │   ├── 📄 alunoRoute.js
│   │   └── 📄 treinoRoute.js
│   ├── 📁 utils
│   │   ├── 📄 fotoHelper.js
│   │   ├── 📄 pdfHelper.js
│   │   ├── 📄 prismaClient.js
│   │   ├── 📄 viaCep.js
│   │   └── 📄 apiKey.js
│   └── 📄 server.js
├── ⚙️ .gitignore
├── 📝 ReadMe.MD
├── 📄 inicial.js
├── ⚙️ package-lock.json
├── ⚙️ package.json
└── 📄 prisma.config.js
```

## 🏁 Instalação e Configuração

Siga os passos abaixo para configurar o ambiente de desenvolvimento:

### 1. Clonagem e Dependências

```bash
# Clone o repositório
git clone https://github.com/lisboathecoder/apiAcademia.git

# Acesse o diretório
cd apiAcademia

# Instale as dependências
npm install

# Crie o arquivo .env e configure sua DATABASE_URL
# Exemplo: DATABASE_URL="postgresql://user:password@localhost:5432/academia"

# Execute as migrações para criar as tabelas
npx prisma migrate dev --name init

# (Opcional) Popule o banco com dados de teste
npx prisma db seed

# Iniciar o servidor
npm run dev
```

## 🛣️ Endpoints da API

Abaixo estão listadas as rotas disponíveis. **Todas as rotas exigem a inclusão da `X-API-Key` no
Header da requisição.**

### 👤 Alunos

| Método     | Endpoint      | Descrição                                     |
| :--------- | :------------ | :-------------------------------------------- |
| **GET**    | `/alunos`     | Lista todos os alunos cadastrados             |
| **GET**    | `/alunos/:id` | Retorna detalhes de um aluno específico       |
| **POST**   | `/alunos`     | Cadastra um novo aluno (Busca CEP automática) |
| **PUT**    | `/alunos/:id` | Atualiza informações de um aluno              |
| **DELETE** | `/alunos/:id` | Remove um aluno do sistema                    |

### 🏋️‍♂️ Treinos

| Método     | Endpoint                   | Descrição                                                 |
| :--------- | :------------------------- | :-------------------------------------------------------- |
| **GET**    | `/treinos`                 | Lista todos os treinos                                    |
| **GET**    | `/treinos?alunoId={id}`    | Lista treinos de um aluno específico (apenas disponíveis) |
| **GET**    | `/treinos?disponivel=true` | Lista apenas treinos disponíveis no catálogo              |
| **GET**    | `/treinos/:id`             | Retorna detalhes de um treino específico                  |
| **POST**   | `/treinos`                 | Cria um novo plano de treino                              |
| **PUT**    | `/treinos/:id`             | Atualiza informações de um treino                         |
| **DELETE** | `/treinos/:id`             | Remove um treino do sistema                               |

---

### 🔑 Exemplo de Header de Segurança

Para acessar as rotas, utilize:

```http
X-API-Key: sua_chave_secreta_aqui
Content-Type: application/json
```

## By:

### Fernando Santos

### Danilo Jorge

### Gustavo Lisboa

### Yasmin Crisóstomo

### Maria Eduarda de Andrade

### Fabio Henrique

---
