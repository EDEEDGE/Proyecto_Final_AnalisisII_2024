const express = require('express'); // Llamamos a express para crear el servidor
const dbclient = require('./config/db'); // Llamamos al archivo db.js de la conexión de la base de datos

const usuarios = require('./routes/login'); // Llamar las rutas de login y registrar
const cors = require('cors'); // Llamar cors para manejar peticiones desde el frontend
const dashboard = require('./routes/dashboard'); // Llamar a la ruta

const test = require('./routes/test'); // Llamar a las rutas de test
const models = require('./config/asociaciones'); // Llamar asociaciones si aplica
const productos = require('./routes/productos'); // Importar las rutas de productos

const app = express();
const PORT = process.env.PORT || 3002;

// Habilitar cors para permitir peticiones desde el frontend (localhost:3005)
app.use(cors({
    origin: 'http://localhost:3005' // Dirección del frontend
}));

// Creamos un middleware para manejar el JSON
app.use(express.json());

app.get('/', (req, res) => {
    res.send('¡Bienvenido!, la aplicación está funcionando correctamente...');
});

// Agregamos las rutas
app.use('/api/usuarios', usuarios);
app.use('/api/dashboard', dashboard);
app.use('/api/productos', productos); // Usa las rutas de productos

// Ruta para testear base de datos
app.use('/api/test', test);

// Sincronizar los modelos con la base de datos
dbclient.sync({ alter: true }).then(() => {
    console.log('Base de datos sincronizada con alteraciones...');
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
}).catch((err) => {
    console.log('Error al sincronizar la base de datos...', err);
})
;
