const jwt = require('jsonwebtoken');// dependencia necesaria  para el JWT

//middleware para verificar el token JWT
const verificarToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; //encabezado para la autenticacion

    //comprobamos si el token existe o si fue proporcionado
    //lo manda a un json para ser leido por el navegador...
    if (!token) {
        return res.status(403).send('Token no proporcionado. Se requiere el Token para acceder al Dashboard');
    }

    try {
        const decode = jwt.verify(token,'clave_secreta_jwt');
        req.user = decode;
        next();
    }
    catch (error) {
        return res.status(401).json({ mensaje: 'Token inválido o expirado' });
    }
};

module.exports = verificarToken;