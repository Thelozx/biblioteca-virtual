# Etapa de produção: usar nginx para servir arquivos estáticos
FROM nginx:alpine

# Copiar os arquivos estáticos diretamente para o Nginx
COPY ./assets /usr/share/nginx/html

# Expor a porta padrão do nginx
EXPOSE 80

# Comando padrão para iniciar o nginx
CMD ["nginx", "-g", "daemon off;"]