const { Producto } = require("../models");
const { construirProducto } = require("../controllers/helpers/producto.helper");

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
        const nuevoProducto = construirProducto(req.body);

        const producto = await Producto.create(nuevoProducto);

        res.status(201).json(producto);

    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
};

const actualizarProducto = async (req, res) => {
    try {
        const { id } = req.params;

        const productoDB = await Producto.findByPk(id);

        if (!productoDB) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }

        const datosActualizados = construirProducto(req.body, productoDB);

        await productoDB.update(datosActualizados);

        res.json({
            mensaje: "Producto actualizado correctamente",
            producto: productoDB
        });

    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
};

const eliminarProducto = async (req, res) => {
    try {
        const { id } = req.params;

        const producto = await Producto.findByPk(id);

        if (!producto) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }

        await producto.destroy();

        res.json({ mensaje: "Producto eliminado correctamente" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: "Error al eliminar producto" });
    }
};

const obtenerProductoPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const producto = await Producto.findByPk(id);

        if (!producto) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }

        res.json(producto);

    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener producto" });
    }
};

module.exports = {
    listarProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
    obtenerProductoPorId
};