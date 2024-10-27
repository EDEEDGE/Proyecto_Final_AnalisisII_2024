const axios = require('axios');

const subirImagen = async (imagenBase64) => {
    try {
        const response = await axios.post('https://api.imgur.com/3/upload', {
            image: imagenBase64,
            type: 'base64',
        }, {
            headers: {
                Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
            },
        });

        //retorna el enlace directo a la imagen subida
        return response.data.data.link;
    }
    catch (error) {
        console.error('Error al subir la imagen a Imgur: ', error);
        throw new Error('Error en el flujo de la imagen...');
    }
};

module.exports = { subirImagen };