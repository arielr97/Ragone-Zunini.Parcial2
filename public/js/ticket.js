const pedido = document.getElementById("pedido");
const totalHTML = document.getElementById("total");
const btnDescargar = document.getElementById("btn-descargar");

const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const productosAgrupados = {};
let total = 0;


carrito.forEach(producto => {

    if (!productosAgrupados[producto.id]) {
        productosAgrupados[producto.id] = {
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 0
        };
    }

    productosAgrupados[producto.id].cantidad++;
});

Object.values(productosAgrupados).forEach(producto => {

    const subtotal = producto.precio * producto.cantidad;
    total += subtotal;

    const linea = document.createElement("div");
    linea.classList.add("item-ticket");

    linea.innerHTML = `
    <span class="nombre-producto">
        ${producto.nombre} x${producto.cantidad}
    </span>
    <span>
        $${subtotal.toLocaleString("es-AR")}
    </span>
`;

    pedido.appendChild(linea);
});

btnDescargar.addEventListener("click", () => {
    const ventaId = localStorage.getItem("ventaId");

    if (!ventaId) {
        alert("No hay venta para generar ticket");
        return;
    }
    window.open(`/ticket/${ventaId}/pdf`, "_blank");
    window.location.href = "index.html";
});

totalHTML.textContent = total.toLocaleString("es-AR");