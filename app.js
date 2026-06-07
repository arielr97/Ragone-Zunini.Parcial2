const express = require("express");
const app = express();

const sequelize = require("./config/database");

require("./models");

app.use(express.static("public"));

const routerProductos = require("./routes/RouterProductos");

app.use("/api/productos", routerProductos);

sequelize.sync()
    .then(() => {
        console.log("Base creada");

        app.listen(3000, () => {
            console.log("Servidor iniciado");
        });
    })
    .catch((error) => {
        console.error("Error al conectar la BD:", error);
    });