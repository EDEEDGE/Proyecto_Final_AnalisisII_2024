const { DataTypes } = require('sequelize');
const dbclient = require('../config/db');
const Cotizacion = require('./cotizacion');
const Producto = require('./producto');

//definir el modelo del detallle cotizacion
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


// Relaciones: un detalle de cotización pertenece a una cotización y a un producto
DetalleCotizacion.belongsTo(Cotizacion, { foreignKey: 'idCotizacion' }); // Relación con Cotizacion
DetalleCotizacion.belongsTo(Producto, { foreignKey: 'idProducto' }); // Relación con Producto


module.exports = DetalleCotizacion;