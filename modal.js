document.addEventListener('DOMContentLoaded', function() {
    // Selección de elementos del DOM
    const btnCarrito = document.querySelector('.btn-carrito1'); // Botón del carrito en el header
    const modal = document.getElementById('modalCarrito'); // Modal del carrito
    const cerrar = document.getElementById('cerrarCarrito'); // Botón para cerrar el modal
    const contenidoCarrito = document.getElementById('contenidoCarrito'); // Contenedor de los productos en el modal
    const botonesAgregar = document.querySelectorAll('.btn-carrito'); // Botones "Agregar al carrito" de cada producto
    const btnVaciar = document.getElementById('vaciarCarrito'); // Botón para vaciar el carrito
    const contadorCarrito = document.getElementById('contadorCarrito'); // Contador de artículos en el carrito
    const totalDiv = document.getElementById('totalCarrito'); // Contenedor para mostrar el total a pagar

    // Objeto para almacenar los productos agregados al carrito
    let carrito = {};

    // Mostrar el modal al hacer clic en el botón del carrito
    btnCarrito.addEventListener('click', function() {
        modal.style.display = 'block';
    });

    // Cerrar el modal al hacer clic en la "X"
    cerrar.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // Cerrar el modal al hacer clic fuera del contenido del modal
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Función para renderizar los productos del carrito en el modal y mostrar el total
    function renderizarCarrito() {
        contenidoCarrito.innerHTML = '';
        let totalCantidad = 0;
        let totalPagar = 0;
        // Recorre los productos del carrito y los muestra en el modal
        Object.values(carrito).forEach(item => {
            totalCantidad += item.cantidad;
            // Extrae el número del precio (ejemplo: "$120.00 mx" => 120)
            let precioNum = parseFloat(item.precio.replace(/[^0-9.]/g, ''));
            totalPagar += precioNum * item.cantidad;

            const div = document.createElement('div');
            div.classList.add('item-carrito');
            div.innerHTML = `
                ${item.img ? `<img src="${item.img}" alt="${item.nombre}" style="width:40px;height:40px;object-fit:cover;border-radius:4px;margin-bottom:8px;">` : ''}
                <span>${item.nombre}</span>
                <span>${item.precio}</span>
                <div class="controles-cantidad">
                    <button class="restar" data-nombre="${item.nombre}">-</button>
                    <span style="min-width:24px;display:inline-block;text-align:center;">${item.cantidad}</span>
                    <button class="sumar" data-nombre="${item.nombre}">+</button>
                </div>
            `;
            contenidoCarrito.appendChild(div);
        });
        // Actualiza el contador de artículos en el carrito
        contadorCarrito.textContent = totalCantidad;

        // Muestra el total a pagar
        if (totalDiv) {
            totalDiv.textContent = `Total a pagar: $${totalPagar.toFixed(2)} MXN`;
        }

        // Eventos para sumar cantidad de un producto
        contenidoCarrito.querySelectorAll('.sumar').forEach(btn => {
            btn.addEventListener('click', function() {
                const nombre = this.getAttribute('data-nombre');
                carrito[nombre].cantidad += 1;
                renderizarCarrito();
            });
        });
        // Eventos para restar cantidad de un producto
        contenidoCarrito.querySelectorAll('.restar').forEach(btn => {
            btn.addEventListener('click', function() {
                const nombre = this.getAttribute('data-nombre');
                carrito[nombre].cantidad -= 1;
                // Si la cantidad llega a 0, elimina el producto del carrito
                if (carrito[nombre].cantidad <= 0) {
                    delete carrito[nombre];
                }
                renderizarCarrito();
            });
        });
    }

    // Evento para agregar productos al carrito agrupando por nombre
    botonesAgregar.forEach(function(boton) {
        boton.addEventListener('click', function(e) {
            e.stopPropagation(); // Evita que se propague el evento
            const producto = boton.closest('.producto');
            const nombre = producto.querySelector('h3').textContent;
            const precio = producto.querySelector('span').textContent;
            const img = producto.querySelector('img') ? producto.querySelector('img').src : '';

            // Si el producto ya está en el carrito, suma cantidad; si no, lo agrega
            if (carrito[nombre]) {
                carrito[nombre].cantidad += 1;
            } else {
                carrito[nombre] = {
                    nombre,
                    precio,
                    img,
                    cantidad: 1
                };
            }
            renderizarCarrito();
        });
    });

    // Evento para vaciar el carrito
    btnVaciar.addEventListener('click', function() {
        carrito = {};
        renderizarCarrito();
    });
});