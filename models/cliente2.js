const {DataTypes} = require('sequelize');
const dbclient = require('../config/db');
const Cotizacion = require('./cotizacion');

//Definir del modelo Cliente
const Cliente = dbclient.define('Cliente',{
    nombre:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    direccion:{
        type: DataTypes.STRING,
    },
    correoElectronico:{
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
    },
    telefono:{
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// Relaciones: un cliente puede tener muchas cotizaciones
Cliente.hasMany(Cotizacion, { foreignKey: 'idCliente' }); // Define la relación con la tabla Cotizacion
Cotizacion.belongsTo(Cliente, { foreignKey: 'idCliente' }); // Define la relación inversa

module.exports = Cliente;