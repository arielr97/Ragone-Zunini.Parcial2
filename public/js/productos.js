const contenedor = document.getElementById("contenedor-productos");

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
        const respuesta = await fetch("/api/productos");

        if(!respuesta.ok){
            throw new Error("Error al obtener productos");
        }else{
            const productos = await respuesta.json();
            productos.forEach(producto => {
                contenedor.appendChild(crearTarjetaProducto(producto));
            });
        }
    }catch(e){
        console.error(e);
        alert("Falló la conexión");
    }
}

traerProductos();