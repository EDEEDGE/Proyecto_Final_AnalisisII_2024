require('dotenv').config(); // cargar las variables de entorno desde el .env
const { Sequelize } = require('sequelize'); // llamamos a la dependencia sequelize para base de datos relacional

// Destructurar las variables de entorno
const { DB_TYPE, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

// Crear el cliente de la base de datos
const dbclient = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres',
<<<<<<< HEAD
   dialectOptions: {
        ssl: false // Desactivar SSL completamente
    },
    // dialectOptions: {
    //     ssl: {
    //         require: true, // Es obligatorio usar SSL
    //         rejectUnauthorized: false // Solo si estás usando un certificado autofirmado
    //     }
    // },
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
module.exports = dbclient;
=======
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // Si estás usando un certificado autofirmado
        }
    },
    pool: {
        max: 5,         // Número máximo de conexiones activas
        min: 0,         // Número mínimo de conexiones activas
        acquire: 30000, // Tiempo máximo antes de lanzar un error si no se puede adquirir una conexión
        idle: 10000     // Tiempo que una conexión puede estar inactiva antes de ser liberada
    }
});
module.exports = dbclient;
>>>>>>> 1700e1c32b50652c157a2916b655110fed165f38
