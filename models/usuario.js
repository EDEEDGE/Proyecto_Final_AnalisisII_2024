// archivo: models/usuario.js
const { DataTypes } = require('sequelize');
const dbclient = require('../config/db');

const Usuario = dbclient.define('Usuario', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    credenciales: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Usuario;
