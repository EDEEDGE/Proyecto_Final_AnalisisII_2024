//apartado principal para unificar todo
const express = require('express');//llamamos a express para crear el servidor
const dbclient = require('./config/db');//llamamos al archivo db.js de la conexion de la base de datos
const Cliente = require('./models/cliente')// llamamos a los modelos

const app = express();
const PORT = process.env.PORT || 3002;

//Creamos un middleware para manejar el JSON
app.use(express.json());

app.get('/', (req, res) =>{
    res.send('¡Bienvenido!, la aplicación esta funcionando correctamente... ');
});

//sincronizar los modelos con la base de datos
dbclient.sync().then(()=>{
    console.log('Base de datos sincronizada... ');
    app.listen(PORT, ()=>{
        console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
}).catch((err) =>{
    console.log('Error al sincronizar la base de datos... ', err);
});

