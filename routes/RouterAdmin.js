const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const routerAdmin = express.Router();

const { Producto, Venta, VentaProducto} = require("../models");
const { listarProductosAdmin } = require("../controllers/adminController");
const { crearProducto, actualizarProducto, obtenerProductoPorId, eliminarProducto, activarProducto } = require("../controllers/productoController");
const { verificarAdmin } = require("../controllers/adminController");
const { verificarToken } = require("../middlewares/validarAutenticacion");
const { validarAltaProducto, validarEditarProducto } = require("../middlewares/validarProducto");
const { validarLogin } = require("../middlewares/validarLogin");
const { randomUUID } = require("crypto");

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

        cb(null, randomUUID().replace(/-/g, "").slice(0, 16) + extension);
    }
});

const upload = multer({ storage });

routerAdmin.get("/", (req, res) => {
    res.render("admin/login", {
        title: "Panel Administrador"
    });
});

routerAdmin.post("/login", validarLogin, verificarAdmin);

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

routerAdmin.get("/ventas", verificarToken, async (req, res) => {
    try {
        const ventas = await Venta.findAll({
            order: [["fecha", "DESC"]]
        });

        res.render("admin/ventas", {
            ventas
        });

    } catch (error) {
        console.error("Error al obtener ventas:", error);
        res.render("admin/ventas", {
            ventas: []
        });
    }
});

routerAdmin.get("/ventas/:id", verificarToken, async (req, res) => {
    try {
        const venta = await Venta.findByPk(req.params.id, {
            include: [
                {
                    model: Producto,
                    as: "productos",
                    through: { attributes: ["cantidad"] }
                }
            ]
        });

        if (!venta) {
            return res.status(404).send("Venta no encontrada");
        }

        const registros = await VentaProducto.findAll();

        console.log("VENTA PRODUCTOS:");
        console.log(JSON.stringify(registros, null, 2));


        console.log("VENTA:");
        console.log(JSON.stringify(venta, null, 2));

        res.render("admin/detalleVenta", {
            venta
        });

    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});

routerAdmin.post("/alta", upload.single("img"), validarAltaProducto, crearProducto);

routerAdmin.get("/editar/:id", obtenerProductoPorId);

routerAdmin.post("/editar/:id", upload.single("img"), validarEditarProducto, actualizarProducto);

routerAdmin.post("/eliminar/:id", eliminarProducto);

routerAdmin.post("/activar/:id", activarProducto);

module.exports = routerAdmin;