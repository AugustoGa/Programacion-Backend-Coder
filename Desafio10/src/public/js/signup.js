document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.querySelector('.formSignup');
    
    if (signupForm) {
        signupForm.addEventListener('submit', submitForm);
    }
});

function submitForm(event) {
    event.preventDefault();

    const formData = {
        first_name: document.getElementById('nombre').value,
        last_name: document.getElementById('apellido').value,
        age: document.getElementById('edad').value,
        email: document.getElementById('email').value.toUpperCase(),
        password: document.getElementById('password').value,
        role: document.getElementById('role').value
    };

    fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al registrar usuario');
        }
        return response.json();
    })
    .then(data => {
        console.log('Respuesta del servidor:', data);
        window.location.href = '/login';
    })
    .catch(error => {
        console.error('Error al registrar usuario:', error);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error, el correo ya se encuentra registrado",
        });
    });
}

