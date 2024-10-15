const express = require('express');
const {registrar, ingresar, logout} = require('../controllers/usuarioController');//llamar al controlador
const verificarToken = require('../middlewares/autenticacion');
const rutas = express.Router();

//ruta para registrar nuevo usuario 
rutas.post('/registrar', registrar);

//ruta para inicar sesion
rutas.post('/login', ingresar);

//ruta para cerrar sesion
rutas.post('/logout', verificarToken, logout);

module.exports = rutas;