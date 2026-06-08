const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const VentaProducto = sequelize.define("VentaProducto", {
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = VentaProducto;