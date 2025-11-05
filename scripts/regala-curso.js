import { GiftCard } from "./giftcard.js";

document.addEventListener("DOMContentLoaded", () => {
    const inputNombre = document.querySelector('input[name="nombre"]');
    const radiosColor = document.querySelectorAll('input[name="color"]');
    const radiosFuente = document.querySelectorAll('input[name="tamanio_fuente"]');
    const inputMonto = document.querySelector('input[name="monto"]');
    const radiosFondo = document.querySelectorAll('input[name="fondo"]');

    const vistaNombre = document.querySelector(".vista_previa_destinatario h3");
    const vistaMonto = document.querySelector(".vista_previa_monto");
    const vistaPrevia = document.querySelector(".vista_previa");

    const giftcard = new GiftCard();
    giftcard.actualizarNombre(inputNombre, vistaNombre);
    giftcard.actualizarColor(radiosColor, vistaNombre);
    giftcard.actualizarTamanio(radiosFuente, vistaNombre);
    giftcard.actualizarMonto(inputMonto, vistaMonto);
    giftcard.actualizarFondo(radiosFondo, vistaPrevia);
});
