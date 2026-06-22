const contenedor = document.getElementById("contenedor-productos");
let paginaActual = 1;
const btnAnterior = document.getElementById("anterior");
const btnSiguiente = document.getElementById("siguiente");
let totalPaginas = 1;
let tipoSeleccionado = "";
let textoBusqueda = "";
let ordenPrecio = "";
const filtroTipo = document.getElementById("filtro-tipo");
const inputBusqueda = document.getElementById("busqueda");
const btnBuscar = document.getElementById("btn-buscar");
const selectOrden = document.getElementById("orden-precio");
const btnLimpiarBusqueda = document.getElementById("limpiar-busqueda");

function crearTarjetaProducto(producto){
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("producto");
    const titulo = document.createElement("h3");
    titulo.textContent = producto.nombre
    const art = document.createElement("h5");
    producto.artista ? art.textContent = producto.artista : art.textContent = producto.autor;
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
    tarjeta.appendChild(art);
    tarjeta.appendChild(img);
    tarjeta.appendChild(precio);
    tarjeta.appendChild(boton);

    return tarjeta;
}

function agregarAlCarrito(producto){
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const cantidadEnCarrito = carrito.filter(p => p.id === producto.id).length;
    if (cantidadEnCarrito >= producto.cantidadStock) {
        alert(`Solo hay ${producto.cantidadStock} unidades disponibles`);
        return;
    }
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
}


async function traerProductos() {
    try{
        contenedor.innerHTML = "";
        const respuesta = await fetch(`/api/productos?page=${paginaActual}&tipo=${tipoSeleccionado}&busqueda=${textoBusqueda}&orden=${ordenPrecio}`);
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

filtroTipo.addEventListener("change", () => {

    tipoSeleccionado = filtroTipo.value;
    paginaActual = 1;
    traerProductos();
});

btnBuscar.addEventListener("click", () => {

    textoBusqueda = inputBusqueda.value.trim();
    paginaActual = 1;
    traerProductos();
});

selectOrden.addEventListener("change", () => {
    
    ordenPrecio = selectOrden.value;
    paginaActual = 1;
    traerProductos();
});

btnLimpiarBusqueda.addEventListener("click", () => {
    textoBusqueda = "";
    tipoSeleccionado = "";
    ordenPrecio = "";

    inputBusqueda.value = "";
    filtroTipo.value = "";
    selectOrden.value = "";

    paginaActual = 1;
    traerProductos();
});