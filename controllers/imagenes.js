const { subirImagen } = require('../services/imgurService');
const Imagen = require('../models/pruebaImagen');

//registrar la imagen subida a Imgur y guarda el link en la base de datos 
const registrarImagen = async (req, res) => {
    try {
        const imagenBase64 = req.file.buffer.toString('base64');//convertir la imagen a base 64
        const linkImagen = await subirImagen(imagenBase64); //  subir a imgur

        //guardar el enlace en la base de datos
        const nuevaImagen = await Imagen.create({
            url: linkImagen,
            descripcion: req.body.descripcion || null, //agregar o no una descripcion
        });

        res.status(201).json({ mensaje: 'Imagen subida correctamente...', imagen: nuevaImagen });
    }
    catch (error) {
        console.error('Error al subir imagen...', error);
        res.status(500).json({ mensaje: 'Error al subir la imagen.' });
    }
};

//metodo para obtener las imagenes
const obtenerImagenes = async (req, res) => {
    try {
        const imagenes = await Imagen.findAll();
        res.status(200).json(imagenes);
    }
    catch (error) {
        console.error('Error al obtener las imagenes...', error);
        res.status(500).json({ mensaje: 'Error al obtener las imagenes...' });
    }
};

module.exports = {
    registrarImagen,
    obtenerImagenes,
};