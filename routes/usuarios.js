//rutas para acceder a los metodos del controlador
const express = require('express');
const {
    registrarUsuario, 
    login,
    obtenerPerfil,
    obtenerUsuarios,
} = require('../controllers/usuarios');
const verificarToken = require('../middlewares/autenticacion');
const autenticarToken = require('../middlewares/autenticacion');

const rutas = express.Router();


rutas.post('/registrar', registrarUsuario);//ruta para registrar un nuevo usuario 
rutas.post('/login', login);//ruta para realizar el login y obtener el token 
rutas.get('/obtenerPerfil', autenticarToken, obtenerPerfil);
rutas.get('/obtenerUsuarios', autenticarToken, obtenerUsuarios)

//exportar las rutas 
module.exports = rutas;