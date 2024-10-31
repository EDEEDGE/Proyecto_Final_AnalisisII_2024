const { Usuario, Cotizacion, Producto, Empleado, Cliente, DetalleCotizacion, detalleCotizacion } = require('../config/asociaciones');

//crear metodos para trabajar con los modelos de base de datos
const registrarUsuario = async (req, res) => {
    const { nombre, credenciales } = req.body;
    try{
        const nuevoUsuario = await Usuario.create({ nombre, credenciales });
        res.status(201).json({ mensaje: 'Usuario creado correctamente...', nuevoUsuario });
    }
    catch(error){
        console.error('Error al crear usuario...', error);
        res.status(500).json({ mensaje: 'Error en el servidor...'});
    }
};

// crear cotizacion
const crearCotizacion = async (req, res) => {
    const { fecha, total, idEmpleado, idCliente } = req.body;
    try{
        const nuevaCotizacion = await Cotizacion.create({ fecha, total, idEmpleado, idCliente });
        res.status(201).json({ mensaje: 'Cotizacion creada correctamente...', nuevaCotizacion });
    }
    catch(error){
        console.error('Error al crear cotizacion...', error);
        res.status(500).json({ mensaje: 'Error en el servidor...' });
    }
};

//crear nuevo producto 
const crearProducto = async (req, res) => {
    const { nombre, precio } = req.body;
    try{
        const nuevoProducto = await Producto.create({ nombre, precio });
        res.status(201).json({ mensaje: 'Producto creado correctamente...', nuevoProducto});
    }
    catch(error){
        console.error('Error al crear producto...', error);
        res.status(500).json({ mensaje: 'Error en el servido...' });
    }
}

//crear empleado
const crearEmpleado = async (req, res) => {
    const { nombre, idUsuario } = req.body;
    try{
        const nuevoEmpleado = await Empleado.create({ nombre, idUsuario });
        res.status(201).json({ mensaje: 'Empleado creado correctamente...', nuevoEmpleado});
    }
    catch(error){
        console.error('Error al crear empleado...', error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
};

//crear cliente
const crearCliente = async (req, res) => {
    const { nombre, direccion, correoElectronico, telefono } = req.body;
    try{
        const nuevoCliente = await Cliente.create({ nombre, direccion, correoElectronico, telefono });
        res.status(201).json({ mensaje: 'Cliente creado correctamente...', nuevoCliente });
    }
    catch(error){
        console.error('Error al crear cliente...', error);
        res.status(500).json({ mensaje: 'Error en el servidor...'});
    }
};

//crear nuevo detalle de cotizacion
const crearDetalleCotizacion = async (req, res) => {
    const { cantidad, subtotal, idCotizacion, idProducto } = req.body;
    try{
        const nuevoDetalle = await DetalleCotizacion.create({ nombre, credenciales });
        res.status(201).json({ mensaje: 'El detalle de la cotizacion creada correctamente...', nuevoDetalle});
    }
    catch(error){
        console.error('Error en crear el detalle de cotizacion...', error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
};

//exportar las funciones
module.exports = {
    registrarUsuario,
    crearCotizacion,
    crearProducto,
    crearEmpleado,
    crearCliente,
    crearDetalleCotizacion,
};