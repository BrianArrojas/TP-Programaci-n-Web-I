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
import { Carrito } from './js/carrito.js';

const carritoInstancia = new Carrito();

const pago = new RealizarPago();
pago.init();

if (document.querySelector('.js-carrusel-container')) {
    const miCarrusel = new Carrusel('.js-carrusel-container');
    miCarrusel.iniciar();
}

const busqueda = new Busqueda();
busqueda.init();

const carrusel = new CarruselMediosPago();
carrusel.init();

const miCalendario = new CalendarioDinamico();
miCalendario.init();

const footer = new Footer();
footer.init();

const header = new Header();
header.init();

const cursoDetalle = new CursoDetalle(carritoInstancia);
cursoDetalle.init();

const inscripcion = new Inscripcion();
inscripcion.init();

const inicio = new Inicio(carritoInstancia);
inicio.init();

const usuario = new Usuario();
usuario.init();

const giftcard = new GiftCard();
giftcard.init();

const contacto = new Contacto();
contacto.init();

const carrito = new CarritoVista();
carrito.init();


