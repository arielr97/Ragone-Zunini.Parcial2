const express = require("express");
const routerProductos = express.Router();

routerProductos.use((req, res, next) => {
    console.log("ENTRÓ AL ROUTER:", req.method, req.url);
    next();
});

const {
    listarProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
    obtenerProductoPorId
} = require("../controllers/productoController");

routerProductos.get("/", listarProductos);
routerProductos.post("/", crearProducto);
routerProductos.put("/:id", actualizarProducto);
routerProductos.delete("/:id", eliminarProducto);
routerProductos.get("/:id", obtenerProductoPorId);

module.exports = routerProductos;