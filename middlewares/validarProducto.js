const validarAltaProducto = (req, res, next) => {

    const {
        tipo,
        nombre,
        artista,
        autor,
        precio,
        cantidadStock
    } = req.body;

    if (!nombre || nombre.trim() === "") {
        return res.status(400).render("admin/error", { mensaje: "Debe ingresar un nombre" });
    }

    if (!precio || precio <= 0) {
        return res.status(400).render("admin/error", { mensaje: "El precio debe ser mayor a 0" });
    }

    if (cantidadStock < 0) {
        return res.status(400).render("admin/error", { mensaje: "El stock no puede ser negativo" });
    }

    if (tipo !== "CD" && tipo !== "Libro") {
        return res.status(400).render("admin/error", { mensaje: "Tipo inválido" });
    }

    if (tipo === "CD" && !artista) {
        return res.status(400).render("admin/error", { mensaje: "Debe ingresar artista" });
    }

    if (tipo === "Libro" && !autor) {
        return res.status(400).render("admin/error", { mensaje: "Debe ingresar autor" });
    }

    if (!req.file) {
        return res.status(400).render("admin/error", { mensaje: "Debe seleccionar una imagen" });
    }

    next();
};

const validarEditarProducto = (req, res, next) => {

    const {
        tipo,
        nombre,
        artista,
        autor,
        precio,
        cantidadStock
    } = req.body;

    if (!nombre || nombre.trim() === "") {
        return res.status(400).render("admin/error", { mensaje: "Debe ingresar un nombre" });
    }

    if (!precio || precio <= 0) {
        return res.status(400).render("admin/error", { mensaje: "El precio debe ser mayor a 0" });
    }

    if (cantidadStock < 0) {
        return res.status(400).render("admin/error", { mensaje: "El stock no puede ser negativo" });
    }

    if (tipo !== "CD" && tipo !== "Libro") {
        return res.status(400).render("admin/error", { mensaje: "Tipo inválido" });
    }

    if (tipo === "CD" && !artista) {
        return res.status(400).render("admin/error", { mensaje: "Debe ingresar artista" });
    }

    if (tipo === "Libro" && !autor) {
        return res.status(400).render("admin/error", { mensaje: "Debe ingresar autor" });
    }

    next();
};

module.exports = { validarAltaProducto, validarEditarProducto };