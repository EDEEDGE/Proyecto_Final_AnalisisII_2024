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
});

module.exports = Producto;
