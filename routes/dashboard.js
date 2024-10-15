const express = require('express');
const rutas =  express.Router();
const verificarToken = require('../middlewares/autenticacion')//llamamos a la autenticaion con el middleware
const dashboardHandler = require('../controllers/dashboard')//llamamos al controlador del dashboard

//nueva ruta de prueba
rutas.get('/', verificarToken, dashboardHandler);

/*rutas necesarias para el dashboard
rutas.get('/dashboard', verificarToken, (req, res) =>{
    res.json({mensaje:'Acceso concedido al Dashboard...'});
});
*/
module.exports = rutas;