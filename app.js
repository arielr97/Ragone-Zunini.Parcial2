const express = require("express");
const app = express();
app.use(express.static("public"));

const routerProductos = require("./routes/RouterProductos");

app.use("/api/productos", routerProductos);


app.listen(3000, () => {
    console.log("Servidor iniciado");
});