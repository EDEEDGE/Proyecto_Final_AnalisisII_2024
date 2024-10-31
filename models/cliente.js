// archivo: models/cliente.js
const { DataTypes } = require('sequelize');
const dbclient = require('../config/db');

const Cliente = dbclient.define('Cliente', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    direccion: {
        type: DataTypes.STRING,
    },
    correoElectronico: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    DPI: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    fechaIngreso: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

module.exports = Cliente;
