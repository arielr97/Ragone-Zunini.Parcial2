const { Producto } = require("../models");

const listarProductos = async (req, res) => {
    try {
        const productos = await Producto.findAll({where: {activo: true}});
        res.json(productos);
    } catch (error) {
        res.status(500).json({mensaje: "Error al obtener productos"});
    }
};

const crearProducto = async (req, res) => {
    try {
        const {
            tipo,
            nombre,
            artista,
            autor,
            precio,
            activo,
            img,
            cantidadStock
        } = req.body;

        console.log("BODY COMPLETO:", req.body);
        console.log("TIPO:", tipo);

        if (tipo !== "CD" && tipo !== "Libro") {
            return res.status(400).json({ mensaje: "Tipo inválido (CD o Libro)" });
        }

        let nuevoProducto = {
            tipo,
            nombre,
            precio,
            activo: activo !== undefined ? activo : true,
            img,
            cantidadStock
        };

        if (tipo === "CD") {
            if (!artista) {
                return res.status(400).json({ mensaje: "El CD debe tener artista" });
            }

            nuevoProducto.artista = artista;
            nuevoProducto.autor = null;
        }

        if (tipo === "Libro") {
            if (!autor) {
                return res.status(400).json({ mensaje: "El libro debe tener autor" });
            }

            nuevoProducto.autor = autor;
            nuevoProducto.artista = null;
        }
        
        const producto = await Producto.create(nuevoProducto);
        res.status(201).json(producto);

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al crear producto" });
    }
};

module.exports = {
    listarProductos,
    crearProducto
};