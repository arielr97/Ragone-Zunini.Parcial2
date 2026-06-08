const bcrypt = require("bcrypt");
const { Admin } = require("../models");

const crearAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existe = await Admin.findOne({ where: { email } });

        if (existe) {
            return res.status(400).json({ mensaje: "El admin ya existe" });
        }

        const hash = await bcrypt.hash(password, 10);

        const admin = await Admin.create({
            email,
            password: hash
        });

        res.status(201).json(admin);

    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear admin" });
    }
};

module.exports = { crearAdmin };