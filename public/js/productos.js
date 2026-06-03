function crearTarjetaProducto(producto) {
    return `
        <div class="producto">
            <h3>${producto.nombre}</h3>
            <p>Tipo: ${producto.tipo}</p>
            <img src="${producto.img}" alt="${producto.nombre}">
            <p>Precio: $${producto.precio}</p>
            <button type="button" class="btn-guardar">Agregar al carrito</button>
        </div>
    `;
}

async function traerProductos() {
    try{
        const respuesta = await fetch("/api/productos");

        if(!respuesta.ok){
            throw new Error("Error al obtener productos");
        }else{
            const productos = await respuesta.json();
            productos.forEach(producto => {
                const contenedor = document.getElementById("contenedor-productos");
                contenedor.innerHTML += crearTarjetaProducto(producto);
            });
        }
    }catch(e){
        console.error(e);
        alert("Falló la conexión");
    }
}

traerProductos();
console.log("estamos en productos.js")