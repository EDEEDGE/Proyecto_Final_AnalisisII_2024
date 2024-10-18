document.getElementById('logo').addEventListener('click', function() {
    window.location.href = 'base.html';
});

document.getElementById('inicio-button').addEventListener('click', function() {
    window.location.href = 'inicio.html';
});

document.getElementById('cotizaciones-button').addEventListener('click', function() {
    window.location.href = 'cotizaciones.html';
});

document.getElementById('clientes-button').addEventListener('click', function() {
    window.location.href = 'clientes.html';
});

document.getElementById('productos-button').addEventListener('click', function() {
    window.location.href = 'productos.html';
});

document.getElementById('fabricantes-button').addEventListener('click', function() {
    window.location.href = 'fabricantes.html';
});

document.getElementById('usuarios-button').addEventListener('click', function() {
    window.location.href = 'usuarios.html';
});

document.getElementById('configuracion-button').addEventListener('click', function() {
    window.location.href = 'configuracion.html';
});

// Verificar si estamos en la página de inicio
if (window.location.pathname.includes('inicio.html')) {
    document.getElementById('inicio-button').classList.add('active');
}

if (window.location.pathname.includes('cotizaciones.html')) {
    document.getElementById('cotizaciones-button').classList.add('active');
}

if (window.location.pathname.includes('clientes.html')) {
    document.getElementById('clientes-button').classList.add('active');
}

if (window.location.pathname.includes('productos.html')) {
    document.getElementById('productos-button').classList.add('active');
}

if (window.location.pathname.includes('fabricantes.html')) {
    document.getElementById('fabricantes-button').classList.add('active');
}

if (window.location.pathname.includes('usuarios.html')) {
    document.getElementById('usuarios-button').classList.add('active');
}

if (window.location.pathname.includes('configuracion.html')) {
    document.getElementById('configuracion-button').classList.add('active');
}

// Abre el modal
document.getElementById('newQuoteButton').addEventListener('click', function() {
    document.getElementById('modal').classList.remove('hidden');
});

// Cierra el modal cuando se hace clic en el botón de cerrar
document.getElementById('closeModal').addEventListener('click', function() {
    document.getElementById('modal').classList.add('hidden');
});

// Cierra el modal cuando se hace clic fuera del contenido del modal
window.addEventListener('click', function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        modal.classList.add('hidden');
    }
});
