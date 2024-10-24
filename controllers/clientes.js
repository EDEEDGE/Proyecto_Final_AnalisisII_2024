const Cliente = require('../models/cliente');

//crear nuevo cliente 
const registrarCliente = async (req, res) => {
    const { nombre, direccion, correoElectronico, telefono } = req.body;

    try {

        //verificar si el cliente existe o ya ha sido registrado el correo electronico
        const clienteExistente = await Cliente.findOne({ where: { correoElectronico } });
        if (clienteExistente) {
            return res.status(400).json({ mensaje: 'El correo electronico ya ha sido registrado...' });
        }


        const nuevoCliente = await Cliente.create({ nombre, direccion, correoElectronico, telefono });
        res.status(201).json({ mensaje: 'Cliente registrado correctamente...', nuevoCliente });
    }
    catch (error) {
        console.error('Error al registrar el cliente...', error);
        res.status(500).json({ mensaje: 'Error en el servidor...' });
    }
};

//obtener a los clientes para las listas 
const obtenerClientes = async (req, res) => {
    try {
        const clientes = await Cliente.findAll();
        res.status(200).json(clientes);
    }
    catch (error) {
        console.error('Error al obtener a los clientes...', error);
        res.status(500).json({ mensaje: 'Error en el servidor...' });
    }
};

//buscar cliente por ID
const buscarClientePorCorreo = async (req, res) => {
    const { correoElectronico } = req.params;

    try {
        const cliente = await Cliente.findOne({ where: { correoElectronico } });

        if(!cliente){
            return res.status(404).json({ mensaje: 'Cliente no encontrado...'})
        }
        res.status(200).json(cliente);
    }
    catch (error) {
        console.error('Error al obtener al cliente...', error);
        res.status(500).json({ mensaje: 'Error en el servidor...' });
    }
}

// obtener un cliente por ID, se puede buscar por otro parametro
const obtenerClientePorID = async (req, res) => {
    const { id } = req.params;

    try {
        const cliente = await Cliente.findByPk(id);
        if (!cliente) {
            return res.status(404).json({ mensaje: 'Cliente no encontrado...' });
        }
        res.status(200).json(cliente);
    }
    catch (error) {
        console.error('Error al obtener al cliente...', error);
        res.status(500).json({ mensaje: 'Error en el servidor...' });
    }
};

//actualizar el registro por id
const actualizarClientePorID = async (req, res) => {
    const { id } = req.params;
    const { nombre, direccion, correoElectronico, telefono } = req.body;

    try {
        const cliente = await Cliente.findByPk(id);
        if (!cliente) {
            return res.status(404).json({ mensaje: 'Cliente no encontrado...' });
        }

        //verificar si existe el correo
        const clienteConMismoCorreo = await Cliente.findOne({ where: { correoElectronico } });
        if (clienteConMismoCorreo && clienteConMismoCorreo.id !== parseInt(id)) {
            return res.status(400).json({ mensaje: 'El correo ya fue registrado...' });
        }


        //si existe el registro actualizar
        cliente.nombre = nombre;
        cliente.direccion = direccion;
        cliente.correoElectronico = correoElectronico;
        cliente.telefono = telefono;

        await cliente.save();
        res.status(200).json({ mensaje: 'Cliente actualizado correctamente', cliente });

    }
    catch (error) {
        console.error('Error al actualizar el cliente...', error);
        res.status(500).json({ mensaje: 'Error en el servidor...' });
    }
};

// eliminar cliente por ID
const eliminarClientePorID = async (req, res) => {
    const { id } = req.params;

    try {
        const cliente = await Cliente.findByPk(id);
        if (!cliente) {
            return res.status(404).json({ mensaje: 'No se encontro el cliente...' });
        }
        await cliente.destroy();
        res.status(200).json({ mensaje: 'Cliente eliminado correctamente...' });
    }
    catch (error) {
        console.error('Error al eliminar el cliente...', error);
        res.status(500).json({ mensaje: 'Error en el servidor...' });
    }
};



//exportar las funciones
module.exports = {
    registrarCliente,
    obtenerClientes,
    buscarClientePorCorreo,
    obtenerClientePorID,
    actualizarClientePorID,
    eliminarClientePorID,
};