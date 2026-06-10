const express = require("express");
const fs = require("fs");
const path = require("path");

const routerAdmin = express.Router();

const { Producto } = require("../models");
const { listarProductosAdmin } = require("../controllers/adminController");
const { crearProductoAdmin } = require("../controllers/adminController");
const { verificarAdmin } = require("../controllers/adminController")
const { mostrarEditarProducto } = require("../controllers/adminController");
const { editarProducto } = require("../controllers/adminController");
const { eliminarProducto } = require("../controllers/adminController");

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

routerAdmin.post("/alta", crearProductoAdmin);

routerAdmin.get("/editar/:id", mostrarEditarProducto);

routerAdmin.post("/editar/:id", editarProducto);

routerAdmin.post("/eliminar/:id", eliminarProducto);

module.exports = routerAdmin;