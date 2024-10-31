// controllers/contadores.js
const Cliente = require('../models/cliente');
const Cotizacion = require('../models/cotizacion');
const Producto = require('../models/producto');

const obtenerContadores = async (req, res) => {
    try {
        const clientes = await Cliente.count();
        const cotizaciones = await Cotizacion.count();
        const productos = await Producto.count();

        res.status(200).json({ clientes, cotizaciones, productos });
    } catch (error) {
        console.error('Error al obtener contadores...', error);
        res.status(500).json({ mensaje: 'Error en el servidor...' });
    }
};

module.exports = { obtenerContadores };
