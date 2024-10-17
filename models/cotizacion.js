// archivo: models/cotizacion.js
const { DataTypes } = require('sequelize');
const dbclient = require('../config/db');

const Cotizacion = dbclient.define('Cotizacion', {
    fecha: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
});

module.exports = Cotizacion;
