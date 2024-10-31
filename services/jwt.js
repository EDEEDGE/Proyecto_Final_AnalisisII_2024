const jwt = require('jsonwebtoken');

const generarToken = (payload) =>{
    return jwt.sign(payload, 'clave_secreta_jwt',{expiresIn : '90m'}); //no olvidar cambiar la duracion del token
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