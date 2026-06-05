const formulario = document.getElementById("form-cliente");

formulario.addEventListener("submit", (e) =>{

    e.preventDefault();
    const nombre = document.getElementById("nombre-cliente").value;
    localStorage.setItem("cliente", nombre);

    window.location.href = "productos.html";
});
