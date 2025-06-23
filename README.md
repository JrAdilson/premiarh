# DASS - Sistema de Gerenciamento de Funcionários

## Estrutura do Projeto
```
    Back/  # API Backend (Node + Express + PostgreSQL)
    Front/ # Frontend (Vue + Quasar)
```

## Como rodar o projeto?

### Backend

cd /Back
Copie todo o conteúdo do arquivo _.env-example_ na raiz da pasta _Back_
Crie um novo arquivo denominado _.env_ e cole todo o exemplo repassado.

cd /db
Na pasta db, rode o comando:
_docker compose up -d_ 
Este será o responsável por criar os contâiners do docker (node, pg e pgadmin)

OBS: a API irá rodar sob a porta 3000
bônus: para acesso ao pgadmin, acesse: http://localhost:5050/

#### Configuração do PGAdmin:
    Após acessar a URL acima, utilize as credenciais:
    admin@admin.com
    admin

    Em seguida, crie um novo server, com o nome desejado e as configurações (Connection):
        - host: dass-db
        - port: 5432
        - user: postgres
        - password: 12345

### Frontend

cd /Front
npm install
quasar dev

Mediante a isso, instalará o necessário para utilizarmos o front, assim abrindo o front na URL:
http://localhost:8080/