const express = require("express");
const fs = require("fs");
const path = require("path");

const routerProductos = express.Router();

routerProductos.get("/", (req, res) => {

    const rutaArchivo = path.join(
        __dirname,"..","data","productos.json"
    );

    const productos = JSON.parse(fs.readFileSync(rutaArchivo, "utf8"));

    res.json(productos);
})

module.exports = routerProductos;