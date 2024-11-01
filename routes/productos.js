//rutas principales para productos...
const {
    crearProducto,
    obtenerProductos,
    obtenerProductoPorId,
    actualizarProducto,
    eliminarProducto,
    contarProductos,
} = require('../controllers/productos'); //metodos del controlador productos
const express = require('express'); //dependencia para manejar las rutas
const autenticarToken = require('../middlewares/autenticacion'); //autenticar el token jwt

const rutas = express.Router();

//rutas
rutas.post('/crear/nuevo', autenticarToken, crearProducto);
rutas.get('/obtener/todos', autenticarToken, obtenerProductos);
rutas.get('/obtener/:id', autenticarToken, obtenerProductoPorId);
rutas.put('/actualizar/:id', autenticarToken, actualizarProducto);
rutas.delete('/eliminar/:id', autenticarToken, eliminarProducto); 
rutas.get('/obtener/cantidad/todos', autenticarToken, contarProductos);



module.exports = rutas;