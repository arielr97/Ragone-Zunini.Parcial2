const express = require("express");

const routerProductos = express.Router();

const {
    listarProductos,
    crearProducto
} = require("../controllers/productoController");

routerProductos.get("/", listarProductos);

routerProductos.post("/", crearProducto);

routerProductos.use((req, res, next) => {
    console.log("ENTRÓ AL ROUTER:", req.method, req.url);
    next();
});

module.exports = routerProductos;