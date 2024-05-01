function handleLoginForm(event) {
    event.preventDefault();

    const formData = {
        email: document.getElementById('usuario').value.toUpperCase(),
        password: document.getElementById('password').value,
    };

    fetch('/api/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }
        return response.json();
    })
    .then(responseData => {
        if (responseData.status === 'success') {
            window.location.href = '/api/products';
        } else {
            console.log("Inicio de sesión fallido");
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Usuario o Contraseña incorrecta",
            });
        }
    })
    .catch(error => console.error('Error:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginForm);
    }
});