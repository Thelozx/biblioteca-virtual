# Etapa de construção
FROM node:18 AS build
WORKDIR /app

# Instalar dependências
COPY package*.json ./
RUN npm install

# Copiar os arquivos do projeto e construir o frontend
COPY . .
RUN npm run build

# Etapa de produção: usar nginx para servir arquivos estáticos
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Expor a porta padrão do nginx
EXPOSE 80

# Comando padrão para iniciar o nginx
CMD ["nginx", "-g", "daemon off;"]

