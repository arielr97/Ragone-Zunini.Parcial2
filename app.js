const express = require("express");
const app = express();

const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");

const cargarProductos = require("./seedProductos");
const sequelize = require("./config/database");

const { Admin, Producto } = require("./models");

app.set("view engine", "ejs");

const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);
app.set("layout", "layout");

app.use((req, res, next) => {
    res.locals.title = "Mi Tienda";
    next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const routerProductos = require("./routes/RouterProductos");
const routerVentas = require("./routes/RouterVentas");
const routerAdmin = require("./routes/RouterAdmin");

app.use("/api/productos", routerProductos);
app.use("/api/ventas", routerVentas);
app.use("/admin", routerAdmin);
app.get("/", (req, res) => {
    res.render("index");
});

sequelize.sync().then(async () => {
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

    await Producto.destroy({ where: {}, truncate: true });

    await cargarProductos();

    app.listen(3000, () => {
        console.log("Servidor iniciado en puerto 3000");
    });
})
.catch((error) => {
    console.error("Error al conectar la BD:", error);
});