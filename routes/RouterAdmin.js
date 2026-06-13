const express = require("express");
const fs = require("fs");
const path = require("path");

const routerAdmin = express.Router();

const { Producto } = require("../models");
const { listarProductosAdmin } = require("../controllers/adminController");
const { crearProducto, actualizarProducto, obtenerProductoPorId, eliminarProducto } = require("../controllers/productoController");
const { verificarAdmin } = require("../controllers/adminController")

routerAdmin.get("/", (req, res) => {

    res.render("admin/login", {
        titulo: "Panel Administrador"
    });
});

routerAdmin.post("/login", verificarAdmin);

routerAdmin.get("/productos", listarProductosAdmin);

routerAdmin.get("/alta", (req, res) => {

    res.render("admin/altaProducto");
});

routerAdmin.post("/alta", crearProducto);

routerAdmin.get("/editar/:id", obtenerProductoPorId);

routerAdmin.post("/editar/:id", actualizarProducto);

routerAdmin.post("/eliminar/:id", eliminarProducto);

module.exports = routerAdmin;