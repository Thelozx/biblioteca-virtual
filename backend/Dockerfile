# Usar a imagem oficial do Node.js
FROM node:18

# Definir o diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Copiar os arquivos de dependências
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install

# Copiar o restante do código da aplicação para o contêiner
COPY . .

# Expor a porta que o backend utiliza
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["npm", "start"]