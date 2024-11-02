# Dockerfile para el frontend
FROM node:20 as build

# Crear y establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar los archivos de configuración e instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto del código del frontend y construir la aplicación de producción
COPY . .
RUN npm run build

# Usar una imagen ligera de nginx para servir la aplicación
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html

# Exponer el puerto para el frontend
EXPOSE 80

# No es necesario un CMD ya que nginx se encargará de servir el contenido
