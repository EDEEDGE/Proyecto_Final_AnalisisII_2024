//apartado principal para unificar todo
const express = require('express');//llamamos a express para crear el servidor
const dbclient = require('./config/db');//llamamos al archivo db.js de la conexion de la base de datos
const cors = require('cors');//llamar cors para manejar peticiones dsede el frontend



//importar rutas
const test = require('./routes/test');
const usuarios = require('./routes/usuarios');
const clientes = require('./routes/clientes');
const productos = require('./routes/productos');
const cotizaciones = require('./routes/cotizaciones');
const correos = require('./routes/email');

//configuraciones
const app = express();
const PORT = process.env.PORT || 3002;

//habilitar cors para permitir peticiones desde el frontend(localhost3005)
app.use(cors({
    origin: ['http://127.0.0.1:5500', 'http://localhost:3005'] //direccion del otro frontend
}));


//Creamos un middleware para manejar el JSON
app.use(express.json());

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
app.use('/api/correos', correos);



//sincronizar los modelos con la base de datos
dbclient.sync({ alter: true }).then(() => {
    console.log('Base de datos sincronizada con alteraciones...');
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
}).catch((err) => {
    console.log('Error al sincronizar la base de datos...', err);
});

