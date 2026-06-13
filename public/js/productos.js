const contenedor = document.getElementById("contenedor-productos");
let paginaActual = 1;
const btnAnterior = document.getElementById("anterior");
const btnSiguiente = document.getElementById("siguiente");
let totalPaginas = 1;

function crearTarjetaProducto(producto){
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("producto");
    const titulo = document.createElement("h3");
    titulo.textContent = producto.nombre;
    const img = document.createElement("img");
    img.src = producto.img;
    img.alt = producto.nombre;
    const precio = document.createElement("p");
    precio.textContent = `Precio: $${producto.precio}`;
    const boton = document.createElement("button");
    boton.textContent = "Agregar al carrito";
    boton.addEventListener("click", () => {
        agregarAlCarrito(producto);
    });

    tarjeta.appendChild(titulo);
    tarjeta.appendChild(img);
    tarjeta.appendChild(precio);
    tarjeta.appendChild(boton);

    return tarjeta;
}

function agregarAlCarrito(producto){
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
}


async function traerProductos() {
    try{
        contenedor.innerHTML = "";
        const respuesta = await fetch(`/api/productos?page=${paginaActual}`);
        if(!respuesta.ok){
            throw new Error("Error al obtener productos");
        }else{
            const data = await respuesta.json();
            totalPaginas = Math.ceil(data.total / 6);
            data.productos.forEach(producto => {
                contenedor.appendChild(crearTarjetaProducto(producto));
            });
        }
    }catch(e){
        console.error(e);
        alert("Falló la conexión");
    }
}

traerProductos();

btnSiguiente.addEventListener("click", () => {

    if (paginaActual < totalPaginas) {
        paginaActual++;
        traerProductos();
    }
});

btnAnterior.addEventListener("click", () => {

    if (paginaActual > 1) {
        paginaActual--;
        traerProductos();
    }
});