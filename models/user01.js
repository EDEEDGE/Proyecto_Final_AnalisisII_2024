const {DataTypes} = require('sequelize');
const dbclient = require('../config/db');

const Usuario01 = dbclient.define('User01',{
    nombre:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    password:{
        type: DataTypes.STRING,
        allowNull:false,
    },
},{
    timestamp: false
});

module.exports = Usuario01;