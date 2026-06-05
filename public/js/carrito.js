let contenedorCarrito = document.getElementById("contenedor-carrito");

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
    const boton = document.createElement("button");
    boton.textContent = "Quitar del carrito";
    boton.addEventListener("click", () => {
        quitarDelCarrito(producto);
    });

    tarjeta.appendChild(titulo);
    tarjeta.appendChild(img);
    tarjeta.appendChild(precio);
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

    let listaCarrito = JSON.parse(localStorage.getItem("carrito"));

    listaCarrito.forEach(producto => {
    contenedorCarrito.appendChild(crearTarjetaCarrito(producto));
    });
}

dibujarCarrito();
