const fs = require("fs");
const path = require("path");

const sequelize = require("./config/database");
const { Producto } = require("./models");

async function cargarProductos() {
    try {
        await sequelize.sync();

        const count = await Producto.count();
        if (count > 0) {
            console.log("Ya existen productos, seed cancelado");
            return;
        }

        const rutaArchivo = path.join(__dirname, "data", "productos.json");

        const productosJSON = JSON.parse(
            fs.readFileSync(rutaArchivo, "utf8")
        );

        const productosFormateados = productosJSON.map((p) => ({
            tipo: p.tipo,
            nombre: p.nombre,
            precio: p.precio,
            activo: p.activo ?? true,
            img: p.img,
            cantidadStock: p.cantidadStock ?? 0,

            // lógica CD / Libro
            artista: p.tipo === "CD" ? p.artista : null,
            autor: p.tipo === "Libro" ? p.autor : null
        }));

        await Producto.bulkCreate(productosFormateados);

        console.log("Productos cargados correctamente");

    } catch (error) {
        console.error("Error en seed:", error);
    }
}

cargarProductos();