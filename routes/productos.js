/*
// archivo: routes/productos.js
const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

// Rutas para el catálogo de productos (sin "/productos", ya está en el index.js)
router.get('/', productosController.obtenerProductos);
router.get('/:id', productosController.obtenerProductoPorId);
router.post('/', productosController.agregarProducto);
router.put('/:id', productosController.actualizarProducto);
router.delete('/:id', productosController.eliminarProducto);

module.exports = router;
*/
const express = require('express');
const { 
    obtenerProductos, 
    obtenerProductoPorId, 
    agregarProducto, 
    actualizarProducto, 
    eliminarProducto 
} = require('../controllers/productosController'); // Llamar al controlador
const verificarToken = require('../middlewares/autenticacion'); // Importar middleware de autenticación
const rutas = express.Router();

// Rutas para el catálogo de productos
rutas.get('/', obtenerProductos); // Obtener todos los productos
rutas.get('/:id', obtenerProductoPorId); // Obtener un producto por ID

// Las siguientes rutas requieren autenticación
rutas.post('/', verificarToken, agregarProducto); // Agregar un nuevo producto
rutas.put('/:id', verificarToken, actualizarProducto); // Actualizar un producto por ID
rutas.delete('/:id', verificarToken, eliminarProducto); // Eliminar un producto por ID

module.exports = rutas;
