import { CURSOS } from "./cursos.js";
import { dialogGlobal } from "./dialog.js";
import { header } from './header.js'

export class RealizarPago {
  constructor() { }

  init() {
    if (document.querySelector('.realizar-pago')) {
      if (JSON.parse(localStorage.getItem('logueado'))) {
        this.render();
      } else {
        window.location.href = `./registro.html`;
      }
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
      window.location.href=url;
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
      dialogGlobal.mostrar("Debes iniciar sesión para comprar un curso.");
      return;
    }

    const indexUsuario = usuarios.findIndex(u => u.usuario === logueado.usuario);
    if (indexUsuario === -1) {
      dialogGlobal.mostrar("Usuario no encontrado.");
      return;
    }

    const usuario = usuarios[indexUsuario];

    const cursoComprado = CURSOS.find(c => c.id === idCurso);
    if (!cursoComprado) {
      dialogGlobal.mostrar("Curso no encontrado.");
      return;
    }

    const formularioTarjeta = document.querySelector('#formulario-tarjeta');
    if (formularioTarjeta.classList.contains('visible')) {
      if (!this.validarFormularioTarjeta()) return;
    }

    if (!usuario.cursos) usuario.cursos = [];

    const yaComprado = usuario.cursos.some(c => c.id === idCurso);
    if (yaComprado) {
      dialogGlobal.mostrar("Ya has comprado este curso.");
      return;
    }

    usuario.cursos.push(cursoComprado);

    usuarios[indexUsuario] = usuario;
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.setItem("logueado", JSON.stringify(usuario));

    dialogGlobal.mostrar(`¡Pago exitoso! Has comprado el curso "${cursoComprado.titulo}".`);
  }

  finalizarPagoCarrito() {
    const logueado = JSON.parse(localStorage.getItem("logueado"));
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    if (!logueado) {
      dialogGlobal.mostrar("Debes iniciar sesión para comprar cursos.");
      return;
    }

    const indexUsuario = usuarios.findIndex(u => u.usuario === logueado.usuario);
    if (indexUsuario === -1) {
      dialogGlobal.mostrar("Usuario no encontrado.");
      return;
    }

    const usuario = usuarios[indexUsuario];

    if (!usuario.carrito || usuario.carrito.length === 0) {
      dialogGlobal.mostrar("No tienes cursos en el carrito.");
      return;
    }

    const formularioTarjeta = document.querySelector('#formulario-tarjeta');
    if (formularioTarjeta.classList.contains('visible')) {
      if (!this.validarFormularioTarjeta()) return;
    }

    if (!usuario.cursos) usuario.cursos = [];

    let cursosAgregados = [];
    usuario.carrito.forEach(curso => {
      const yaComprado = usuario.cursos.some(c => c.id === curso.id);
      if (!yaComprado) {
        usuario.cursos.push(curso);
        cursosAgregados.push(curso.titulo);
      }
    });

    usuario.carrito = [];

    usuarios[indexUsuario] = usuario;
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.setItem("logueado", JSON.stringify(usuario));

    if (cursosAgregados.length > 0) {
      dialogGlobal.mostrar(`¡Pago exitoso! Has comprado los cursos: ${cursosAgregados.join(', ')}.`);
    } else {
      dialogGlobal.mostrar("Todos los cursos de tu carrito ya fueron comprados previamente.");
    }

    header.actualizarCantidadCarrito();

  }

  validarFormularioTarjeta() {
    const inputNumero = document.querySelector('#number');
    const inputTitular = document.querySelector('#titular');
    const inputFecha = document.querySelector('#date');
    const inputCVV = document.querySelector('#cvv');

    if (!inputNumero.value || !inputTitular.value || !inputFecha.value || !inputCVV.value) {
      dialogGlobal.mostrar('Todos los campos son obligatorios.');
      return false;
    }

    if (inputNumero.value.length !== 16) {
      dialogGlobal.mostrar('El número de tarjeta debe tener 16 dígitos.');
      return false;
    }

    if (inputCVV.value.length !== 3) {
      dialogGlobal.mostrar('El código de seguridad (CVV) debe tener 3 dígitos.');
      return false;
    }

    return true;
  }

  render() {
    const botonesOpcion = document.querySelectorAll('.js-opcion-pago');
    const botonesRedireccion = document.querySelectorAll('.js-redireccion-btn');
    const botonFinalizarPago = document.querySelector('#btn-finalizar-pago');

    const urlParams = new URLSearchParams(window.location.search);
    const pagarCarrito = urlParams.get('carrito');
    const idCurso = urlParams.get('id');
    const logueado = JSON.parse(localStorage.getItem('logueado'));

    let total = 0;
    let textoTotal = '';
    const sidebar = document.querySelector('.realizar-pago .formulario');

    if (pagarCarrito && logueado && logueado.carrito && logueado.carrito.length > 0) {
      for (let i = 0; i < logueado.carrito.length; i++) {
        total += logueado.carrito[i].precio;
      }
      textoTotal = `Total a pagar: AR$ ${total},00`;
    } else if (!pagarCarrito && idCurso) {
      const curso = (logueado.carrito || []).find(c => c.id == idCurso) || CURSOS.find(c => c.id == idCurso);
      if (curso) {
        total = curso.precio;
        textoTotal = `Precio del curso: AR$ ${total},00`;
      }
    }

    if (sidebar && textoTotal) {
      const totalElement = document.createElement('p');
      totalElement.id = 'total-carrito';
      totalElement.textContent = textoTotal;
      sidebar.insertBefore(totalElement, botonFinalizarPago);
    }

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
        if (pagarCarrito) {
          this.finalizarPagoCarrito();
        } else if (idCurso) {
          this.finalizarPago();
        }
      });
    }

    this.cambiarMetodoDePago('tarjeta');
  }


}
