const express = require("express");

const routerVentas = express.Router();

const {crearVenta, obtenerVentas, obtenerVentaPorId} = require("../controllers/ventaController");

routerVentas.use((req, res, next) => {
    console.log("🔥 Entró a RouterVentas:", req.method, req.url);
    next();
});

routerVentas.post("/", crearVenta);

routerVentas.get("/", obtenerVentas);

routerVentas.get("/:id", obtenerVentaPorId);

module.exports = routerVentas;

console.log("✅ RouterVentas cargado");