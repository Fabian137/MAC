// Ejemplo de validación básica con JavaScript
document.getElementById('signinForm').addEventListener('submit', function(e) {
    if (!this.elements.email.value.includes('@')) {
        e.preventDefault();
        alert('Correo electrónico inválido');
    }
    // Validar longitud de contraseña (>8 caracteres)
});