import { CursoDetalle } from './js/detalle.js';
import { GiftCard } from './js/giftcard.js';
import { Inscripcion } from "./js/inscripcion.js";
import { Inicio } from './js/index.js';
import { Usuario } from './js/usuario.js';

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