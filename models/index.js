const Producto = require("./Producto");
const Venta = require("./Venta");
const VentaProducto = require("./VentaProducto");
const Admin = require("./Admin");

Venta.belongsToMany(Producto, {
    through: VentaProducto
});

Producto.belongsToMany(Venta, {
    through: VentaProducto
});

module.exports = {
    Producto,
    Venta,
    VentaProducto,
    Admin
};