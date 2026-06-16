const express = require("express");

const routerVentas = express.Router();

const {crearVenta, obtenerVentas, obtenerVentaPorId} = require("../controllers/ventaController");

routerVentas.post("/", crearVenta);

routerVentas.get("/", obtenerVentas);

routerVentas.get("/:id", obtenerVentaPorId);

module.exports = routerVentas;