//apartado principal para unificar todo
const express = require('express');//llamamos a express para crear el servidor
const dbclient = require('./config/db');//llamamos al archivo db.js de la conexion de la base de datos

const usuarios = require('./routes/login')//llamar las rutas de login y registrar
const cors = require('cors');//llamar cors para manejar peticiones dsede el frontend
const dashboard = require('./routes/dashboard')//llamar a la ruta
const clientes = require('./routes/clientes');//ruta para los clientes

//llamar a las rutas de test, eliminar si es necesario
const test = require('./routes/test');
const models = require('./config/asociaciones');

const app = express();
const PORT = process.env.PORT || 3002;

//habilitar cors para permitir peticiones desde el frontend(localhost3005)
app.use(cors({
    origin: 'http://localhost:3005' //direccion del otro frontend
}));

//Creamos un middleware para manejar el JSON
app.use(express.json());

app.get('/', (req, res) => {
    res.send('¡Bienvenido!, la aplicación esta funcionando correctamente... ');
});

//agregamos las rutas
app.use('/api/usuarios', usuarios);
app.use('/api/dashboard', dashboard);
app.use('/api/clientes', clientes);

//ruta para testear base de datos
app.use('/api/test', test);

//sincronizar los modelos con la base de datos
dbclient.sync({ alter: true }).then(() => {
    console.log('Base de datos sincronizada con alteraciones...');
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
}).catch((err) => {
    console.log('Error al sincronizar la base de datos...', err);
});

