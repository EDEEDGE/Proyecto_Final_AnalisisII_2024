// routes/contadores.js
const express = require('express');
const { obtenerContadores } = require('../controllers/contadores');
const autenticarToken = require('../middlewares/autenticacion');
const rutas = express.Router();

rutas.get('/contadores', autenticarToken, obtenerContadores);

module.exports = rutas;
