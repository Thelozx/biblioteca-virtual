# Usar a imagem oficial do Node.js
FROM node:16

# Definir o diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Copiar apenas os arquivos de dependências para o contêiner
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante do código para o contêiner
COPY . .

# Expor a porta que o backend utiliza
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["npm", "start"]

