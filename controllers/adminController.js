const { Producto } = require("../models");
const { Admin } = require("../models");
const bcrypt = require("bcrypt");

const listarProductosAdmin = async (req, res) => {
    try {
        const productos = await Producto.findAll({where: {activo: true}});
        res.render("admin/productos", {
            productos: productos
        });

    } catch (error) {
        res.status(500).send("Error al obtener productos");
    }
};

const crearProductoAdmin = async (req, res) => {
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

        if (tipo !== "CD" && tipo !== "Libro") {
            return res.status(400).json({ mensaje: "Tipo inválido (CD o Libro)" });
        }

        let nuevoProducto = {
            tipo,
            nombre,
            precio,
            activo: activo ?? true,
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

        await Producto.create(nuevoProducto);
        res.redirect("/admin/productos");

    } catch (error) {
        console.error(error);
        res.send("Error al crear producto");
    }
};

const verificarAdmin = async (req, res) => {

    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({where: { email }});
        if (!admin) {
            return res.redirect("/admin");
        }
        const coincide = await bcrypt.compare(password, admin.password);
        if (!coincide) {
            return res.redirect("/admin");
        }
        return res.redirect("/admin/productos");
    } catch (error) {
        console.error(error);
        return res.redirect("/admin");
    }
}

const mostrarEditarProducto = async (req, res) => {

    try {
        const producto = await Producto.findByPk(req.params.id);
        if (!producto) {
            return res.redirect("/admin/productos");
        }
        res.render("admin/editarProducto",{ producto });
    } catch (error) {
        console.error(error);
        res.redirect("/admin/productos");
    }
};

const editarProducto = async (req, res) => {

    try {
        const producto = await Producto.findByPk(req.params.id);

        if (!producto) {
            return res.redirect("/admin/productos");
        }

        await producto.update({
            nombre: req.body.nombre,
            precio: req.body.precio,
            img: req.body.img,
            cantidadStock: req.body.cantidadStock
        });

        return res.redirect("/admin/productos");
    } catch (error) {
        console.error(error);
        return res.redirect("/admin/productos");
    }
};

const eliminarProducto = async (req, res) => {

    try {
        const producto = await Producto.findByPk(req.params.id);

        if (!producto) {
            return res.redirect("/admin/productos");
        }
        await producto.update({ activo: false });
        return res.redirect("/admin/productos");
        } catch (error) {
        console.error(error);
        return res.redirect("/admin/productos");
    }
}

module.exports = {
    listarProductosAdmin,
    crearProductoAdmin,
    verificarAdmin,
    mostrarEditarProducto,
    editarProducto,
    eliminarProducto
};
