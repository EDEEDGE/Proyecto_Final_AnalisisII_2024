const {DataTypes} = require('sequelize');
const dbclient = require('../config/db');

const Empleado = dbclient.define('Empleado', {
    nombre:{
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// Relación: Un empleado pertenece a un usuario
Empleado.belongsTo(Usuario, { foreignKey: 'idUsuario' }); // Un empleado pertenece a un usuario

module.exports = Empleado;