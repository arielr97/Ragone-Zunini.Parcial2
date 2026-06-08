const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

const sequelize = require("./config/database");

const { Admin, Producto, Venta } = require("./models");

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
        console.log("Base creada");

        const admin = await Admin.findOne({
            where: {
                email: "ola@mail.asd"
            }
        });

        if (!admin) {

            const hash = await bcrypt.hash("admin123", 10);

            await Admin.create({
                email: "ola@mail.asd",
                password: hash
            });

        }

        app.listen(3000, () => {
            console.log("Servidor iniciado");
        });

    })
    .catch((error) => {
        console.error("Error al conectar la BD:", error);
    });