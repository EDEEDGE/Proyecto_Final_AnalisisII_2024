require('dotenv').config(); // cargar las variables de entorno desde el .env
const { Sequelize } = require('sequelize'); // llamamos a la dependencia sequelize para base de datos relacional

// Destructurar las variables de entorno
const { DB_TYPE, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

// Crear el cliente de la base de datos
const dbclient = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'postgres',
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