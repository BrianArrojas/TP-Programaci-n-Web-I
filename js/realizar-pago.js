import { CURSOS } from "./cursos.js";

export class RealizarPago {
  constructor() { }

  init() {
    if (document.querySelector('.realizar-pago')) {
      this.render();
    }
  }

  obtenerIdCurso() {
    const allParams = new URLSearchParams(window.location.search);
    const id = parseInt(allParams.get('id'));
    return id;
  }

  cambiarMetodoDePago(opcionSeleccionada) {
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

  manejarRedireccion(event) {
    const button = event.currentTarget;
    const url = button.getAttribute('data-url');

    if (url) {
      button.textContent = `Redirigiendo a ${url.includes('paypal') ? 'PayPal' : 'Mercado Pago'}...`;
      setTimeout(() => {
        button.textContent = button.getAttribute('data-url').includes('paypal') ? 'Ir a PayPal' : 'Ir a Mercado Pago';
      }, 2000);
    }
  }

  finalizarPago() {
    const idCurso = this.obtenerIdCurso();
    const logueado = JSON.parse(localStorage.getItem("logueado"));
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    if (!logueado) {
      alert("Debes iniciar sesión para comprar un curso.");
      return;
    }

    const indexUsuario = usuarios.findIndex(u => u.usuario === logueado.usuario);
    if (indexUsuario === -1) {
      alert("Usuario no encontrado.");
      return;
    }

    const usuario = usuarios[indexUsuario];

    const cursoComprado = CURSOS.find(c => c.id === idCurso);
    if (!cursoComprado) {
      alert("Curso no encontrado.");
      return;
    }

    if (!usuario.cursos) usuario.cursos = [];

    const yaComprado = usuario.cursos.some(c => c.id === idCurso);
    if (yaComprado) {
      alert("Ya has comprado este curso.");
      return;
    }

    usuario.cursos.push(cursoComprado);

    usuarios[indexUsuario] = usuario;
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.setItem("logueado", JSON.stringify(usuario));

    alert(`¡Pago exitoso! Has comprado el curso "${cursoComprado.titulo}".`);
  }

  render() {
    const botonesOpcion = document.querySelectorAll('.js-opcion-pago');
    const botonesRedireccion = document.querySelectorAll('.js-redireccion-btn');
    const botonFinalizarPago = document.querySelector('#btn-finalizar-pago');

    botonesOpcion.forEach(button => {
      button.addEventListener('click', () => {
        const selectedOption = button.getAttribute('data-opcion');
        this.cambiarMetodoDePago(selectedOption);
      });
    });

    botonesRedireccion.forEach(button => {
      button.addEventListener('click', (event) => this.manejarRedireccion(event));
    });

    if (botonFinalizarPago) {
      botonFinalizarPago.addEventListener('click', (e) => {
        e.preventDefault();
        this.finalizarPago();
      });
    }

    this.cambiarMetodoDePago('tarjeta');

  }


}
