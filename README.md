# To-do List Full Stack

Projeto para fins de estudo, implementando uma aplicação To-do List com front-end e back-end integrados a banco de dados PostgreSQL.

---

## Tecnologias utilizadas

- **Front-end:** HTML, CSS, JavaScript
- **Back-end:** Node.js, Express
- **Banco de Dados:** PostgreSQL
- **ORM/Driver:** node-postgres (`pg`)
- **Versionamento:** Git/GitHub

---

## Funcionalidades

- Adicionar tarefas
- Listar tarefas
- Marcar/desmarcar tarefas como feitas
- Excluir tarefas
- Persistência das tarefas em banco PostgreSQL na nuvem
- API RESTful

---

## Como rodar localmente

### **Pré-requisitos**
- Node.js e npm instalados
- PostgreSQL local ou acesso a um banco na nuvem(Hospedagem no Render)

### **Passos**

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/todo-fullstack.git
   cd todo-fullstack
   ```

2. **Configure o arquivo .env**
    ```bash
    DATABASE_URL=postgres://<usuario>:<senha>@localhost:5432/<nome_do_banco>
    ```
3. **Instale as dependências**
    ```bash
    npm install
    ```
4. **Crie a tabela no banco de dados**
    ```bash
    CREATE TABLE tasks (
        id SERIAL PRIMARY KEY,
        description TEXT NOT NULL,
        done BOOLEAN DEFAULT false
    );
    ```
5. **Inicie o servidor**
    ```bash
    npm run dev
    ```
6. **Inicie o servidor, acesse a pasta frontend/ e abra o index.html no navegador**

## **Principais rotas da API**

- GET /tasks para listar todas as tarefas
- POST /tasks para adicionar uma nova tarefa
```bash
{ "description": "Nova tarefa" }
```

- PUT /tasks/:id para marcar/desmarcar tarefa como feita
```bash
{ "done": true }
```

- DELETE /tasks/:id para excluir uma tarefa