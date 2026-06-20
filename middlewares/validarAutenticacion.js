const jwt = require("jsonwebtoken");

const verificarToken = (req, res, next) => {

    const token = req.cookies.token;

    if (!token) {
        return res.redirect("/admin");
    }

    try {
        jwt.verify(token, "clave_super_secreta");
        next();

    } catch {
        return res.redirect("/admin");
    };
};

module.exports = { verificarToken };