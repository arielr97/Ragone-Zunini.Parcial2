//const { Venta, Producto } = require("../models");
const { Venta, Producto, VentaProducto } = require("../models");

const crearVenta = async (req, res) => {
    try {
        const { cliente, fecha, total, productos } = req.body;

        if (!productos || productos.length === 0) {
            return res.status(400).json({
                message: "La venta debe contener al menos un producto"
            });
        }

        for (const item of productos) {
            const producto = await Producto.findByPk(item.id);

            if (!producto) {
                return res.status(404).json({message: `Producto con ID ${item.id} no encontrado`});
            }
            if (producto.cantidadStock < item.cantidad) {
                return res.status(400).json({message: `No hay stock suficiente para ${producto.nombre}`});
            }
        }

        const nuevaVenta = await Venta.create({ cliente, fecha, total});

        for (const item of productos) {
            const producto = await Producto.findByPk(item.id);
            await nuevaVenta.addProducto(producto, { through: { cantidad: item.cantidad } });
            producto.cantidadStock -= item.cantidad;
            await producto.save();
        }

        res.status(201).json(nuevaVenta);

    } catch (error) {
        res.status(400).json({ message: "Error al crear la venta", error: error.message });
    }
};

const obtenerVentas = async (req, res) => {
    try {
        const registros = await VentaProducto.findAll();

        console.log("VENTAPRODUCTOS:");
        console.log(JSON.stringify(registros, null, 2));


        const resultado = await Venta.findAndCountAll({ include: [
                {
                    model: Producto,
                    through: {attributes: ["cantidad"]}
                }
            ]
        });
        res.status(200).json(resultado);

    } catch (error) {
        res.status(400).json({ message: "Error al obtener las ventas", error: error.message });
    }
};

const obtenerVentaPorId = async (req, res) => {
    try {
        const venta = await Venta.findByPk(req.params.id,{ include: [
                    {
                        model: Producto,
                        through: {
                            attributes: ["cantidad"]
                        }
                    }
                ]
            }
        );
        if (!venta) {
            return res.status(404).json({ message: "Venta no encontrada" });
        }
        res.status(200).json(venta);
    } catch (error) {
        res.status(400).json({ message: "Error al obtener la venta", error: error.message });
    }
};

module.exports = {
    crearVenta,
    obtenerVentas,
    obtenerVentaPorId
};