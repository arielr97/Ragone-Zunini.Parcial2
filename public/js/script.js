document.addEventListener("DOMContentLoaded", () => {
    const root = document.documentElement;

    const savedTheme = localStorage.getItem("theme") || "light";

    applyTheme(savedTheme);

    if (window.location.pathname.endsWith("index.html")) {
        localStorage.removeItem("carrito");
    }

    const btn = document.getElementById("toggle-theme");

    function updateIcon() {
        if (!btn) return;

        const theme = root.getAttribute("data-theme");
        btn.textContent = theme === "dark" ? "Modo 🌙" : "Modo ☀️";
    }

    function applyTheme(theme) {
        root.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }

    if (btn) {
        updateIcon();

        btn.addEventListener("click", () => {
            const current = root.getAttribute("data-theme");

            applyTheme(current === "dark" ? "light" : "dark");
            updateIcon();
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