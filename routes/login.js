const express = require('express');
const {registrar, ingresar} = require('../controllers/usuarioController')//llamar al controlador
const rutas = express.Router();

//ruta para registrar nuevo usuario 
rutas.post('/registrar', registrar);

//ruta para inicar sesion
rutas.post('/login', ingresar);

module.exports = rutas;