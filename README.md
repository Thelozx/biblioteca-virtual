Projeto biblioteca virtual

<h1> Objetivo: </h1>

Desenvolver uma aplicação web distribuída utilizando contêineres Docker, na qual o frontend se comunica com o backend por meio de uma web service RESTful. Esta atividade visa proporcionar aos alunos experiência prática com a orquestração de contêineres, criação de APIs RESTful e a comunicação entre microserviços.

Orientações para uso:

    É necessário clonar o repositório com o comando git clone https://github.com/Thelozx/biblioteca-virtual
    
    Instalar as dependências gerais:

        docker --version
        node --version
        npm --version

    instalar as dependências do back (navegue até a pasta do back) :

        npm init -y 
        npm install express mysql dotenv
        node server.js
        npm --version
        npx nodemon server.js
    

    Recomendo instalar o nodemon, utilizando npm install nodemon
    Após isso rodar a aplicação utilizando nodemon src/index.js

    Passo a passo para rodar atraves do terminal:

        Vá ate o diretorio com o docker-compose.yml:
            - use o cd "local desejado"
        verifique se os dockers estão funcionando:
            - docker --version
            - docker-compose --version
        Suba os serviços:
            - docker-compose up --build
        Verifique os containers:
            - docker ps
        Por fim, acesse o navegador:
            http://localhost:3000/

    Configuração do banco de dados:
    Ps: Ao fim teste com o cmd node backend/db.js
        O nome do banco de dados:
            - registrado como biblioteca_virtual (altere com o nome do seu banco)
        Para a conexão:
            usamos o localhost, usuario padrão (root), que n possui senha
        O banco de dados foi configurado com:

            Usuario:
                - Id (PK)
                - Nome
                - Email
                - Senha

            Livros:
                - Id (PK)
                - Id_Usuario (FK)
                - Titulo
                - Autor
                - Descrição

    






