const { Producto } = require("../models");
const { Admin } = require("../models");
const bcrypt = require("bcrypt");

const listarProductosAdmin = async (req, res) => {
    try {
        const productos = await Producto.findAll();
        res.render("admin/productos", {
            productos: productos
        });

    } catch (error) {
        res.status(500).send("Error al obtener productos");
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

module.exports = {
    listarProductosAdmin,
    verificarAdmin
};
