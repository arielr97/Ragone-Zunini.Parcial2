const { Producto } = require("../models");
const { Admin } = require("../models");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");

const listarProductosAdmin = async (req, res) => {
    try {

        const tipo = req.query.tipo;
        const busqueda = req.query.busqueda;
        const where = {};
        const activo = req.query.activo;

        if (tipo) {
            where.tipo = tipo
        };

        if (busqueda) {
            where[Op.or] = [
                { nombre: { [Op.like]: `%${busqueda}%` }},
                { autor: { [Op.like]: `%${busqueda}%` }},
                { artista: { [Op.like]: `%${busqueda}%` }},
                { id: { [Op.like]: `%${busqueda}%` }}
            ];
        }

        if (activo === "true") {
            where.activo = true;
        }

        if (activo === "false") {
            where.activo = false;
        }

        const productos = await Producto.findAll({ where });
        res.render("admin/productos", {
            productos: productos,
            tipoSeleccionado: tipo,
            busquedaActual: busqueda,
            activoSeleccionado: activo
        });

    } catch (error) {
        res.status(500).send("Error al obtener productos");
    }
};

const verificarAdmin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ where: { email } });
        if (!admin) {
            return res.redirect("/admin");
        }
        const coincide = await bcrypt.compare(password, admin.password);
        if (!coincide) {
            return res.redirect("/admin");
        }
        const payload = { id: admin.id, email: admin.email };
        const token = jwt.sign(payload, "clave_super_secreta", { expiresIn: "1h" });

        res.cookie("token", token, { httpOnly: true });
        return res.redirect("/admin/productos");

    } catch (error) {
        console.error(error);
        return res.redirect("/admin");
    }
}

module.exports = {
    listarProductosAdmin,
    verificarAdmin
};
