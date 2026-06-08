const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

const routerProductos = require("./routes/RouterProductos");
app.use("/api/productos", routerProductos);

const routerAdmin = require("./routes/RouterAdmin");
app.use("/admin", routerAdmin);


app.listen(3000, () => {
    console.log("Servidor iniciado");
});