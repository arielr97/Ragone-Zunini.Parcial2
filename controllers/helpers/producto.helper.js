const construirProducto = (data, base = {}) => {
    console.log("DATA RECIBIDA:", data);
    const {
        tipo,
        nombre,
        artista,
        autor,
        precio,
        activo,
        img,
        cantidadStock
    } = data;

    if (tipo && tipo !== "CD" && tipo !== "Libro") {
        throw new Error("Tipo inválido (CD o Libro)");
    }

    let producto = {
        tipo: tipo ?? base.tipo,
        nombre: nombre ?? base.nombre,
        precio: precio ?? base.precio,
        activo: activo ?? base.activo ?? true,
        img: img ?? base.img,
        cantidadStock: cantidadStock ?? base.cantidadStock
    };

    const tipoFinal = tipo ?? base.tipo;

    if (tipoFinal === "CD") {
        if (artista !== undefined || base.artista) {
            producto.artista = artista ?? base.artista;
        }
        producto.autor = null;
    }

    if (tipoFinal === "Libro") {
        if (autor !== undefined || base.autor) {
            producto.autor = autor ?? base.autor;
        }
        producto.artista = null;
    }

    return producto;
};

module.exports = { construirProducto };