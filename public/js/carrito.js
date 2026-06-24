let contenedorCarrito = document.getElementById("contenedor-carrito");
let botonFinalizarCompra = document.getElementById("finalizar-compra");
let botonVaciarCarrito = document.getElementById("vaciar-carrito");
let contenedorTotal = document.getElementById("contenedor-total");

function contarElementoReduce(array, elementoBuscado) {
    return array.reduce((contador, elemento) => {
        return elemento.id === elementoBuscado.id ? contador + 1 : contador;
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
    const contBotones = document.createElement("div");
    contBotones.classList.add("cont-botones-carrito");
    const botonQuitar = document.createElement("button");
    botonQuitar.textContent = "-";
    botonQuitar.addEventListener("click", () => {
        quitarDelCarrito(producto);
    });
    const botonAgregar = document.createElement("button");
    botonAgregar.textContent = "+";
    botonAgregar.addEventListener("click", () => {
        agregarAlCarrito(producto);
    });
    contBotones.appendChild(botonQuitar);
    contBotones.appendChild(botonAgregar);
    tarjeta.appendChild(titulo);
    tarjeta.appendChild(img);
    tarjeta.appendChild(precio);
    tarjeta.appendChild(cantidad);
    tarjeta.appendChild(contBotones);

    return tarjeta;
}

function quitarDelCarrito(producto){
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const indice = carrito.findIndex(elem => elem.id === producto.id);

    if (indice !== -1) {
        carrito.splice(indice, 1);
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    dibujarCarrito();
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
    dibujarCarrito()
}

function dibujarCarrito(){
    contenedorCarrito.innerHTML = "";
    contenedorTotal.innerHTML = "";
    let listaCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let listaSinDuplicados = listaCarrito.filter((objeto, indice, array) => {
        return array.findIndex(item => item.id === objeto.id) === indice;
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

botonFinalizarCompra.addEventListener("click", async () => {
    const confirmar = confirm("¿Desea confirmar la compra?");
    if (!confirmar) {
        return;
    }
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    if (carrito.length === 0) {
        alert("El carrito está vacío");
        return;
    }
    const productosAgrupados = Object.values(carrito.reduce((acc, producto) => {
        if (!acc[producto.id]) {
            acc[producto.id] = {
                id: producto.id,
                cantidad: 0
            };
        }
        acc[producto.id].cantidad++;
        return acc;
        }, {}));
    const totalCarrito = carrito.reduce(
        (acum, producto) => acum + producto.precio,
        0
    );
    const cliente = localStorage.getItem("cliente");
    if (!cliente) {
        alert("No hay cliente, vuelva al inicio e ingrese un nombre")
        return;
    }
    try {const response = await fetch("/api/ventas", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                cliente: cliente,
                fecha: new Date(),
                total: totalCarrito,
                productos: productosAgrupados
            })
        });
        if (!response.ok) {
            const error = await response.json();
            alert(error.message);
            return;
        }

        const nuevaVenta = await response.json();
        localStorage.setItem("ventaId", nuevaVenta.id);

        localStorage.removeItem("cliente");
        alert("¡Ha finalizado su compra! Yendo al ticket...");
        window.location.href = "ticket.html";
    } catch (error) {
        console.error("Error al finalizar la compra:", error);
        alert("Error al finalizar la compra");
    }
});

dibujarCarrito();
