// Modal de Login
const modalLogin = document.getElementById('modalLogin');
const abrirLogin = document.getElementById('abrirLogin');
const cerrarLogin = document.getElementById('cerrarLogin');
const formLogin = document.getElementById('formLogin');
const loginMensaje = document.getElementById('loginMensaje');

// Mostrar modal login
abrirLogin.addEventListener('click', function(e) {
    e.preventDefault();
    modalLogin.style.display = 'flex';
    loginMensaje.textContent = '';
});

// Cerrar modal login
cerrarLogin.addEventListener('click', function() {
    modalLogin.style.display = 'none';
});

// Cerrar modal login al hacer clic fuera
window.addEventListener('click', function(event) {
    if (event.target === modalLogin) {
        modalLogin.style.display = 'none';
    }
});

// Simulación de login (usuario: admin, contraseña: 1234)
formLogin.addEventListener('submit', function(e) {
    e.preventDefault();
    const usuario = document.getElementById('usuario').value;
    const contrasena = document.getElementById('contrasena').value;
    if (usuario === 'admin' && contrasena === '1234') {
        loginMensaje.style.color = 'green';
        loginMensaje.textContent = '¡Bienvenido!';
        setTimeout(() => {
            modalLogin.style.display = 'none';
        }, 1000);
    } else {
        loginMensaje.style.color = 'red';
        loginMensaje.textContent = 'Usuario o contraseña incorrectos';
    }
});