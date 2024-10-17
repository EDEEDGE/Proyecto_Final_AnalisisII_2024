const Usuario01 = require('../models/usuario');
const bcrypt = require('bcryptjs');
const jwt = require('../services/jwt');//llamamos al servicio del jwt

//registrar nuevo usuario
const registrar = async(req, res) =>{
    const {nombre, password}=req.body;

    try{
        //verificar si el usuario si existe
        let existe = await Usuario01.findOne({where:{nombre}});
        if(existe){
            return res.status(400).json({mensaje:'El usuario ya existe...'});
        }
        //encriptar las contraseñas 
        const encriptar = await bcrypt.hash(password,10);
        //crear un usuario en la base de datos
        const nuevo = await Usuario01.create({
            nombre,
            password:encriptar,
        });
        res.status(201).json(nuevo);
    }
    catch(error){
        console.error('Error al registrar usuario: ',error);
        res.status(500).json({mensaje:'Error en el servidor...'});
    }
};

//iniciar sesion
const ingresar = async(req, res)=>{
    const {nombre, password} = req.body;

    try{
        //buscar nombre
        const usuario = await Usuario01.findOne({where:{nombre}});
        if(!usuario){
            return res.status(400).json({mensaje:'Usuario encontrado'});
        }

        //verificar si la contraseña es correcta
        const valido = await bcrypt.compare(password, usuario.password);
        if(!valido){
            return res.status(400).json({mensaje:'Contraseña incorrecta...'});
        }
        
        //generar token jwt usando el servicio de JWT
        const token = jwt.generarToken({id: usuario.id, nombre: usuario.nombre});
        res.json({token});
    }
    catch(error){
        console.error('Error al iniciar sesion...');
        req.status(500).json({mensaje:'Error en el servidor...'});
    }
};

//cerrar sesion
const logout = (req, res) =>{
    res.json({mensaje:'Has cerrado sesion...'})
}

module.exports={
    registrar,
    ingresar,
    logout,
}