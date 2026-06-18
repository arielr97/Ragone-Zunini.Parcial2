const { Producto } = require("../models");
const { construirProducto } = require("../controllers/helpers/producto.helper");
const { Op } = require("sequelize");

const listarProductos = async (req, res) => {
    try {

        const pagina = parseInt(req.query.page) || 1;
        const productosPorPagina = 6;
        const offset = (pagina - 1) * productosPorPagina;
        const tipo = req.query.tipo;
        const busqueda = req.query.busqueda;
        const where = { activo: true };
        const orden = req.query.orden;

        if (tipo) {
            where.tipo = tipo
        };

        if (busqueda) {
            where[Op.or] = [
                { nombre: { [Op.like]: `%${busqueda}%` }},
                { autor: { [Op.like]: `%${busqueda}%` }},
                { artista: { [Op.like]: `%${busqueda}%` }}
            ];
        }

        let order = [];

        if (orden === "asc") {
            order.push(["precio", "ASC"]);
        }

        if (orden === "desc") {
            order.push(["precio", "DESC"]);
        }

        const resultado = await Producto.findAndCountAll({
            where,
            order,
            limit: productosPorPagina,
            offset: offset
        });

        res.json({ total: resultado.count, productos: resultado.rows });
    } catch (error) {
        res.status(500).json({mensaje: "Error al obtener productos"});
    }
};

const crearProducto = async (req, res) => {
    try {
        const imagen = req.file ? '/uploads/' + req.file.filename : null;
        const nuevoProducto = construirProducto({ ...req.body, img: imagen });

        const producto = await Producto.create(nuevoProducto);

        return res.redirect("/admin/productos");

    } catch (error) {
        console.error(error);
        return res.status(500).render("admin/error", { mensaje: "Error al crear el producto" });
    }
};

const actualizarProducto = async (req, res) => {
    try {
        const { id } = req.params;

        const productoDB = await Producto.findByPk(id);
        
        if (!productoDB) {
            return res.status(404).render("admin/error", { mensaje: "Producto no encontrado" });
        }

        const imagen = req.file ? '/uploads/' + req.file.filename : productoDB.img;
        const datosActualizados = construirProducto({ ...req.body, img: imagen }, productoDB);

        await productoDB.update(datosActualizados);

        return res.redirect("/admin/productos");

    } catch (error) {
        return res.status(500).render("admin/error", { mensaje: "Hubo un error al modificar el producto" });
    }
};

const eliminarProducto = async (req, res) => {
    try {
        const { id } = req.params;

        const producto = await Producto.findByPk(id);
        if (!producto) {
            return res.status(404).render("admin/error", { mensaje: "Producto no encontrado" });
        }

        await producto.update({ activo: false });

        return res.redirect("/admin/productos");

    } catch (error) {
        console.error(error);
        return res.status(500).render("admin/error", { mensaje: "Error al eliminar el producto" });
    }
};

const activarProducto = async (req, res) => {
    try {
        const { id } = req.params;

        const producto = await Producto.findByPk(id);
        if (!producto) {
            return res.status(404).render("admin/error", { mensaje: "Producto no encontrado" });
        }

        await producto.update({ activo: true });

        return res.redirect("/admin/productos");

    } catch (error) {
        console.error(error);
        return res.status(500).render("admin/error", { mensaje: "Error al activar el producto" });
    }
};

const obtenerProductoPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const producto = await Producto.findByPk(id);

        if (!producto) {
            return res.status(404).render("admin/error", { mensaje: "Producto no encontrado" });
        }

        res.render("admin/editarProducto",{ producto });

    } catch (error) {
        return res.status(500).render("admin/error", { mensaje: "Error al obtener producto" });
    }
};

module.exports = {
    listarProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
    activarProducto,
    obtenerProductoPorId
};