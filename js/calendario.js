import { CURSOS } from "./cursos.js";

export class Calendario {
  constructor() {
    this.popup = null;
  }

  init() {
    this.render();
  }

  render() {
    this.popup = document.createElement("div");
    this.popup.id = "popup-curso";
    this.popup.classList.add("popup", "hidden");
    this.popup.innerHTML = `
      <div class="popup-contenido">
        <button class="cerrar">&times;</button>
        <h3 id="popup-titulo"></h3>
        <p id="popup-descripcion"></p>
        <p><strong>Duración:</strong> <span id="popup-duracion"></span></p>
        <p><strong>Docente:</strong> <span id="popup-docente"></span></p>
        <p><strong>Precio:</strong> AR$ <span id="popup-precio"></span></p>
        <a id="popup-detalle" href="#">Ver detalle / Inscribirse</a>
      </div>
    `;
    document.body.appendChild(this.popup);

    const botones = document.querySelectorAll(".btn-curso");
    botones.forEach((btn) => {
      btn.addEventListener("click", () => {
        const texto = btn.textContent.trim();
        let curso = this.buscarCursoPorTexto(texto);
        if (curso) this.mostrarPopup(curso);
      });
    });

    this.popup.querySelector(".cerrar").addEventListener("click", () => this.cerrarPopup());
    this.popup.addEventListener("click", (e) => {
      if (e.target === this.popup) this.cerrarPopup();
    });
  }

  buscarCursoPorTexto(texto) {
    if (texto.includes("HTML")) return CURSOS.find(c => c.id === 2);
    if (texto.includes("Python")) return CURSOS.find(c => c.id === 5);
    if (texto.includes("JavaScript")) return CURSOS.find(c => c.id === 3);
    if (texto.includes("CSS")) return CURSOS.find(c => c.id === 4);
    return null;
  }

  mostrarPopup(curso) {
    this.popup.querySelector("#popup-titulo").textContent = curso.titulo;
    this.popup.querySelector("#popup-descripcion").textContent = curso.descripcion;
    this.popup.querySelector("#popup-duracion").textContent = curso.duracion;
    this.popup.querySelector("#popup-docente").textContent = curso.docente.nombre;
    this.popup.querySelector("#popup-precio").textContent = curso.precio;
    this.popup.querySelector("#popup-detalle").href = `detalle-curso.html?id=${curso.id}`;
    this.popup.classList.remove("hidden");
  }

  cerrarPopup() {
    this.popup.classList.add("hidden");
  }
}