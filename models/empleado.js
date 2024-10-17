// archivo: models/empleado.js
const { DataTypes } = require('sequelize');
const dbclient = require('../config/db');

const Empleado = dbclient.define('Empleado', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Empleado;
