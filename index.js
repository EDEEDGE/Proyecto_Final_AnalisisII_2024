//apartado principal para unificar todo
const express = require('express');//llamamos a express para crear el servidor
const dbclient = require('./config/db');//llamamos al archivo db.js de la conexion de la base de datos
const cors = require('cors');//llamar cors para manejar peticiones dsede el frontend

const path = require('path');

//importar rutas
const test = require('./routes/test');
const usuarios = require('./routes/usuarios');
const clientes = require('./routes/clientes');
const productos = require('./routes/productos');
const cotizaciones = require('./routes/cotizaciones');

//configuraciones
const app = express();
const PORT = process.env.PORT || 3002;

//habilitar cors para permitir peticiones desde el frontend(localhost3005)
app.use(cors({
    origin: ['http://localhost:3001'] //direccion del otro frontend
}));


//Creamos un middleware para manejar el JSON
app.use(express.json());

// Servir archivos estaticos desde la carpeta build de React
app.use(express.static(path.join(__dirname, 'build')));


app.get('/', (req, res) => {
    res.send('¡Bienvenido!, la aplicación esta funcionando correctamente... ');
});


//ACCESO A LAS RUTAS
//ruta para testear base de datos
app.use('/api/test', test);
app.use('/api/usuarios', usuarios);
app.use('/api/clientes', clientes);
app.use('/api/productos', productos);
app.use('/api/cotizaciones', cotizaciones);


//ruta para manejar cualquier otra ruta que no sea parte de la API
app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


//sincronizar los modelos con la base de datos
dbclient.sync({ alter: true }).then(() => {
    console.log('Base de datos sincronizada con alteraciones...');
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
}).catch((err) => {
    console.log('Error al sincronizar la base de datos...', err);
});

