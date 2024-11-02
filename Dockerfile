# Dockerfile para el backend
FROM node:20

# Crear y establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar el package.json y package-lock.json e instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto del código del backend
COPY . .

# Exponer el puerto del backend
EXPOSE 3002

# Iniciar el backend
CMD ["node", "index.js"]
