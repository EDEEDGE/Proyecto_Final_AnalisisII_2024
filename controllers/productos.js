//controlador para productos
const { where } = require('sequelize');
const Producto = require('../models/producto');

//crear producto
const crearProducto = async (req, res) => {
    const {
        nombre,
        descripcion,
        precio,
        codigo,
        modelo,
        fabricante,
        estado,
    } = req.body;

    try {
        const nuevo = await Producto.create({
            nombre,
            descripcion,
            precio,
            codigo,
            modelo,
            fabricante,
            estado
        });

        res.status(201).json({ mensaje: 'El producto se ha creado correctamente...', producto: nuevo });

    } catch (error) {
        console.error('Error al crear el producto...', error);
        res.status(500).json({ mensaje: 'Error en el servidor...' });
    }

};

//obtener todos los productos
const obtenerProductos = async (req, res) => {
    try {
        //creamos la variable productos y obtenemos todos los productos existentes...
        //luego el servidor nos devuelve el json con todos para usarlos en el frontend
        const productos = await Producto.findAll();
        res.status(200).json(productos);
    } catch (error) {
        console.error('Error al obtener todos los productos...', error);
        res.status(500).json({ mensaje: 'Error en el servidor...' });
    }
};

//obtener un producto por id
const obtenerProductoPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const producto = await Producto.findByPk(id);
        if (!producto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado...' });
        }

        res.status(200).json(producto);

    } catch (error) {
        console.error('Error al obtener el producto...', error);
        res.status(500).json({ mensaje: 'Error en el servidor...' });
    }

};

//actualizar producto
const actualizarProducto = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio, codigo, modelo, fabricante, estado } = req.body;

    try {
        const producto = await Producto.findByPk(id);
        if (!producto) {
            return res.status(404).json({ mensaje: 'No se encontro el producto...' });
        }

        //actaulizar y mostrar respuesta del servidor
        await Producto.update({ nombre, descripcion, precio, codigo, modelo, fabricante, estado }, { where: { id } });

        const productoActualizado = await Producto.findByPk(id);
        res.status(200).json({ mensaje: 'Producto actualizado correctamente...', producto: productoActualizado });
    } catch (error) {
        console.error('Error al actualizar el producto...', error);
        res.status(500).json({ mensaje: 'Error en el servidor...' });
    }
};

//eliminar producto
const eliminarProducto = async (req, res) => {
    const { id } = req.params;

    try {
        const producto = await Producto.findByPk(id);
        if (!producto) {
            return res.status(404).json({ mensaje: 'No se encontro un producto con este ID...' });
        }

        await producto.destroy();//eliminar de la base de datos
        res.status(200).json({ mensaje: 'El producto fue eliminado correctamente...' });
    } catch (error) {
        console.error('Error al eliminar el producto...', error);
        res.status(500).json({ mensaje: 'Error en el servidor...' });
    }
};

//contar cuantos registros hay
const contarProductos = async (req, res) => {
    try{    
        const cantidad = await Producto.count();
        res.status(200).json(cantidad); //retornamos la cantidad de productos que hay

    } catch (error) {
        console.error('Error al obtener todos los productos', error);
        res.status(500).json({ mensaje: 'Error en el servidor...' });
    }
};

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProductoPorId,
    actualizarProducto,
    eliminarProducto,
    contarProductos,
};
