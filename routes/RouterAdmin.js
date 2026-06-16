const express = require("express");
const fs = require("fs");
const path = require("path");

const routerAdmin = express.Router();

const { Producto } = require("../models");
const { listarProductosAdmin } = require("../controllers/adminController");
const { crearProducto, actualizarProducto, obtenerProductoPorId, eliminarProducto, activarProducto } = require("../controllers/productoController");
const { verificarAdmin } = require("../controllers/adminController")

routerAdmin.get("/", (req, res) => {
    res.render("admin/login", {
        title: "Panel Administrador"
    });
});

routerAdmin.post("/login", verificarAdmin);

routerAdmin.get("/productos", listarProductosAdmin);

routerAdmin.get("/alta", (req, res) => {
    res.render("admin/altaProducto", {
        title: "Alta Producto"
    });
});

routerAdmin.post("/alta", crearProducto);

routerAdmin.get("/editar/:id", obtenerProductoPorId);

routerAdmin.post("/editar/:id", actualizarProducto);

routerAdmin.post("/eliminar/:id", eliminarProducto);

routerAdmin.post("/activar/:id", activarProducto);

module.exports = routerAdmin;