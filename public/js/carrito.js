let contenedorCarrito = document.getElementById("contenedor-carrito");
let botonFinalizarCompra = document.getElementById("finalizar-compra");
let botonVaciarCarrito = document.getElementById("vaciar-carrito");
let contenedorTotal = document.getElementById("contenedor-total");

function contarElementoReduce(array, elementoBuscado) {
    return array.reduce((contador, elemento) => {
        return elemento.nombre === elementoBuscado.nombre ? contador + 1 : contador;
    }, 0);
}

function crearTarjetaCarrito(producto){
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("producto");
    const titulo = document.createElement("h3");
    titulo.textContent = producto.nombre;
    const img = document.createElement("img");
    img.src = producto.img;
    img.alt = producto.nombre;
    const precio = document.createElement("p");
    precio.textContent = `Precio: $${producto.precio}`;
    const cantidad = document.createElement("p");
    let listaCarrito = JSON.parse(localStorage.getItem("carrito"));
    cantidad.textContent = `Cantidad: ${contarElementoReduce(listaCarrito, producto)}`
    const boton = document.createElement("button");
    boton.textContent = "Quitar del carrito";
    boton.addEventListener("click", () => {
        quitarDelCarrito(producto);
    });

    tarjeta.appendChild(titulo);
    tarjeta.appendChild(img);
    tarjeta.appendChild(precio);
    tarjeta.appendChild(cantidad);
    tarjeta.appendChild(boton);

    return tarjeta;
}

function quitarDelCarrito(producto){
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const indice = carrito.findIndex(elem => elem.id === producto.id);
    console.log("indice: " + indice);
    if (indice !== -1) {
        carrito.splice(indice, 1);
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    dibujarCarrito();
}

function dibujarCarrito(){
    contenedorCarrito.innerHTML = "";
    contenedorTotal.innerHTML = "";
    let listaCarrito = JSON.parse(localStorage.getItem("carrito"));
    let listaSinDuplicados = listaCarrito.filter((objeto, indice, array) => {
        return array.findIndex(item => item.nombre === objeto.nombre) === indice;
    });
    listaSinDuplicados.forEach(producto => {
    contenedorCarrito.appendChild(crearTarjetaCarrito(producto));
    });

    const totalCarrito = listaCarrito.reduce(
        (acum, producto) =>
        acum + producto.precio, 0
    );
    const total = document.createElement("p");
    total.textContent = `Total: $${totalCarrito}`;
    contenedorTotal.appendChild(total);
}

botonVaciarCarrito.addEventListener("click", () => {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    localStorage.setItem("carrito", JSON.stringify([]));
    dibujarCarrito();
})

dibujarCarrito();
