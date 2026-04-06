# 🏋️‍♂️ GymManager API

Uma API REST robusta para gestão de academias, focada no controle de alunos e planos de treinos. Desenvolvida com **Node.js**, **Prisma ORM** e seguindo rigorosamente a arquitetura **MVC** e princípios de **Clean Code**.

---

## 🚀 Sobre o Projeto

Este sistema foi concebido para simular um ambiente real de backend para academias. Ele gerencia o ciclo de vida dos alunos (com integração de endereço via ViaCEP) e o catálogo de treinos, incluindo geração de relatórios profissionais em PDF e manipulação inteligente de imagens.

### Principais Diferenciais:
* **Arquitetura MVC:** Separação clara entre rotas, controladores e modelos para facilitar a manutenção.
* **Segurança:** Proteção de rotas sensíveis da Entidade Principal via Header `X-API-Key`.
* **Resiliência:** Tratamento de erros detalhado para falhas em serviços externos e validações de negócio.
* **Performance:** Processamento de imagens com Sharp para otimização de armazenamento.

---

## 🛠️ Tecnologias Utilizadas

* **Node.js**
* **Express**
* **Prisma ORM**
* **API ViaCEP**
* **Multer (Upload), Sharp (Processamento de Imagem) e html-pdf-node (PDF)**

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

---
