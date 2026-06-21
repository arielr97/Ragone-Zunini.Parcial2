const validarLogin = (req, res, next) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.redirect("/admin");
    }
    next();
};

module.exports = { validarLogin };