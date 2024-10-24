const express = require('express');
const {
    registrarCliente,
    obtenerClientes,
    obtenerClientePorID,
    actualizarClientePorID,
    eliminarClientePorID,
    buscarClientePorCorreo,
} = require('../controllers/clientes');

const verificarToken = require('../middlewares/autenticacion');

const rutas = express.Router();

//rutas para los metodos
rutas.post('/registrar', verificarToken, registrarCliente);
rutas.get('/obtener', verificarToken, obtenerClientes);
rutas.get('/obtener/:id', verificarToken, obtenerClientePorID);
rutas.put('/actualizar/:id', verificarToken, actualizarClientePorID);
rutas.delete('/eliminar/:id', verificarToken,eliminarClientePorID);
rutas.get('/obtener/correo/:correoElectronico', verificarToken, buscarClientePorCorreo);

module.exports = rutas;