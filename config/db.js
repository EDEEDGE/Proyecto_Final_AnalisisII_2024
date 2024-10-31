require('dotenv').config();
const { Sequelize } = require('sequelize');

const { DB_TYPE, DB_HOST, DB_PORT, BD_USER, DB_PASSWORD, DB_NAME, SSL } = process.env;

let dbclient;

switch (DB_TYPE) {
    case 'postgresql':
        dbclient = new Sequelize(DB_NAME, BD_USER, DB_PASSWORD, {
            host: DB_HOST,
            port: DB_PORT,
            dialect: 'postgres',
            dialectOptions: SSL === 'true' ? {
                ssl: {
                    require: true,
                    rejectUnauthorized: false
                }
            } : {},
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        });
        break;
    default:
        throw new Error("BD_TYPE no soportado. Verifica tus variables de entorno");
}

module.exports = dbclient;
