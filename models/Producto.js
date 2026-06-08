const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Producto = sequelize.define("Producto", {
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },

    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },

    artista: {
        type: DataTypes.STRING
    },

    precio: {
        type: DataTypes.FLOAT,
        allowNull: false
    },

    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    
    img: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Producto;