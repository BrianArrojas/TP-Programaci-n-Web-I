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
import { Perfil } from './js/perfil.js';

const carritoInstancia = new Carrito();

const pago = new RealizarPago();
pago.init();

const carrusel = new Carrusel();
carrusel.init();

const busqueda = new Busqueda();
busqueda.init();

const carruselMP = new CarruselMediosPago();
carruselMP.init();

const calendario = new CalendarioDinamico();
calendario.init();

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

const perfil = new Perfil(usuario.obtenerUsuarioLogueado());
perfil.init();

