// archivo preparado para conectarnos a la base de datos
require('dotenv').config();//cargar las variables de entorno desde el .env
const {Sequelize} = require('sequelize');//llamamos a la dependencia sequelize para base de datos relacional

const {DB_TYPE,DB_HOST,DB_PORT,DB_USER,DB_PASSWORD,DB_NAME} = process.env;

let dbclient; //variable que controla que tipo de base de datos puede soportar el sistema

switch(DB_TYPE){
    case 'postgresql':
        dbclient = new Sequelize(DB_NAME,DB_USER,DB_PASSWORD,{
            host:DB_HOST,
            port: DB_PORT,
            dialect:'postgres',
        });
        break;
    default:
        throw new Error("BD_TYPE no soportado. Verifica tus variables de entorno");
}

module.exports=dbclient;


