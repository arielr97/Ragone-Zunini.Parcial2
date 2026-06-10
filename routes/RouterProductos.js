const express = require("express");

const routerProductos = express.Router();

const { listarProductos } = require("../controllers/productoController");

routerProductos.get("/", listarProductos);

module.exports = routerProductos;