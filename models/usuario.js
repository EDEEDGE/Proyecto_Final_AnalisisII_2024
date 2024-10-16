const { DataTypes } = require('sequelize');
const dbclient = require('../config/db');

const Usuario = dbclient.define('Usuario',{
    nombre:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    credenciales:{
        type: DataTypes.STRING,
        allowNull: false,
    },
});

// Relación: Un usuario tiene un empleado asociado
Usuario.hasOne(Empleado, { foreignKey: 'idUsuario' }); // Un usuario tiene un empleado
Empleado.belongsTo(Usuario, { foreignKey: 'idUsuario' }); // Un empleado pertenece a un usuario

module.exports = Usuario;