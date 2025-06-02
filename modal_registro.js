// Abrir modal de registro desde login
const abrirRegistro = document.getElementById('abrirRegistro');
const modalRegistro = document.getElementById('modalRegistro');
const cerrarRegistro = document.getElementById('cerrarRegistro');
const formRegistro = document.getElementById('formRegistro');
const registroMensaje = document.getElementById('registroMensaje');

abrirRegistro.addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('modalLogin').style.display = 'none';
    modalRegistro.style.display = 'flex';
    registroMensaje.textContent = '';
});

// Cerrar modal de registro
cerrarRegistro.addEventListener('click', function() {
    modalRegistro.style.display = 'none';
});

// Cerrar modal registro al hacer clic fuera
window.addEventListener('click', function(event) {
    if (event.target === modalRegistro) {
        modalRegistro.style.display = 'none';
    }
});

// Simulación de registro (solo muestra mensaje)
formRegistro.addEventListener('submit', function(e) {
    e.preventDefault();
    const usuario = document.getElementById('nuevoUsuario').value.trim();
    const correo = document.getElementById('nuevoCorreo').value.trim();
    const contrasena = document.getElementById('nuevaContrasena').value.trim();

    if (!usuario || !correo || !contrasena) {
        registroMensaje.style.color = 'red';
        registroMensaje.textContent = 'Por favor, completa todos los campos.';
        return;
    }

    registroMensaje.style.color = 'green';
    registroMensaje.textContent = '¡Registro exitoso! Ahora puedes iniciar sesión.';
    setTimeout(() => {
        modalRegistro.style.display = 'none';
        document.getElementById('modalLogin').style.display = 'flex';
    }, 1500);
});