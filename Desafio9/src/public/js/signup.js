function handleSignupForm(event) {
    event.preventDefault();

    const formData = {
        first_name: document.getElementById('first_name').value,
        last_name: document.getElementById('last_name').value,
        age: document.getElementById('age').value,
        email: document.getElementById('email').value.toUpperCase(),
        password: document.getElementById('password').value,
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

document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');

    if (signupForm) {
        signupForm.addEventListener('submit', handleSignupForm);
    }
});
