/*
// archivo: controllers/productosController.js
const Producto = require('../models/producto');

// Obtener todos los productos
exports.obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.status(200).json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el catálogo de productos' });
  }
};

// Obtener un producto por ID
exports.obtenerProductoPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const producto = await Producto.findByPk(id);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.status(200).json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
};

// Agregar un nuevo producto
exports.agregarProducto = async (req, res) => {
  const { nombre, precio } = req.body;

  try {
    const nuevoProducto = await Producto.create({ nombre, precio });
    res.status(201).json(nuevoProducto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al agregar el producto' });
  }
};

// Actualizar un producto por ID
exports.actualizarProducto = async (req, res) => {
  const { id } = req.params;
  const { nombre, precio } = req.body;

  try {
    const producto = await Producto.findByPk(id);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    producto.nombre = nombre || producto.nombre;
    producto.precio = precio || producto.precio;

    await producto.save();
    res.status(200).json(producto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
};

// Eliminar un producto por ID
exports.eliminarProducto = async (req, res) => {
  const { id } = req.params;

  try {
    const producto = await Producto.findByPk(id);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    await producto.destroy();
    res.status(204).send(); // Respuesta sin contenido
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};
*/
const Producto = require('../models/producto'); // Modelo de Producto

// Obtener todos los productos
exports.obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.findAll();
        res.status(200).json(productos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el catálogo de productos' });
    }
};

// Obtener un producto por ID
exports.obtenerProductoPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const producto = await Producto.findByPk(id);
        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.status(200).json(producto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
};

// Agregar un nuevo producto
exports.agregarProducto = async (req, res) => {
    const { nombre, precio } = req.body;

    try {
        const nuevoProducto = await Producto.create({ nombre, precio });
        res.status(201).json(nuevoProducto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al agregar el producto' });
    }
};

// Actualizar un producto por ID
exports.actualizarProducto = async (req, res) => {
    const { id } = req.params;
    const { nombre, precio } = req.body;

    try {
        const producto = await Producto.findByPk(id);
        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        producto.nombre = nombre || producto.nombre;
        producto.precio = precio || producto.precio;

        await producto.save();
        res.status(200).json(producto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
};

// Eliminar un producto por ID
exports.eliminarProducto = async (req, res) => {
    const { id } = req.params;

    try {
        const producto = await Producto.findByPk(id);
        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        await producto.destroy();
        res.status(204).send(); // Respuesta sin contenido
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
};
