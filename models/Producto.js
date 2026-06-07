const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Producto = sequelize.define("Producto", {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },

    descripcion: {
        type: DataTypes.STRING
    },

    precio: {
        type: DataTypes.FLOAT,
        allowNull: false
    },

    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },

    imagen: {
        type: DataTypes.STRING,
        allowNull: false
    },

    activo: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
});

module.exports = Producto;