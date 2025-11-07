import { CursoDetalle } from './js/detalle.js';
import { GiftCard } from './js/giftcard.js';
import { Inscripcion } from "./js/inscripcion.js";

const cursoDetalle = new CursoDetalle();
const giftcard = new GiftCard();

cursoDetalle.init();
if (document.querySelector('.giftcard')) {
  const giftcard = new GiftCard();
  giftcard.init();
}

const inscripcion = new Inscripcion();
inscripcion.init();

