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
        const producto = await Producto.create(req.body);
        res.status(201).json(producto);
    } catch (error) {
        res.status(500).json({mensaje: "Error al crear producto"});
    }

};


module.exports = {
    listarProductos,
    crearProducto
};