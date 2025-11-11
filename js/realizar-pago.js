function cambiarMetodoDePago(opcionSeleccionada) {
    const formulariosPago = document.querySelectorAll('.js-formulario-pago');
    const botonesOpcion = document.querySelectorAll('.js-opcion-pago');

    formulariosPago.forEach(form => {
      form.classList.remove('visible');
      form.classList.add('oculto');
    });

    botonesOpcion.forEach(btn => {
      btn.classList.remove('activa');
    });

    const formularioVisible = document.querySelector(`.js-formulario-pago[data-nombre="${opcionSeleccionada}"]`);
    const botonActivo = document.querySelector(`.js-opcion-pago[data-opcion="${opcionSeleccionada}"]`);
    
    if (formularioVisible) {
      formularioVisible.classList.remove('oculto');
      formularioVisible.classList.add('visible');
    }
    if (botonActivo) {
      botonActivo.classList.add('activa');
    }
}

function manejarRedireccion(event) {
    const button = event.currentTarget;
    const url = button.getAttribute('data-url');
    
    if (url) {
        console.log(`Simulando redirección a: ${url}`);
        button.textContent = `Redirigiendo a ${url.includes('paypal') ? 'PayPal' : 'Mercado Pago'}...`;
        setTimeout(() => {
            button.textContent = button.getAttribute('data-url').includes('paypal') ? 'Ir a PayPal' : 'Ir a Mercado Pago';
        }, 2000);
    }
}

export function inicializarPago() {
    const botonesOpcion = document.querySelectorAll('.js-opcion-pago');
    const botonesRedireccion = document.querySelectorAll('.js-redireccion-btn');
    

    botonesOpcion.forEach(button => {
        button.addEventListener('click', () => {
            const selectedOption = button.getAttribute('data-opcion');
            cambiarMetodoDePago(selectedOption);
        });
    });
    

    botonesRedireccion.forEach(button => {
        button.addEventListener('click', manejarRedireccion);
    });
    
    cambiarMetodoDePago('tarjeta');
}