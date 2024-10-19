const Cliente = require('./models/cliente');
const Cotizacion = require('./models/cotizacion');
const DetalleCotizacion = require('./models/detallecotizacion');
const Empleado = require('./models/empleado');
const Producto = require('./models/producto');
const Usuario = require('./models/usuario');

// Relación Cotizacion - Cliente
Cotizacion.belongsTo(Cliente, { foreignKey: 'idCliente' });
Cliente.hasMany(Cotizacion, { foreignKey: 'idCliente' });

// Relación Cotizacion - Empleado
Cotizacion.belongsTo(Empleado, { foreignKey: 'idEmpleado' });
Empleado.hasMany(Cotizacion, { foreignKey: 'idEmpleado' });

// Relación DetalleCotizacion - Cotizacion
DetalleCotizacion.belongsTo(Cotizacion, { foreignKey: 'idCotizacion' });
Cotizacion.hasMany(DetalleCotizacion, { foreignKey: 'idCotizacion' });

// Relación DetalleCotizacion - Producto
DetalleCotizacion.belongsTo(Producto, { foreignKey: 'idProducto' });
Producto.hasMany(DetalleCotizacion, { foreignKey: 'idProducto' });

// Relación Empleado - Usuario
Empleado.belongsTo(Usuario, { foreignKey: 'idUsuario' });
Usuario.hasMany(Empleado, { foreignKey: 'idUsuario' });