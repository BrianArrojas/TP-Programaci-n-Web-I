import { CursoDetalle } from './js/detalle.js';
import { GiftCard } from './js/giftcard.js';
import { Inscripcion } from "./js/inscripcion.js";
import { Inicio } from './js/index.js';
import { Usuario } from './js/usuario.js';
import { Contacto } from './js/contacto.js';
import { Header } from './js/header.js';
import { Footer } from './js/footer.js';
import { CalendarioDinamico } from './js/calendario-dinamico.js';
import { Busqueda } from './js/busqueda.js';
import { CarritoVista } from './js/carrito-vista.js';
import { Carrusel } from './js/carrusel.js';
import { CarruselMediosPago } from './js/carrusel-medio-pago.js';
import { RealizarPago } from './js/realizar-pago.js';

if (document.querySelector('.realizar-pago')) {
  const pago = new RealizarPago();
  pago.init();
}

if (document.querySelector('.js-carrusel-container')) {
  const miCarrusel = new Carrusel('.js-carrusel-container');
  miCarrusel.iniciar();
}

const busqueda = new Busqueda();
busqueda.init();

const carrusel = new CarruselMediosPago();
carrusel.init();

if (document.querySelector('.calendario-grid')) {
  const miCalendario = new CalendarioDinamico();
  miCalendario.init();
}

const footer = new Footer();
footer.init();

const header = new Header();
header.init();

if(document.querySelector('.curso')){
const cursoDetalle = new CursoDetalle();
cursoDetalle.init();
}


if (document.querySelector('.formulario_persona')) {
  const inscripcion = new Inscripcion();
  inscripcion.init();
}


const inicio = new Inicio();
inicio.init();

const usuario = new Usuario();
usuario.init();

if (document.querySelector('.giftcard')) {
  const giftcard = new GiftCard();
  giftcard.init();
}

if (document.querySelector('.contacto')) {
  const contacto = new Contacto();
  contacto.init();
}

// if (document.querySelector('.calendario')) {
//   const calendario = new Calendario();
//   calendario.init();
// }

if (document.querySelector('.carrito')) {
  const carrito = new CarritoVista();
  carrito.init();
}

