import { CursoDetalle } from './js/detalle.js';
import { GiftCard } from './js/giftcard.js';
import { Inscripcion } from "./js/inscripcion.js";
import { Inicio } from './js/index.js';
import { Usuario } from './js/usuario.js';
import { Contacto } from './js/contacto.js';
import { Header } from './js/header.js';
import { Footer } from './js/footer.js';
import { Calendario } from './js/calendario.js';
import { Busqueda } from './js/busqueda.js';
import { CarritoVista } from './js/carrito-vista.js';
import {Carrusel} from './js/carrusel.js';


const miCarrusel = new Carrusel('.js-carrusel-container'); 
miCarrusel.iniciar();

const busqueda = new Busqueda();
busqueda.init();

const footer = new Footer();
footer.init();

const header = new Header();
header.init();

const cursoDetalle = new CursoDetalle();
cursoDetalle.init();

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

if (document.querySelector('.calendario')) {
  const calendario = new Calendario();
  calendario.init();
}

if (document.querySelector('.carrito')) {
  const carrito = new CarritoVista();
  carrito.init();
}

