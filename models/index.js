const Producto = require("./Producto");
const Venta = require("./Venta");
const VentaProducto = require("./VentaProducto");
const Admin = require("./Admin");

Venta.belongsToMany(Producto, {
    through: VentaProducto,
    foreignKey: "VentaId"
});

Producto.belongsToMany(Venta, {
    through: VentaProducto,
    foreignKey: "ProductoId"
});

module.exports = {
    Producto,
    Venta,
    VentaProducto,
    Admin
};