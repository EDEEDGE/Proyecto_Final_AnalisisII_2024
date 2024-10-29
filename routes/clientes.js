const {
    crearCliente, 
    obtenerClientes, 
    obtenerClientesPorId,
    actualizarCliente,
    eliminarCliente,
} = require ('../controllers/clientes');
const express = require('express');
const rutas = express.Router();
const autenticarToken = require('../middlewares/autenticacion');

//rutas
rutas.post('/crear_nuevo', autenticarToken, crearCliente);
rutas.get('/obtener_todos', autenticarToken, obtenerClientes);
rutas.get('/obtener/:id', autenticarToken, obtenerClientesPorId);
rutas.put('/actualizar/:id', autenticarToken, actualizarCliente);
rutas.delete('/eliminar/:id', autenticarToken, eliminarCliente);

module.exports = rutas;