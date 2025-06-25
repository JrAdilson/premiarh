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
        - Este será o responsável por criar o container do docker (com as imagens: api, banco, pgadmin e front)

- OBS: 
    - a API irá rodar sob a porta 3000: http://localhost:3000/
        - V1 docs: http://localhost:3000/v1/docs/
    - o FRONT poderá ser acessado a partir de: http://localhost:8080/
    - PGAdmin, acesse: http://localhost:5050/

#### Configuração do PGAdmin:
    Após acessar a URL acima (PGAdmin), utilize as credenciais:
    admin@admin.com
    admin

    Em seguida, crie um novo server, com o nome desejado e as configurações (Connection):
        - host: premiarh-db
        - port: 5432
        - user: postgres
        - password: 12345

#### Caso encontre o erro no container/imagem do FRONT
    - Error: Cannot find module @rollup/rollup-linux-x64-gnu on Docker container #15532

    - Aqui será necessário ou rodar manualmente o projeto (cd Front, npm install e quasar dev)
    - Ou excluir as pastas nodemodules/package json - com premissa que pode não resolver
        - Aparentemente é um bug existente no NPM quanto a dependencias... 
        - https://github.com/vitejs/vite/discussions/15532