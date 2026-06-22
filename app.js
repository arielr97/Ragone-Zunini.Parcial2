const express = require("express");
const app = express();

const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

const cargarProductos = require("./seedProductos");
const sequelize = require("./config/database");

const { Admin, Producto, Venta } = require("./models");

const cookieParser = require("cookie-parser");

app.set("view engine", "ejs");

const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);
app.set("layout", "layout");

app.use((req, res, next) => {
    res.locals.title = "Mi Tienda";
    next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());

const routerProductos = require("./routes/RouterProductos");
const routerVentas = require("./routes/RouterVentas");
const routerAdmin = require("./routes/RouterAdmin");

app.use("/api/productos", routerProductos);
app.use("/api/ventas", routerVentas);
app.use("/admin", routerAdmin);
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/ticket/:id/pdf", async (req, res) => {
    try {
        const venta = await Venta.findByPk(req.params.id, {
            include: [
                {
                    model: Producto,
                    as: "productos",
                    through: { attributes: ["cantidad"] }
                }
            ]
        });

        if (!venta) {
            return res.status(404).send("Venta no encontrada");
        }

        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        let itemsHTML = "";
        let total = 0;
        
        venta.productos.forEach(p => {
            const cantidad = p.VentaProducto.cantidad;
            const subtotal = p.precio * cantidad;
            total += subtotal;

            itemsHTML += `
                <div style="
                    display:flex;
                    width:320px;
                    margin:5px auto;
                    font-family: monospace;
                ">
                    <div style="flex:1; text-align:left;">
                        ${p.nombre} x${cantidad}
                    </div>

                    <div style="width:100px; text-align:right;">
                        $${subtotal}
                    </div>
                </div>
            `;
        });

        const html = `
        <html>
        <body style="font-family:Arial; text-align:center;">

            <h2>Ticket de Compra</h2>

            <p>Cliente: ${venta.cliente}</p>
            <p>Fecha: ${new Date(venta.fecha).toLocaleString()}</p>

            <hr style="width:300px;">

            ${itemsHTML}

            <hr style="width:300px;">

            <h3>Total: $${total}</h3>

        </body>
        </html>
        `;

        await page.setContent(html, { waitUntil: "networkidle0" });
        const pdf = await page.pdf({format: "A4", printBackground: true});
        await browser.close();

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", `attachment; filename=ticket-${venta.id}.pdf`);
        res.send(pdf);
    } catch (error) {
        console.error("ERROR PDF:", error);
        res.status(500).send(error.message);
    }
});

sequelize.sync().then(async () => {
    console.log("Base de datos sincronizada");

    const adminExistente = await Admin.findOne({
        where: { email: "ola@mail.asd" }
    });

    if (!adminExistente) {
        const hash = await bcrypt.hash("admin123", 10);

        await Admin.create({
            email: "ola@mail.asd",
            password: hash
        });

        console.log("Admin creado");
    }

    await Producto.destroy({ where: {}, truncate: true });

    await cargarProductos();

    app.listen(3000, () => {
        console.log("Servidor iniciado en puerto 3000");
    });
})
.catch((error) => {
    console.error("Error al conectar la BD:", error);
});