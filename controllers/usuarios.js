//controlador principal para los usuarios 
const { where } = require('sequelize');
const Usuario = require('../models/usuario');
const { generarToken } = require('../services/jwt');
const bcrypt = require('bcryptjs');

//registrar el usuario
const registrarUsuario = async (req, res) => {
    const { nombre, credenciales } = req.body;

    try {
        //verificamos si el usuario ya existe
        const existe = await Usuario.findOne({ where: { nombre } });
        if (existe) {
            return res.status(400).json({ mensaje: 'El usuario ya existe...' });
        }

        //si el usuario no existe entonces continua con el proceso
        //ahora encripta la contraseañ para luego guardarla en la abse de datos

        const encriptar = await bcrypt.hash(credenciales, 10);

        //ya que tenemos la contraseña encriptada procedemos a crear el usaurio en la base de datos
        const nuevo = await Usuario.create({ nombre, credenciales: encriptar });
        //respuesta del servidor
        res.status(201).json({ mensaje: 'Usuario creado correctamente...', usuario: nuevo });
    } catch (error){
        console.error('Error al crear usuario...', error);
        res.status(500).json({ mensaje: 'Error en el servidor...' });
    }
};

//login del usuario
const login = async (req, res) => {
    const { nombre, credenciales } = req.body;

    try{
        //comprobamos si el usuario existe
        const usuario = await Usuario.findOne({ where: {nombre} });
        if(!usuario){
            return res.status(404).json({ mensaje:'El usuario no fue encontrado...' });
        }

        //verificamos la contraseña
        const validarContraseña = await bcrypt.compare(credenciales, usuario.credenciales); // obtenemos la contraseña encriptad y la comparamos con la que se ingreso 
        if(!validarContraseña){
            return res.status(401).json({ mensaje: 'Credenciales incorrectas...' });
        }

        //al verificar la contraseña creamos un jwt para acceder a las rutas protegidas
        const nuevoToken = generarToken ({ id: usuario.id, nombre: usuario.nombre });

        //respuesta del servidor
        res.status(200).json({ mensaje: 'Se ha iniciado sesion...', nuevoToken });
    } catch (error) {
        console.error('Error al iniciar sesion...', error);
        res.status(500).json({ mensaje: 'Error en el servidor...' });
    }
};

//verificar el perfil del usaurio
const obtenerPerfil = async (req, res) => {
    try{
        const usuario = await Usuario.findByPk(req.user.id, { attributes: ['id', 'nombre'] });
        if(!usuario) {
            return res.status(404).json({ mensaje: 'No se encontro al usuario...' });
        }

        //al obtener todos los datos del perfil mostramos la respuesta del servidor
        res.status(200).json(usuario);


    } catch (error) {
        console.error('Error al obtener el perfil...', error);
        res.status(500).json({ mensaje: 'Error en el servidor...' });
    }
};

const obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({ attributes: ['id', 'nombre'] });
        res.status(200).json(usuarios);
    } catch (error) {
        console.error('Error al obtener usuarios...', error);
        res.status(500).json({ mensaje: 'Error en el servidor...' });
    }
};

//exportamos los metodos 
module.exports = {
    registrarUsuario, 
    login,
    obtenerPerfil,
    obtenerUsuarios,
};