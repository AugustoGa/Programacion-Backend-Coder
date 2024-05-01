document.addEventListener('DOMContentLoaded', () => {
    const carritoContainer = document.getElementById('carrito-items');
    const totalSpan = document.getElementById('total');
    const vaciarBtn = document.getElementById('boton-vaciar');

    // Datos de ejemplo del carrito

    // Función para renderizar los elementos del carrito
    function renderCarrito() {
        carritoContainer.innerHTML = ''; // Limpiar el carrito antes de renderizar
        let total = 0;

        cartData.forEach(item => {
            const subtotal = item.product.price * item.quantity;
            total += subtotal;

            const itemDiv = document.createElement('div');
            itemDiv.classList.add('carritoFinal');
            itemDiv.innerHTML = `
                <picture>
                    <img src="/img/${item.product.thumbnail}" class="imgCarrito" alt="${item.product.title}" />
                </picture>
                <p class="parrafoCarrito">${item.product.title}</p>
                <p class="parrafoCarrito">$${item.product.price}</p>
                <p class="parrafoCarrito">${item.quantity}</p>
                <p class="parrafoCarrito">$${subtotal}</p>
            `;
            carritoContainer.appendChild(itemDiv);
        });

        totalSpan.textContent = total.toFixed(2); // Mostrar el total con dos decimales
    }

    // Llamar a la función para renderizar el carrito al cargar la página
    renderCarrito();

    // Evento para vaciar el carrito
    vaciarBtn.addEventListener('click', () => {
        cartData.length = 0; // Vaciar el array de datos del carrito
        renderCarrito(); // Volver a renderizar el carrito para actualizar la vista
    });
});
