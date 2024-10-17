const Cliente = require('../models/cliente');
const Cotizacion = require('../models/cotizacion');
const DetalleCotizacion = require('../models/detalleCotizacion');
const Empleado = require('../models/empleado');
const Producto = require('../models/producto');
const Usuario = require('../models/usuario');

//definir relaciones entre tablas de los modelos

// Cliente y Cotización
Cliente.hasMany(Cotizacion, { foreignKey: 'idCliente' });
Cotizacion.belongsTo(Cliente, { foreignKey: 'idCliente' });

// Cotización y DetalleCotización
Cotizacion.hasMany(DetalleCotizacion, { foreignKey: 'idCotizacion' });
DetalleCotizacion.belongsTo(Cotizacion, { foreignKey: 'idCotizacion' });

// DetalleCotización y Producto
DetalleCotizacion.belongsTo(Producto, { foreignKey: 'idProducto' });
Producto.hasMany(DetalleCotizacion, { foreignKey: 'idProducto' });

// Usuario y Empleado
Usuario.hasOne(Empleado, { foreignKey: 'idUsuario' });
Empleado.belongsTo(Usuario, { foreignKey: 'idUsuario' });

module.exports = {
    Cliente,
    Cotizacion,
    DetalleCotizacion,
    Empleado,
    Producto,
    Usuario,
};