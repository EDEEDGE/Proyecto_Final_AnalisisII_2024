//llamar al controlador de cotizaciones
const {
    crearCotizacion,
    obtenerCotizacion,
    actualizarCotizacion,
    eliminarCotizacion,
    obtenerCantidadCotizaciones,
} = require('../controllers/cotizaciones');
const express = require('express'); //llamamos a expres para crear los metodos y rutas
const autenticarToken = require('../middlewares/autenticacion');//llamamos a la autenticacion de jwt

const rutas = express.Router();

//TOTAS LAS RUTAS
rutas.post('/crear/nuevo', autenticarToken, crearCotizacion);
rutas.get('/obtener/todo', autenticarToken, obtenerCotizacion);
rutas.put('/actualizar/:id', autenticarToken, actualizarCotizacion); //buscamos la cotizacion y sus detalles por id
rutas.delete('/eliminar/:id', autenticarToken, eliminarCotizacion);
rutas.get('/obtener/cantidad/todos', autenticarToken, obtenerCantidadCotizaciones);

module.exports = rutas;

