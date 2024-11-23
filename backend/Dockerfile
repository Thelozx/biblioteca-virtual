FROM node:16

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos necessários
COPY package*.json ./

RUN npm install

# Copia o restante do código
COPY . .

# Expõe a porta 3000
EXPOSE 3000

# Comando para iniciar o backend
CMD ["node", "server.js"]

