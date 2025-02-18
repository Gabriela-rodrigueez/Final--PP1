document.addEventListener('DOMContentLoaded', () => {
    // Cargar el carrito del almacenamiento local (localStorage)
    carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    mostrarCarrito();
});

function mostrarCarrito() {
    const carritoDiv = document.getElementById('carrito');
    carritoDiv.innerHTML = '';

    carrito.forEach((producto, index) => {
        carritoDiv.innerHTML += `
            <div class="producto">
                <div class="info-producto">
                    <h2>${producto.nombre}</h2>
                    <p>Cantidad: ${producto.cantidad}</p>
                    <p>Precio: $${producto.precio}</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon-close" onclick="eliminarProducto(${index})">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </div>
        `;
    });

    // Calcular el total
    const total = carrito.reduce((sum, producto) => sum + producto.precio * producto.cantidad, 0);

    // Mostrar el total
    carritoDiv.innerHTML += `<p>Total a pagar: $${total.toFixed(2)}</p>`;
}

function eliminarProducto(index) {
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
}

function confirmarCompra() {
    alert('Compra confirmada. Redirigiendo a la página de pago...');

}
// falta página de pagos
