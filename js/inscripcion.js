import { dialogGlobal } from "./dialog.js";
import { CURSOS } from "./cursos.js";

export class Inscripcion {
    constructor() {
        this.precioPorPersona = 20000;
        this.lista = document.querySelector(".personas_inscriptas");
        this.btnAgregar = document.querySelector(".btn-agregar");
        this.totalElemento = document.querySelector(".precio_inscripcion h3");
        this.btnComprar = document.querySelector(".precio_inscripcion button");
        this.inputCurso = document.querySelector('.cursos_empresas input[list="browsers"]');
        this.personas = [this.crearPersona(1)];
        this.cursoSeleccionado = "";
    }

    init() {
        if (document.querySelector('.formulario_persona')) {
            this.render();

            this.btnAgregar.addEventListener("click", () => this.agregarPersona());
            this.btnComprar.addEventListener("click", (e) => {
                e.preventDefault();

                const logueado = JSON.parse(localStorage.getItem('logueado'));
                if (logueado) {
                    this.mostrarResumen();
                } else {
                    dialogGlobal.mostrar("Por favor, inicia sesión antes de continuar.");
                }
            });

            this.inputCurso.addEventListener("input", (e) => {
                this.cursoSeleccionado = e.target.value;
                this.actualizarTotal(); 
            });
        }
    }

    crearPersona(index) {
        const li = document.createElement("li");
        li.innerHTML = `
      <div class="formulario_persona" data-index="${index}">
        <div class="formulario_persona_campo">
          <label for="nombre${index}">Nombre:</label>
          <input type="text" id="nombre${index}" name="nombre[]" required />
        </div>
        <div class="formulario_persona_campo">
          <label for="apellido${index}">Apellido:</label>
          <input type="text" id="apellido${index}" name="apellido[]" required />
        </div>
        <div class="formulario_persona_campo">
          <label for="dni${index}">DNI:</label>
          <input type="text" id="dni${index}" name="dni[]" required maxlength="8"/>
        </div>
        <div class="formulario_persona_campo">
          <label for="email${index}">Email:</label>
          <input type="email" id="email${index}" name="email[]" required />
        </div>
        <div class="formulario_persona_campo">
          <label for="telefono${index}">Teléfono:</label>
          <input type="tel" id="telefono${index}" name="telefono[]" required />
        </div>
        ${index > 1 ? `<button type="button" class="btn-eliminar">Eliminar</button>` : ""}
      </div>
    `;
        return li;
    }

    agregarPersona() {
        const nuevaPersona = this.crearPersona(this.personas.length + 1);
        this.lista.appendChild(nuevaPersona);
        this.personas.push(nuevaPersona);
        this.actualizarTotal();
        this.render();
    }

    eliminarPersona(index) {
        if (index === 1) {
            const inputs = this.lista.querySelectorAll(`[data-index="1"] input`);
            inputs.forEach((input) => (input.value = ""));
        } else {
            const persona = this.lista.querySelector(`[data-index="${index}"]`);
            if (persona) {
                persona.parentElement.remove();
                this.personas = this.personas.filter((p) => p !== persona.parentElement);
                this.actualizarTotal();
            }
        }
    }

    actualizarTotal() {
        const cursoSeleccionado = this.cursoSeleccionado || this.inputCurso.value;
        const cursoInfo = CURSOS.find(c => c.nombre === cursoSeleccionado);
        const precioCurso = cursoInfo ? cursoInfo.precio : 0;

        const total = precioCurso + (this.personas.length * this.precioPorPersona);
        this.totalElemento.textContent = `Total: $ ${total}`;
    }

    mostrarResumen() {
        const datos = [];
        const personas = this.lista.querySelectorAll(".formulario_persona");
        let hayCamposVacios = false;

        personas.forEach((persona) => {
            const nombre = persona.querySelector(`[name="nombre[]"]`).value.trim();
            const apellido = persona.querySelector(`[name="apellido[]"]`).value.trim();
            const dni = persona.querySelector(`[name="dni[]"]`).value.trim();
            const email = persona.querySelector(`[name="email[]"]`).value.trim();
            const telefono = persona.querySelector(`[name="telefono[]"]`).value.trim();

            if (!nombre || !apellido || !dni || !email || !telefono) {
                dialogGlobal.mostrar("Por favor, completa todos los campos antes de continuar.");
                hayCamposVacios = true;
                return;
            }

            if (!/^\d{8}$/.test(dni)) {
                dialogGlobal.mostrar(`El DNI de ${nombre} ${apellido} debe contener solo números y 8 dígitos.`);
                hayCamposVacios = true;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                dialogGlobal.mostrar(`El email de ${nombre} ${apellido} no es válido.`);
                hayCamposVacios = true;
            }

            if (!/^\d+$/.test(telefono)) {
                dialogGlobal.mostrar(`El teléfono de ${nombre} ${apellido} debe contener solo números.`);
                hayCamposVacios = true;
            }

            datos.push({ nombre, apellido, dni, email, telefono });
        });

        const curso = this.cursoSeleccionado || this.inputCurso.value || "";

        if (!curso) {
            dialogGlobal.mostrar("Por favor, seleccioná un curso antes de comprar.");
            return;
        }

        if (hayCamposVacios) return;

        const popup = document.createElement("div");
        popup.classList.add("popup");
        popup.innerHTML = `
            <div class="popup-content">
                <h2>Resumen de Inscripción</h2>
                <p><strong>Curso seleccionado:</strong> ${curso}</p>
                <hr>
                <ul>
                    ${datos
                .map(
                    (p) =>
                        `<li><strong>${p.nombre} ${p.apellido}</strong> — DNI: ${p.dni}, Email: ${p.email}, Tel: ${p.telefono}</li>`
                )
                .join("")
            }
                </ul>
                <p><strong>Total:</strong> $ ${this.personas.length * this.precioPorPersona}</p>
                <div class="boton-centro">
                    <button class="confirmar-popup">Confirmar inscripción</button>
                    <button class="cerrar-popup">Cerrar</button>
                </div>
            </div>`;

        document.body.appendChild(popup);

        const cerrarBtn = popup.querySelector(".cerrar-popup");
        cerrarBtn.addEventListener("click", () => popup.remove());

        const confirmarBtn = popup.querySelector(".confirmar-popup");
        confirmarBtn.addEventListener("click", () => {
            this.guardarInscriptos(datos, curso);
            popup.remove();
            dialogGlobal.mostrar("Inscripción guardada correctamente");
        });
    }

    guardarInscriptos(datos, curso) {
        const logueado = JSON.parse(localStorage.getItem("logueado"));
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        logueado.empleadosInscriptos = [];

        datos.forEach((p) => {
            logueado.empleadosInscriptos.push({
                dni: p.dni,
                cursoId: this.obtenerIdCurso(curso),
                cursoNombre: curso,
            });
        });

        const indexUsuario = usuarios.findIndex(u => u.usuario === logueado.usuario);
        if (indexUsuario !== -1) {
            usuarios[indexUsuario] = logueado;
        }

        localStorage.setItem("logueado", JSON.stringify(logueado));
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
    }

    obtenerIdCurso(nombreCurso) {
        const cursos = [
            { id: 1, nombre: "Introducción a HTML5, CSS y JavaScript" },
            { id: 2, nombre: "Curso de JavaScript para Principiantes" },
            { id: 3, nombre: "Curso de Python Nivel Avanzado" },
            { id: 4, nombre: "Curso de Python Nivel Intermedio" },
            { id: 5, nombre: "Introducción a Machine Learning" },
            { id: 6, nombre: "Conceptos de Amazon Web Services" },
        ];
        const curso = cursos.find(c => c.nombre === nombreCurso);
        return curso ? curso.id : null;
    }

    render() {
        this.lista.querySelectorAll(".btn-eliminar").forEach((btn, i) => {
            btn.onclick = () => this.eliminarPersona(i + 2);
        });
        this.actualizarTotal();
    }
}
