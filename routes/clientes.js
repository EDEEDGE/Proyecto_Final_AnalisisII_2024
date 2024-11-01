const express = require('express');
const rutas = express.Router();

const {
    crearCliente, 
    obtenerClientes, 
    obtenerClientesPorId,
    actualizarCliente,
    eliminarCliente,
    contarClientes,
} = require ('../controllers/clientes');


const autenticarToken = require('../middlewares/autenticacion');

//rutas
rutas.post('/crear/nuevo', autenticarToken, crearCliente);
rutas.get('/obtener/todos', autenticarToken, obtenerClientes);
rutas.get('/obtener/:id', autenticarToken, obtenerClientesPorId);
rutas.put('/actualizar/:id', autenticarToken, actualizarCliente);
rutas.delete('/eliminar/:id', autenticarToken, eliminarCliente);
rutas.get('/obtener/cantidad/todos', autenticarToken, contarClientes);

module.exports = rutas;