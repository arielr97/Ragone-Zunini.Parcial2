const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const cargarProductos = require("./seedProductos");

const sequelize = require("./config/database");
const { Admin, Producto } = require("./models");

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const routerProductos = require("./routes/RouterProductos");
app.use("/api/productos", routerProductos);

const routerAdmin = require("./routes/RouterAdmin");
app.use("/admin", routerAdmin);

sequelize.sync()
.then(async () => {
    console.log("Base de datos sincronizada");

    const adminExistente = await Admin.findOne({
        where: { email: "ola@mail.asd" }
    });

    if (!adminExistente) {
        const hash = await bcrypt.hash("admin123", 10);

        await Admin.create({
            email: "ola@mail.asd",
            password: hash
        });

        console.log("Admin creado");
    }

    await cargarProductos();

    app.listen(3000, () => {
        console.log("Servidor iniciado en puerto 3000");
    });

})
.catch((error) => {
    console.error("Error al conectar la BD:", error);
});