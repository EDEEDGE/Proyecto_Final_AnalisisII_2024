const express = require('express');
const rutas = express.Router();

const {
    crearCliente, 
    obtenerClientes, 
    obtenerClientesPorId,
    actualizarCliente,
    eliminarCliente,
} = require ('../controllers/clientes');


const autenticarToken = require('../middlewares/autenticacion');

//rutas
rutas.post('/crear/nuevo', autenticarToken, crearCliente);
rutas.get('/obtener/todos', autenticarToken, obtenerClientes);
rutas.get('/obtener/:id', autenticarToken, obtenerClientesPorId);
rutas.put('/actualizar/:id', autenticarToken, actualizarCliente);
rutas.delete('/eliminar/:id', autenticarToken, eliminarCliente);

module.exports = rutas;