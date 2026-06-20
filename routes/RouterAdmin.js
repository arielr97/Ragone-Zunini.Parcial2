const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const routerAdmin = express.Router();

const { Producto } = require("../models");
const { listarProductosAdmin } = require("../controllers/adminController");
const { crearProducto, actualizarProducto, obtenerProductoPorId, eliminarProducto, activarProducto } = require("../controllers/productoController");
const { verificarAdmin } = require("../controllers/adminController");
const { verificarToken } = require("../middlewares/validarAutenticacion");

const uploadsPath = path.join(__dirname, "../public/uploads");
if (!fs.existsSync(uploadsPath)) {
    fs.mkdirSync(uploadsPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsPath);
    },
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname);

        cb(null, Date.now() + extension);
    }
});

const upload = multer({ storage });

routerAdmin.get("/", (req, res) => {
    res.render("admin/login", {
        title: "Panel Administrador"
    });
});

routerAdmin.post("/login", verificarAdmin);

routerAdmin.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/admin");
});

routerAdmin.get("/productos", verificarToken, listarProductosAdmin);

routerAdmin.get("/alta", (req, res) => {
    res.render("admin/altaProducto", {
        title: "Alta Producto"
    });
});

routerAdmin.post("/alta", upload.single("img"), crearProducto);

routerAdmin.get("/editar/:id", obtenerProductoPorId);

routerAdmin.post("/editar/:id", upload.single("img"), actualizarProducto);

routerAdmin.post("/eliminar/:id", eliminarProducto);

routerAdmin.post("/activar/:id", activarProducto);

module.exports = routerAdmin;