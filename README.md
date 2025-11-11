# 🖥️ Servidor de Propaganda — Programação Web (UFSC)

> Trabalho prático da disciplina de **Programação Web**  
> Curso de **Engenharia de Computação — UFSC (2025.2)**

## 👨‍💻 Integrantes

- **Caroline Leticia Lanzuolo Yamaguchi**  
- **Fábio Marcon Siqueira**  
- **Ian Andriani Gonçalves**

---

## 📘 Descrição do Projeto

O **Servidor de Propaganda** é uma aplicação web que simula o sistema de gerenciamento de **totens digitais** em ambientes universitários.  
Esses totens exibem slides informativos sobre **eventos, defesas, minicursos e comunicados**, atualizados automaticamente a partir de um servidor central.

A aplicação é composta por:

- **Backend (Node.js + Express + MongoDB)**  
  Responsável pela autenticação, autorização e gerenciamento dos slides (parte administrativa).  
- **Frontend (Vue.js)**  
  Interface visual que exibe os slides e permite a interação administrativa.  
- **MongoDB + Mongo Express**  
  Armazenamento e visualização dos dados em ambiente containerizado.

---

## 🎯 Contexto (Resumo do Trabalho)

De acordo com o enunciado oficial:

> “O servidor web é responsável por gerenciar e enviar as informações aos totens digitais, utilizando a tecnologia **Server-Sent Events (SSE)**.  
> O administrador, através de uma interface web, pode criar, editar ou remover slides armazenados no banco de dados.  
> Esses slides são automaticamente enviados aos totens conectados, que os exibem em ciclo contínuo (loop), garantindo atualização automática do conteúdo.”

Cada **slide** possui:
- **Título**
- **Duração de exibição (s)**
- **Conteúdo HTML**
- **Data de expiração**

---

## 🧱 Arquitetura (Docker Compose)

O ambiente completo é configurado via **Docker Compose**, contendo:

```yaml
version: '3.9'

services:
  mongo:
    image: mongo:noble
    restart: always
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: root
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db

  mongo-express:
    image: mongo-express
    restart: always
    ports:
      - "8081:8081"
    environment:
      ME_CONFIG_MONGODB_URL: mongodb://root:root@mongo:27017/
      ME_CONFIG_BASICAUTH_ENABLED: true
      ME_CONFIG_BASICAUTH_USERNAME: felipe
      ME_CONFIG_BASICAUTH_PASSWORD: felipe
    depends_on:
      - mongo

  backend:
    build: ./backend
    container_name: express-backend
    restart: always
    ports:
      - "3000:3000"
    environment:
      MONGO_URL: mongodb://root:root@mongo:27017/
      PORT: 3000
    depends_on:
      - mongo
    volumes:
      - ./backend:/app
      - /app/node_modules

  frontend:
    build: ./frontend
    container_name: vue-frontend
    restart: always
    ports:
      - "5173:5173"
    depends_on:
      - backend
    volumes:
      - ./frontend:/app
      - /app/node_modules
    command: ["npm", "run", "dev", "--", "--host"]

volumes:
  mongo_data:
```

---

## ⚙️ Configuração do Ambiente

Crie um arquivo `.env` dentro da pasta `backend/` com o seguinte conteúdo:

```env
PORT=3000
MONGO_URI=mongodb://root:root@mongo:27017/servidor_propaganda?authSource=admin
JWT_SECRET=sua_chave_jwt_supersecreta
PEPPER_SECRET=sua_chave_pepper_supersecreta
```

---

## 🚀 Como Executar o Projeto

### 🧩 1. Subir o ambiente completo com Docker

No diretório raiz do projeto:

```bash
docker-compose up --build
```

> Isso inicializa o MongoDB, Mongo Express, backend e frontend simultaneamente.

- **Frontend:** http://localhost:5173  
- **Backend (API):** http://localhost:3000  
- **Mongo Express:** http://localhost:8081 (login: `felipe` / senha: `felipe`)  

---

### 🧠 2. Executar apenas o backend (modo desenvolvimento)

Se preferir testar o backend localmente:

```bash
cd backend
npm install
npm run dev
```

A API será iniciada em:
```
http://localhost:3000
```

---

## 🔐 Autenticação e Autorização

O sistema utiliza **JWT (JSON Web Token)** e controle de acesso por `role`:

- **Usuário comum (`role = 0`)**
- **Administrador (`role = 1`)**

### Rotas principais:

| Método | Endpoint           | Descrição                             | Autenticação |
|--------|--------------------|---------------------------------------|---------------|
| POST   | `/api/auth/register`   | Cria um novo usuário                  | ❌ Pública |
| POST   | `/api/auth/login`      | Faz login e retorna um token JWT      | ❌ Pública |
| GET    | `/api/auth/protegida`  | Teste de rota autenticada             | ✅ JWT |
| GET    | `/api/admin/dashboard` | Acesso restrito a administradores     | ✅ JWT + Admin |

---

## 🧾 Exemplo de Login

```bash
POST /api/auth/login
Content-Type: application/json

{
  "username": "ian",
  "senha": "ian123"
}
```

Retorno esperado:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "691285aec236087e2845b0d4",
    "username": "ian",
    "role": 1
  }
}
```

---

## 🧠 Acesso à Documentação (Swagger)

A API está totalmente documentada com **OpenAPI 3.0** e pode ser acessada em:

👉 **[http://localhost:3000/api/docs](http://localhost:3000/api/docs)**

A documentação contém:
- Estrutura de requisições e respostas  
- Schemas dos objetos (`User`, `Token`, `Error`)  
- Retornos de erro (`401`, `403`, `500`)  
- Autenticação via **Bearer Token**

---

## 🧩 Estrutura do Projeto (Backend)

```
backend/
├── .env
├── Dockerfile
├── package.json
└── src/
    ├── app.js
    ├── server.js
    ├── config/
    │   ├── connection.js
    │   └── env.js
    ├── controllers/
    │   └── authController.js
    ├── middlewares/
    │   ├── auth.js
    │   ├── onlyAdmin.js
    │   └── errorHandler.js
    ├── models/
    │   └── User.js
    └── routes/
        ├── authRoutes.js
        └── adminRoutes.js
```

---

## 🧩 Autores

| Nome | Função |
|------|--------|
| Caroline Leticia L. Yamaguchi | Frontend |
| Fábio Marcon Siqueira | Backend / MongoDB |
| Ian Andriani Gonçalves | Backend / Documentação / Deploy |

---

**🧩 UFSC — Universidade Federal de Santa Catarina**  
**Disciplina:** Programação Web — 2025/2  
**Data limite:** 17/11/2025
