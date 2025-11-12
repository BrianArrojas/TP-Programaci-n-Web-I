import { dialogGlobal } from './dialog.js';

export class Contacto {
    constructor() {
        if (document.querySelector('.contacto')) {
            this.form = document.querySelector(".formulario");
            this.nombre = document.getElementById("nombre");
            this.email = document.getElementById("email");
            this.telefono = document.getElementById("telefono");
            this.mensaje = document.getElementById("mensaje");
            this.maxChars = 1000;
        }

    }

    init() {
        if (!this.form || !this.mensaje) return;
        this.render();
    }

    validarEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    validarTelefono(telefono) {
        return /^\d{4}-?\d{4}$/.test(telefono);
    }

    render() {
        let counter = this.mensaje.parentElement.querySelector(".contador");
        if (!counter) {
            counter = document.createElement("p");
            counter.classList.add("contador");
            counter.style.color = "#f1f1f1";
            counter.style.fontSize = "0.9em";
            this.mensaje.parentElement.appendChild(counter);
        }
        counter.textContent = `0 / ${this.maxChars} caracteres`;

        this.mensaje.addEventListener("input", () => {
            if (this.mensaje.value.length > this.maxChars) {
                this.mensaje.value = this.mensaje.value.slice(0, this.maxChars);
            }
            counter.textContent = `${this.mensaje.value.length} / ${this.maxChars} caracteres`;
        });

        this.form.addEventListener("submit", (e) => {
            e.preventDefault();

            if (!this.nombre.value.trim()) {
                dialogGlobal.mostrar("El nombre no puede estar vacío");
                return;
            }

            if (!this.validarEmail(this.email.value.trim())) {
                dialogGlobal.mostrar("El email no es válido");
                return;
            }

            if (this.telefono.value.trim() && !this.validarTelefono(this.telefono.value.trim())) {
                dialogGlobal.mostrar("El teléfono debe tener 8 dígitos y opcionalmente un guion medio (XXXX-XXXX)");
                return;
            }

            if (!this.mensaje.value.trim()) {
                dialogGlobal.mostrar("El mensaje no puede estar vacío");
                return;
            }
            this.mostrarPopup();
            this.form.reset();
            counter.textContent = `0 / ${this.maxChars} caracteres`;
        });
    }

    mostrarPopup() {
        const popup = document.createElement("div");
        popup.classList.add("popup");
        popup.innerHTML = `
            <div class="popup-contenido">
                <h2>Consulta enviada</h2>
                <div class="boton-centro">
                <button class="aceptar-popup">Aceptar</button>
                </div>
            </div>
            `;
        document.body.appendChild(popup);

        popup.querySelector(".aceptar-popup").addEventListener("click", () => {
            window.location.href = "../index.html";
        });
    }
}

