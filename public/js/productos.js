async function traerProductos() {
    try{
        const respuesta = await fetch("/api/productos");

        if(!respuesta.ok){
            throw new Error("Error al obtener productos");
        }else{
            const data = await respuesta.json();
            console.log(data);
        }
    }catch(e){
        console.error(e);
        alert("Falló la conexión");
    }
}

traerProductos();
console.log("estamos en productos.js")