# PREMIA RH - Sistema de Gerenciamento de Funcionários

## Estrutura do Projeto
```
    Back/  # Backend
    Front/ # Frontend
```

## Como rodar o projeto?

- cd \Back\db
    - Na pasta db, rode o comando:
        - _docker compose up --build_ 
        - Este será o responsável por criar os contâiners do docker (api, banco, pgadmin e front)

- OBS: 
    - a API irá rodar sob a porta 3000 (http://localhost:3000/)
    - o FRONT poderá ser acessado a partir de: http://localhost:8080/
    - bônus: para acesso ao pgadmin, acesse: http://localhost:5050/

#### Configuração do PGAdmin:
    Após acessar a URL acima (PGAdmin), utilize as credenciais:
    admin@admin.com
    admin

    Em seguida, crie um novo server, com o nome desejado e as configurações (Connection):
        - host: premiarh-db
        - port: 5432
        - user: postgres
        - password: 12345