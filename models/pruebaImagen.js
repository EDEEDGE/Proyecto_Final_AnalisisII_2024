const { DataTypes } = require('sequelize');
const dbclient = require('../config/db');

const Imagen = dbclient.define('Imagen', {
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

module.exports = Imagen;