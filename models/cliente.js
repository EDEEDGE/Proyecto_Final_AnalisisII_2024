//archivo que se encargar de tener los modelos de la abse de datos
const {DataTypes} = require('sequelize'); //llamamos a la dependencia para bases de datos relacional y le asignamos el nombre datatypes
const dbclient=require('../config/db');//importar la conexion a la base de datos

const Cliente = dbclient.define('Cliente', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
});

module.exports = Cliente;