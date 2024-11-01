const apikey = require("@sendgrid/mail"); // Importar SendGrid
apikey.setApiKey(process.env.SENDGRID_API_KEY); // Configurar la API Key
const Producto = require('../models/producto'); // Importar modelo de producto

// Función para enviar el correo con los detalles de la cotización en una tabla
const enviar = async (cotizacion, correoCliente) => {
  try {
    // Construir los detalles de la cotización en formato de tabla HTML
    let detallesHtml = `
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Producto ID</th>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Nombre</th>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Modelo</th>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Precio</th>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Cantidad</th>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Subtotal</th>
            <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Descripción</th>
          </tr>
        </thead>
        <tbody>
    `;

    // Iterar sobre cada detalle de cotización para obtener la información del producto
    for (const detalle of cotizacion.DetalleCotizacions) {
      const producto = await Producto.findByPk(detalle.idProducto); // Obtener producto por ID

      detallesHtml += `
        <tr>
          <td style="border: 1px solid #ddd; padding: 8px;">${producto.id}</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${producto.nombre}</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${producto.modelo}</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${producto.precio}</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${detalle.cantidad}</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${detalle.subtotal}</td>
          <td style="border: 1px solid #ddd; padding: 8px;">${detalle.descripcion || "N/A"}</td>
        </tr>
      `;
    }

    detallesHtml += `
        </tbody>
      </table>
    `;

    const mensaje = {
      to: correoCliente,
      from: "panqueto55@gmail.com", // Tu correo verificado en SendGrid
      subject: `Cotización No. #${cotizacion.id}`,
      text: `Adjuntamos la cotización #${cotizacion.id}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333;">
          <h2>Cotización No. #${cotizacion.id}</h2>
          <p><strong>Fecha:</strong> ${new Date(cotizacion.fecha).toLocaleDateString()}</p>
          <p><strong>Total:</strong> ${cotizacion.total}</p>
          <h3>Detalles:</h3>
          ${detallesHtml}
          <p>Gracias por su preferencia.</p>
        </div>
      `,
    };

    // Enviar el correo
    await apikey.send(mensaje);
    console.log("Correo de cotizaciones enviado correctamente...");
  } catch (error) {
    console.error("Error al enviar la cotización por correo...", error);
  }
};

module.exports = { enviar };
