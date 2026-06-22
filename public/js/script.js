document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
    } else {
        document.documentElement.removeAttribute("data-theme");
    }

    if (window.location.pathname.endsWith("index.html")) {
        localStorage.removeItem("carrito");
    }

    const btn = document.getElementById("toggle-theme");

    if (btn) {
        btn.addEventListener("click", () => {
            const root = document.documentElement;
            const current = root.getAttribute("data-theme");

            if (current === "dark") {
                root.removeAttribute("data-theme");
                localStorage.setItem("theme", "light");
            } else {
                root.setAttribute("data-theme", "dark");
                localStorage.setItem("theme", "dark");
            }
        });
    }

    const formulario = document.getElementById("form-cliente");

    if (formulario) {
        formulario.addEventListener("submit", (e) => {
            e.preventDefault();

            const nombre = document.getElementById("nombre-cliente")?.value;

            if (nombre) {
                localStorage.setItem("cliente", nombre);
                window.location.href = "productos.html";
            }
        });
    }
});