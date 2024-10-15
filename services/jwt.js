const jwt = require('jsonwebtoken');

const generarToken = (payload) =>{
    return jwt.sign(payload, 'clave_secreta_jwt',{expiresIn : '1h'});
};

const verificarToken = (token) =>{
    try{
        return jwt.verify(token, 'clave_secreta_jwt');
    }
    catch(error){
        throw new Error('Token invalido...');
    }
};

module.exports={
    generarToken,
    verificarToken,
};