const { verificarToken } = require('../services/jwt');

const autenticarToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; //extrwaaaazzzaa  añaa
    if (!token) {
        return res.status(403).json({ mensaje: 'Token no proporcionado. Se requiere el Token para acceder.' });
    }

    try{
        //verificamos el token utilizando el servicio de jwt 
        //termina el proceso y saltamos al siguietne controlador o middleware
        const decode = verificarToken(token);
        req.user = decode;
        next();
    }
    catch (error) {
        return res.status(401).json({ mensaje: 'Token inválido o expirado.' });
    }
};

//exportamos la funcion 
module.exports = autenticarToken;