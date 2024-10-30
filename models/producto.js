// archivo: models/producto.js
const { DataTypes } = require('sequelize');
const dbclient = require('../config/db');

const Producto = dbclient.define('Producto', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    codigo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    modelo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    fabricante: {
        type:DataTypes.STRING,
        allowNull: true,
    },
    estado:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
});

module.exports = Producto;
