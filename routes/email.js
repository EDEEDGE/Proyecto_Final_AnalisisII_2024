//rutas para probar el envio del correo...
const { sendMail } = require('../controllers/email');
const express = require('express');
const rutas = express.Router();

//ruta para la primera prueba del envio de correo
rutas.post('/pruebas/send', sendMail);

module.exports =  rutas;