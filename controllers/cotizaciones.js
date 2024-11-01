//controlador principal para las cotizaciones y los detalles de la cotizacion
const { where } = require("sequelize");
const Cotizacion = require("../models/cotizacion"); // modelo cotización
const DetalleCotizacion = require("../models/detalleCotizacion"); // modelo detalle cotización
const Producto = require("../models/producto"); // modelo producto

// Método para crear una cotización
const crearCotizacion = async (req, res) => {
  const { idCliente, productos } = req.body;

  try {
    // Calcula el total de la cotización
    let total = 0;
    for (const item of productos) {
      const producto = await Producto.findByPk(item.idProducto);
      if (!producto)
        return res.status(404).json({ mensaje: "Producto no encontrado..." });
      total += producto.precio * item.cantidad;
    }

    // Crear la cotización principal
    const nuevaCotizacion = await Cotizacion.create({
      idCliente,
      fecha: new Date(),
      total,
    });

    // Crear detalles de la cotización
    for (const item of productos) {
      await DetalleCotizacion.create({
        idCotizacion: nuevaCotizacion.id,
        idProducto: item.idProducto,
        cantidad: item.cantidad,
        subtotal:
          item.cantidad * (await Producto.findByPk(item.idProducto)).precio,
        descripcion: item.descripcion || null,
      });
    }

    res.status(201).json({
      mensaje: "Cotización creada correctamente...",
      cotizacion: nuevaCotizacion,
    });
  } catch (error) {
    console.error("Error al crear la cotización y sus detalles...", error);
    res.status(500).json({ mensaje: "Error en el servidor..." });
  }
};

// Obtener todas las cotizaciones
const obtenerCotizacion = async (req, res) => {
  try {
    const cotizaciones = await Cotizacion.findAll({
      include: [{ model: DetalleCotizacion }],
    });
    res.status(200).json(cotizaciones);
  } catch (error) {
    console.error("Error al obtener las cotizaciones...", error);
    res.status(500).json({ mensaje: "Error en el servidor..." });
  }
};

// Actualizar cotización
const actualizarCotizacion = async (req, res) => {
  const { id } = req.params;
  const { productos } = req.body;

  try {
    const cotizacion = await Cotizacion.findByPk(id);
    if (!cotizacion) {
      return res.status(404).json({ mensaje: "Cotización no encontrada..." });
    }

    let nuevoTotal = 0;

    // Obtener los productos actuales en la base de datos
    const detallesExistentes = await DetalleCotizacion.findAll({
      where: { idCotizacion: id },
    });

    // Convertir productos en la solicitud a un mapa para fácil búsqueda
    const productosMap = new Map(
      productos.map((item) => [item.idProducto, item])
    );

    // Eliminar los detalles que ya no están en la solicitud
    for (const detalle of detallesExistentes) {
      if (!productosMap.has(detalle.idProducto)) {
        await detalle.destroy();
      }
    }

    // Crear o actualizar los detalles según la solicitud
    for (const item of productos) {
      const producto = await Producto.findByPk(item.idProducto);
      if (!producto) {
        return res.status(404).json({ mensaje: "Producto no encontrado..." });
      }

      const subtotal = producto.precio * item.cantidad;
      nuevoTotal += subtotal;

      // Buscar el detalle en la base de datos
      const detalleExistente = detallesExistentes.find(
        (d) => d.idProducto === item.idProducto
      );

      if (detalleExistente) {
        // Actualizar si ya existe
        await detalleExistente.update({
          cantidad: item.cantidad,
          subtotal,
          descripcion: item.descripcion || null,
        });
      } else {
        // Crear nuevo detalle si no existe
        await DetalleCotizacion.create({
          idCotizacion: id,
          idProducto: item.idProducto,
          cantidad: item.cantidad,
          subtotal,
          descripcion: item.descripcion || null,
        });
      }
    }

    // Actualizar el total de la cotización
    await cotizacion.update({ total: nuevoTotal });

    res.status(200).json({
      mensaje: "Cotización actualizada correctamente...",
      cotizacion,
    });
  } catch (error) {
    console.error("Error al actualizar la cotización...", error);
    res.status(500).json({ mensaje: "Error en el servidor..." });
  }
};

// Eliminar cotización
const eliminarCotizacion = async (req, res) => {
  const { id } = req.params;

  try {
    await DetalleCotizacion.destroy({ where: { idCotizacion: id } });
    await Cotizacion.destroy({ where: { id } });

    res.status(200).json({
      mensaje:
        "La cotización y sus detalles fueron eliminados correctamente...",
    });
  } catch (error) {
    console.error("Error al eliminar cotización...", error);
    res.status(500).json({ mensaje: "Error en el servidor..." });
  }
};

//obtener la cantidad total de cotizaciones
const obtenerCantidadCotizaciones = async (req, res) => {
  try {
    const cantidad = await Cotizacion.count();
    res.status(200).json(cantidad); //devolvemos la cantidad de registros que existen
  } catch (error) {
    console.error('Error al obtner la cantidad de las cotizaciones...', error);
    res.status(500).json({ mensaje: 'Error en el servidor...'});
  }
};

module.exports = {
  crearCotizacion,
  obtenerCotizacion,
  actualizarCotizacion,
  eliminarCotizacion,
  obtenerCantidadCotizaciones,
};
