//controlador principal de clientes
const { where } = require('sequelize');
const Cliente = require('../models/cliente');

//crear nuevo cliente
const crearCliente = async (req, res) => {
    const { nombre, direccion, correoElectronico, telefono, DPI, fechaIngreso } = req.body;

    try {
        //creamos un nuevo usuario en la base dedatos y la info la guardamos en una variable para mostrarla en el servidor como respuesta.
        const nuevo = await Cliente.create({ nombre, direccion, correoElectronico, telefono, DPI, fechaIngreso });
        res.status(201).json({ mensaje: 'Cliente creado con exito...', cliente: nuevo });

    } catch (error) {
        console.error('Error al crear nuevo Cliente...', error);
        res.status(500).json({ mensaje: 'Error en el servidor...' });
    }
};

//obtener todos los clientes
const obtenerClientes = async (req, res) => {
    try {
        const todos = await Cliente.findAll();//obtenemos todos en la abse de datos
        res.status(200).json(todos);//al obtener todos los clientes los guarda en un json para luego implementarlos en el frontend
    } catch (error) {
        console.error('Error al obtener a todos los clientes...', error);
        res.status(500).json({ mensaje: 'Error en el servidor...' });
    }
};

//obtener el cliente por id, mas adelatne se podran tambein agregar metodos para bsucar por nombre, correo etc
const obtenerClientesPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const obtener = await Cliente.findByPk(id);
        //comprobamos si se encontro o no al usaurio
        if (!obtener) {
            return res.status(404).json({ mensaje: 'No se encontro un cliente con ese ID' });
        }

        //mostramos al usaurio obtenido por el id
        res.status(200).json(obtener);

    } catch (error) {
        console.error('Error al obtener el usuario...', error);
        res.status(500).json({ mensaje: 'Error en el servidor...' });
    }

};

//actualizar cliente
const actualizarCliente = async (req, res) => {
    const { id } = req.params;
    const { nombre, direccion, correoElectronico, telefono, DPI, fechaIngreso } = req.body;

    try {
        const cliente = await Cliente.findByPk(id);
        if (!cliente) {
            return res.status(404).json({ mensaje: 'No se ha encontrado al usuario...' });
        }


        //obtenermos y actualizamos al cliente
        await Cliente.update(
            { nombre, direccion, correoElectronico, telefono, DPI, fechaIngreso },
            { where: { id }},
        );

        const clienteActualizado = await Cliente.findByPk(id);

        //respuesta del servidor
        res.status(200).json({ mensaje: 'Cliente actualizado correctamente...', clienteActualizado });
    } catch (error) {
        console.error('Error al actualizar cliente...', error);
        res.status(500).json({ mensaje: 'Error en el servidor...' });
    }

};

//eliminar cliente
const eliminarCliente = async (req, res) => {
    const { id } = req.params;

    try {
        const cliente = await Cliente.findByPk(id);
        if(!cliente) {
            return res.status(404).json({mensaje: 'No se encontro al Cliente...'});
        }

        await cliente.destroy();
        res.status(200).json({ mensaje: 'Se ha eliminado al Cliente...' });
    } catch (error) {
        console.error('Error al eliminar Cliente...', error);
        res.status(500).json({ mensaje: 'Error en el seridor...' });
    }
};


module.exports = {
    crearCliente, 
    obtenerClientes, 
    obtenerClientesPorId,
    actualizarCliente,
    eliminarCliente,
}