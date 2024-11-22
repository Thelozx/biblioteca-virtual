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

    para rodar a aplicação, vá para a pagina onde esta o arquivo e use o comando:
    docker-compose up --build



