const jwt = require('jsonwebtoken');// dependencia necesaria  para el JWT

//middleware para verificar el token JWT
const verificarToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Encabezado para la autenticación

    if (!token) {
        return res.status(403).json({ mensaje: 'Token no proporcionado. Se requiere el Token para acceder al Dashboard.' });
    }

    try {
        const decode = jwt.verify(token, 'clave_secreta_jwt'); // Verificamos el token
        req.user = decode; // Almacenamos la información del usuario en la solicitud
        next(); // Llamamos al siguiente middleware o controlador
    } catch (error) {
        return res.status(401).json({ mensaje: 'Token inválido o expirado.' }); // Respuesta si el token es inválido
    }
};

module.exports = verificarToken;