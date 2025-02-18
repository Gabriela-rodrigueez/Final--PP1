document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ fav.js se está ejecutando!"); 
    mostrarFavoritos();
});

function mostrarFavoritos() {
    let contenedor = document.querySelector(".container-favoritos");
    contenedor.innerHTML = ""; // Limpiar antes de agregar

    fetch("GET_favoritos.php")
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error en la respuesta del servidor: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("Datos recibidos:", data);  // Verifica los datos en la consola

        let contenedor = document.querySelector(".container-favoritos");
        contenedor.innerHTML = ""; 

        // Verificar si hay error de autenticación
        if (data.error) {
            contenedor.innerHTML = "<p>No estás autenticado.</p>";
            console.error("Error de autenticación:", data.error);  // Depuración
            return;
        }

        // Si no hay productos favoritos
        if (data.length === 0) {
            contenedor.innerHTML = "<p>No tienes productos favoritos.</p>";
            return;
        }

        // Mostrar productos favoritos
        data.forEach(producto => {
            console.log("Producto:", producto);  // Verifica cada producto recibido

            let div = document.createElement("div");
            div.classList.add("producto");
            div.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}" onerror="this.onerror=null; this.src='ruta/por/defecto.jpg'">
                <h3>${producto.nombre}</h3>
                <p>Precio: $${producto.precio}</p>
                <button class="btn-eliminar" onclick="eliminarFavorito(${producto.producto_id})">Eliminar</button>
            `;
            contenedor.appendChild(div);
        });
    })
    .catch(error => {
        console.error("Error cargando favoritos:", error);
        let contenedor = document.querySelector(".container-favoritos");
        contenedor.innerHTML = "<p>Hubo un problema al cargar los productos favoritos.</p>";
    });
}



function eliminarFavorito(producto_id) {
    fetch("Favoritos/Eliminar_fav.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `producto_id=${producto_id}`
    })
    .then(response => response.text())
    .then(data => {
        console.log("Eliminar respuesta:", data);  // Verifica la respuesta de eliminación
        mostrarFavoritos(); // Recargar la lista después de eliminar
    })
    .catch(error => console.error("Error al eliminar favorito:", error));
}

function agregarFavorito(producto_id) {
    fetch("Favoritos/Agregar_fav.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `producto_id=${producto_id}`
    })
    .then(response => response.text())
    .then(data => {
        console.log("Agregar respuesta:", data);  // Verifica la respuesta de agregar
        alert(data); // Muestra el mensaje de éxito o error
    })
    .catch(error => console.error("Error al agregar favorito:", error));
}


