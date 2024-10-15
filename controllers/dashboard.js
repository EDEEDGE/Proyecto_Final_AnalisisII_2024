//llamar al servicio de jwt
const jwt = require('jsonwebtoken');

//construir el controlador del dashboard
const dashboardHandler = (req, res) =>{
    const usuario = req.user;
    res.json({
        mensaje: 'Bienvenido al Dashboard',
        usuario:{
            id: usuario.id,
            nombre: usuario.nombre
        }
    });
};

module.exports = dashboardHandler;