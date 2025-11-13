import { dialogGlobal } from './dialog.js';

export class Contacto {
    constructor() {
        if (document.querySelector('.contacto')) {
            this.form = document.querySelector(".formulario");
            this.nombre = document.getElementById("nombre");
            this.email = document.getElementById("email");
            this.telefono = document.getElementById("telefono");
            this.mensaje = document.getElementById("mensaje");
            this.btnEnviar = document.getElementById("btn-enviar");
            this.maxChars = 1000;
        }
    }

    init() {
        if (!this.form || !this.mensaje) return;
        this.render();
    }

    validarEmail(email) {
        return email.indexOf('@') === -1 || email.indexOf('.') === -1 || email.length < 5;
    }

    validarTelefono(telefono) {
        return /^\d{4}-?\d{4}$/.test(telefono);
    }

    esAlfabetico(str) {
        const regex = /^[A-Za-z\s]+$/;
        return regex.test(str);
    }

    esNumerico(str) {
        const regex = /^[0-9]+$/;
        return regex.test(str);
    }

    validarDatos() {
        if (!this.nombre.value.trim() || !this.email.value.trim() || !this.telefono.value.trim() || !this.mensaje.value.trim()) {
            dialogGlobal.mostrar('Todos los campos son obligatorios.');
            return false;
        } else if (!this.esAlfabetico(this.nombre.value.trim())) {
            dialogGlobal.mostrar('El nombre debe contener solo letras y espacios.');
            return false;
        } else if (this.validarEmail(this.email.value.trim())) {
            dialogGlobal.mostrar('El email debe contener "@" y "." y tener al menos 5 caracteres (example@mail.com).');
            return false;
        } else if (!this.validarTelefono(this.telefono.value.trim())) {
            dialogGlobal.mostrar('El teléfono debe tener 8 dígitos numéricos y opcionalmente un guion medio (XXXX-XXXX).');
            return false;
        }

        return true;
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

        this.mensaje.addEventListener("input", (e) => {
            e.preventDefault();

            if (this.mensaje.value.length > this.maxChars) {
                this.mensaje.value = this.mensaje.value.slice(0, this.maxChars);
            }
            counter.textContent = `${this.mensaje.value.length} / ${this.maxChars} caracteres`;
        });

        this.btnEnviar.addEventListener("click", (e) => {
            e.preventDefault();

            if (!this.validarDatos()) {
                return;
            }
            
            dialogGlobal.mostrar("Su consulta ha sido enviada con éxito. En breve será respondida.");
            this.form.reset();
            counter.textContent = `0 / ${this.maxChars} caracteres`;
        });
    }
}

