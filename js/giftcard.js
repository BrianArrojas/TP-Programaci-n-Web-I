export class GiftCard {
    constructor() { }

    init() {
        if (document.querySelector('.gift_card')) {
            this.render();
        }
    }

    actualizarNombre(input, vistaNombre) {
        input.addEventListener("input", () => {
            if (input.value.length > 20) {
                input.value = input.value.slice(0, 20);
            }
            vistaNombre.textContent = input.value || "Destinatario";
        });
    }

    actualizarColor(radios, vistaNombre) {
        const colores = {
            rojo: "red",
            verde: "green",
            azul: "blue",
            amarillo: "gold",
            violeta: "violet"
        };

        radios.forEach((radio) => {
            radio.addEventListener("change", () => {
                vistaNombre.style.color = colores[radio.value];
            });
        });
    }

    actualizarTamanio(radios, vistaNombre) {
        radios.forEach((radio) => {
            radio.addEventListener("change", () => {
                vistaNombre.style.fontSize = radio.value;
            });
        });
    }

    actualizarMonto(input, vistaMonto) {
        input.addEventListener("input", () => {
            if (input.value > 100000) {
                input.value = 100000;
            }
            vistaMonto.textContent = input.value
                ? `$${input.value}.-`
                : "$0000.-";
        });
    }

    actualizarFondo(radios, vistaPrevia) {
        const fondos = {
            rojo: "#ffcccc",
            verde: "#ccffcc",
            azul: "#cce5ff",
            amarillo: "#fff9c4",
            violeta: "#e1bee7"
        };

        radios.forEach((radio) => {
            radio.addEventListener("change", () => {
                vistaPrevia.style.backgroundColor = fondos[radio.value];
            });
        });
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
    }
}
