const { Venta, Producto, VentaProducto } = require("../models");

const crearVenta = async (req, res) => {
    try {
        const { cliente, total, productos } = req.body;

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

        const nuevaVenta = await Venta.create({ cliente, total});

        console.log("VENTA CREADA:", nuevaVenta.id);
        console.log("PRODUCTOS RECIBIDOS:", productos);

        for (const item of productos) {
            console.log("ITEM:", item);
            const producto = await Producto.findByPk(item.id);
            console.log("PRODUCTO ENCONTRADO:", producto?.id);
            await nuevaVenta.addProducto(producto, { through: { cantidad: item.cantidad } });
            console.log("RELACION CREADA");
            producto.cantidadStock -= item.cantidad;
            await producto.save();
        }

        res.status(201).json({
            id: nuevaVenta.id
        });

    } catch (error) {
        res.status(400).json({ message: "Error al crear la venta", error: error.message });
    }
};

const obtenerVentas = async (req, res) => {
    try {
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
                        as: "productos",
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