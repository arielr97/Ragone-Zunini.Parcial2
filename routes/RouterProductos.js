const express = require("express");
const routerProductos = express.Router();

const { listarProductos } = require("../controllers/productoController");

routerProductos.get("/", listarProductos);
routerProductos.post("/", crearProducto);
routerProductos.put("/:id", actualizarProducto);
routerProductos.delete("/:id", eliminarProducto);
routerProductos.get("/:id", obtenerProductoPorId);

module.exports = routerProductos;