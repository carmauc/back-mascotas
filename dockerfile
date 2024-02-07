# Usa una imagen de Node.js como base
FROM node:latest

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el package.json y el package-lock.json para instalar las dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

ARG RAILWAY_STATIC_URL
ARG PUBLIC_URL
ARG PORT

# Comando para iniciar la aplicación
CMD ["node", "server.js"]
