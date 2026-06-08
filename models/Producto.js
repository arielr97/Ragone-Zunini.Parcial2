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
        type: DataTypes.STRING,
        allowNull: true
    },

    autor: {
        type: DataTypes.STRING,
        allowNull: true
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
    },

    cantidadStock: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Producto;