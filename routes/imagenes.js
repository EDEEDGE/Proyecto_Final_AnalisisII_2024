const express = require('express');
const multer = require('multer');
const { registrarImagen, obtenerImagenes } = require('../controllers/imagenes');
const verificarToken = require('../middlewares/autenticacion');

const upload = multer();

const rutas = express.Router();

//ruta para registrar imagen y subirla a imgur
rutas.post('/subir', verificarToken, upload.single('imagen'), registrarImagen);

//obtener todas las imagenes guardadas en la base de datos
rutas.get('/obtener', verificarToken, obtenerImagenes);

module.exports = rutas;