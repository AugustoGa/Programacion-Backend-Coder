document.querySelectorAll('.AgregarCarrito').forEach(function(button) {
    button.addEventListener('click', function() {
        const pid = this.dataset.pid
        const cid = this.dataset.cid
        console.log('PID:',cid , pid)

        // Realizar una solicitud Fetch para agregar al carrito
        fetch(`/:cid${cid}/products/:pid${pid}`, {
            method: 'POST',
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error al cancelar la compra:', error);
        });
    });
});
