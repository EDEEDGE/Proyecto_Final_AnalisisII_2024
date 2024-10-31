const express = require('express');
const{
    registrarUsuario,
    crearCotizacion,
    crearProducto,
    crearEmpleado,
    crearCliente,
    crearDetalleCotizacion,
} = require('../controllers/test');
const { Model } = require('sequelize');

const rutas = express.Router();

//definir las rutas
rutas.post('/usuarios', registrarUsuario);
rutas.post('/cotizacion', crearCotizacion);
rutas.post('/producto', crearProducto);
rutas.post('/empleado', crearEmpleado);
rutas.post('/cliente', crearCliente);
rutas.post('/detallecotizacion', crearDetalleCotizacion);

module.exports = rutas;