const Producto = require("./Producto");
const Venta = require("./Venta");
const VentaProducto = require("./VentaProducto");
const Admin = require("./Admin");

Venta.belongsToMany(Producto, {
    through: VentaProducto,
    foreignKey: "VentaId",
    as: "productos"
});

Producto.belongsToMany(Venta, {
    through: VentaProducto,
    foreignKey: "ProductoId",
    as: "ventas"
});

module.exports = {
    Producto,
    Venta,
    VentaProducto,
    Admin
};