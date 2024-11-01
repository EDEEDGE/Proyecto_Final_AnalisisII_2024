# PROYECTO FINAL ANALISIS DE SISTEMAS II

INTEGRANTES:
# ELDER JOSUE EFRAIN CAAL FIGUEROA 0902-21-19739
# SELVIN IGNACIO PELICÓ TIUL 0902 - 21 - 10254
# ELVIS RONALDO MORALES CHOC 0902-21-19503
# ERICK ESTUARDO MEJIA HERNANDEZ 0902-21-5195
# JOSUE ANTONIO MAQUIN CHOCOOJ 0902-21-9280


TECNOLOGIAS UTILIZADAS
Este proyecto utiliza tecnologias web como html, javascript, nodejs y express del lado del servidor. 
Una lista de las diferentes tecnologias y logica de trabajo que se implemento
# Javascritp
# Nodejs y express
# HTML 5
# Base de datos POSTGRESQL en local y SQLServer en Azure DataBase
# Github como area de trabajo, manejo de versiones, ramas y repositorio

DEPENDENCIAS UTILIZADAS
# npm init -y //para iniciar y crear el archivo package.json
# npm install express // para construir el servidor web
# npm install dotenv // para manejar variables de entorno
# npm install sequelize //para manejar base de datos relacionales, en este caso POSTGRESQL y en un futuro implementar SQLSever en azure DataBase
# npm install pg pg-hstore //conctores para base de datos POSTGRES
# npm install bcryptjs //para encriptar contraseñas y los tokens
# npm install jsonwebtoken //nos ayudara a crear una logica de login mas segura y compleja

VARIABLES DE ENTORNO UTILIZADAS

# DB_TYPE=postgresql // para el tipo de base de datos que se utilizara, se pueden agregar mas tipos de bases de datos
# DB_HOST=localhost || dpg-cs8lfid6l47c73djg5jg-a.oregon-postgres.render.com //una es para local y la otra para la base de datos remota
# DB_PORT=5432 //puerto de la base de datos, este no cambia para el local y en produccion
# BD_USER=postgres || postgres_prueba_xglk_user //usuario postgres local y el de la base de datos remota
# DB_PASSWORD=<contraseña> || 4AwboYYkZ8vqDIYI8gSFYWiE2eOAboX5
# DB_NAME=proyecto01 || postgres_prueba_xglk //nombre de la base de datos local y remota
# SSL=false || true //parametro para conectar a la base de datos remota, si es local se debe dejar en false.

DEPENDENCIAS EXTRAS
#conexion con la api de imgur
# IMGUR_CLIENT_ID=313a4438a99bd0b // mi id de imgur
# IMGUR_CLIENT_SECRET=7dfdb6a1e3ebebd8abe2b9c99e07982ba4e8fa53 // mi client secret
