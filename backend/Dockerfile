FROM node:18-alpine

WORKDIR /app

# Solo copia los archivos necesarios para la instalación
COPY package.json ./

# Instala solo dependencias de producción
RUN npm install --only=production

# Copia el resto del código fuente
COPY ./src ./src

# (Opcional) establecer variable de entorno
ENV NODE_ENV=production

EXPOSE 3000
CMD ["node", "src/index.js"]
