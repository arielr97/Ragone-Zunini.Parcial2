const express = require("express");
const bcrypt = require("bcrypt");
const { Admin, Producto } = require("../models");

const routerAdmin = express.Router();

routerAdmin.get("/", (req, res) => {
    res.render("admin/login", {
        titulo: "Panel Administrador"
    });
});

routerAdmin.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ where: { email } });

        if (!admin) {
            return res.redirect("/admin");
        }

        const validPassword = await bcrypt.compare(password, admin.password);

        if (!validPassword) {
            return res.redirect("/admin");
        }

        // (simple TP version: sin session todavía)
        res.redirect("/admin/productos");

    } catch (error) {
        console.error(error);
        res.redirect("/admin");
    }
});

routerAdmin.get("/productos", async (req, res) => {
    try {
        const productos = await Producto.findAll();

        res.render("admin/productos", {
            productos
        });

    } catch (error) {
        console.error(error);
        res.send("Error cargando productos");
    }
});

routerAdmin.get("/alta", (req, res) => {
    res.render("admin/altaProducto");
});

routerAdmin.get("/editar/:id", async (req, res) => {
    try {
        const producto = await Producto.findByPk(req.params.id);

        res.render("admin/editarProducto", {
            producto
        });

    } catch (error) {
        console.error(error);
        res.redirect("/admin/productos");
    }
});

module.exports = routerAdmin;