const {DataTypes} = require('sequelize');
const dbclient = require('../config/db');
const Cliente = require('./cliente2');
const DetalleCotizacion = require('./detalleCotizacion');

//definir los campos de cotizacion
const Cotizacion = dbclient.define('Cotizacion',{
    fecha:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    total:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
    },
});

// Relaciones: una cotización pertenece a un cliente y puede tener muchos detalles
Cotizacion.belongsTo(Cliente, { foreignKey: 'idCliente' }); // Define la relación con la tabla Cliente
Cotizacion.hasMany(DetalleCotizacion, { foreignKey: 'idCotizacion' }); // Define la relación con DetalleCotizacion
DetalleCotizacion.belongsTo(Cotizacion, { foreignKey: 'idCotizacion' }); // Define la relación inversa

module.exports = Cotizacion;