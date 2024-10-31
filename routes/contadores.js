const express = require('express');
const rutas = express.Router();

const autenticarToken = require('../middlewares/autenticacion');

rutas.get('/api/contadores', autenticarToken, async (req, res) => {
    try {
        const cantidadClientes = await obtenerCantidadClientes(); // Reemplaza con tu lógica de conteo
        const cantidadCotizaciones = await obtenerCantidadCotizaciones(); // Lógica de conteo
        const cantidadProductos = await obtenerCantidadProductos(); // Lógica de conteo

        res.json({
            clientes: cantidadClientes,
            cotizaciones: cantidadCotizaciones,
            productos: cantidadProductos,
        });
    } catch (error) {
        console.error('Error al obtener los contadores:', error);
        res.status(500).json({ error: 'Error al obtener los contadores' });
    }
});

module.exports = rutas;
