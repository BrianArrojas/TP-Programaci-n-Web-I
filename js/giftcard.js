import { dialogGlobal } from "./dialog.js";

export class GiftCard {
    constructor() { }

    init() {
        if (document.querySelector('.gift_card')) {
            this.render();
        }
    }

    actualizarNombre(input, vistaNombre) {
        input.addEventListener("input", () => {
            if (input.value.length > 20) input.value = input.value.slice(0, 20);
            vistaNombre.textContent = input.value || "Destinatario";
        });
    }

    actualizarColor(radios, vistaNombre) {
        const colores = { rojo:"red", verde:"green", azul:"blue", amarillo:"gold", violeta:"violet" };
        radios.forEach(r => r.addEventListener("change", () => {
            vistaNombre.style.color = colores[r.value];
        }));
    }

    actualizarTamanio(radios, vistaNombre) {
        radios.forEach(r => r.addEventListener("change", () => {
            vistaNombre.style.fontSize = r.value;
        }));
    }

    actualizarMonto(input, vistaMonto) {
        input.addEventListener("input", () => {
            if (input.value > 100000) input.value = 100000;
            vistaMonto.textContent = input.value ? `$${input.value}.-` : "$0000.-";
        });
    }

    actualizarFondo(radios, vistaPrevia) {
        const fondos = { rojo:"#ffcccc", verde:"#ccffcc", azul:"#cce5ff", amarillo:"#fff9c4", violeta:"#e1bee7" };
        radios.forEach(r => r.addEventListener("change", () => {
            vistaPrevia.style.backgroundColor = fondos[r.value];
        }));
    }

    pagarConGiftCard() {
        const inputMonto = document.querySelector('input[name="monto"]');
        const monto = parseInt(inputMonto.value);
        if (!monto || monto <= 0) {
            dialogGlobal.mostrar("Por favor, ingresa un monto válido para la GiftCard.");
            return;
        }
        window.location.href = `./realizar-pago.html?giftcard=${monto}&tipo=giftcard`;
    }

    render() {
        const inputNombre = document.querySelector('input[name="nombre"]');
        const radiosColor = document.querySelectorAll('input[name="color"]');
        const radiosFuente = document.querySelectorAll('input[name="tamanio_fuente"]');
        const inputMonto = document.querySelector('input[name="monto"]');
        const radiosFondo = document.querySelectorAll('input[name="fondo"]');

        const vistaNombre = document.querySelector(".vista_previa_destinatario h3");
        const vistaMonto = document.querySelector(".vista_previa_monto");
        const vistaPrevia = document.querySelector(".vista_previa");

        this.actualizarNombre(inputNombre, vistaNombre);
        this.actualizarColor(radiosColor, vistaNombre);
        this.actualizarTamanio(radiosFuente, vistaNombre);
        this.actualizarMonto(inputMonto, vistaMonto);
        this.actualizarFondo(radiosFondo, vistaPrevia);

        const form = document.querySelector('form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.pagarConGiftCard();
        });
    }
}
