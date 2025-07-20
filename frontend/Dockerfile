# Etapa 1: Construcción del frontend
FROM node:18 AS builder

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: Servir frontend con NGINX
FROM nginx:stable-alpine

# Elimina archivos HTML por defecto
RUN rm -rf /usr/share/nginx/html/*

# Copia archivos de build
COPY --from=builder /app/dist /usr/share/nginx/html

# (Opcional) Copiar config personalizada de NGINX
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
