// archivo: models/detalleCotizacion.js
const { DataTypes } = require('sequelize');
const dbclient = require('../config/db');

const DetalleCotizacion = dbclient.define('DetalleCotizacion', {
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
});

module.exports = DetalleCotizacion;
