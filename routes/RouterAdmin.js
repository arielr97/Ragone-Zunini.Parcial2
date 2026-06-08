const express = require("express");
const fs = require("fs");
const path = require("path");

const routerAdmin = express.Router();

routerAdmin.get("/", (req, res) => {

    res.render("admin/login", {
        titulo: "Panel Administrador"
    });

});

routerAdmin.post("/login", (req, res) => {

    const { email, password } = req.body;
    const rutaArchivo = path.join(__dirname, "..", "data", "administradores.json");
    const administradores = JSON.parse(fs.readFileSync(rutaArchivo,"utf8"));
    const admin = administradores.find(a =>
        a.email === email &&
        a.password === password
    );
    if(admin){
        res.redirect("/admin/productos");
    }else{
        res.redirect("/admin");
    }
});

routerAdmin.get("/productos", (req, res) => {

    const rutaArchivo = path.join(
        __dirname,"..","data","productos.json"
    );

    const productos = JSON.parse(fs.readFileSync(rutaArchivo, "utf8"));
    res.render("admin/productos", {
        productos: productos
    });

});

routerAdmin.get("/alta", (req, res) => {

    res.render("admin/altaProducto", {
    });

});

routerAdmin.get("/editar/:id", (req, res) => {

    console.log(req.params.id);

    res.render("admin/editarProducto", {
    });

});

module.exports = routerAdmin;