import { CURSOS } from "./cursos.js";

export class CalendarioDinamico {
    constructor() {
        this.fechaActual = new Date();


        this.tituloMes = document.getElementById('mes-actual');

        this.cuerpoCalendario = document.querySelector('.calendario-grid');
        this.btnAnterior = document.getElementById('btn-anterior');
        this.btnSiguiente = document.getElementById('btn-siguiente');


        this.popup = null;
        this.nombresMeses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        this.nombresDias = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'];
        this.anchoLogo = 120;
    }

    init() {
        if (document.querySelector('.calendario-grid')) {
            if (!this.cuerpoCalendario) {
                console.error("El contenedor '.calendario-grid' no fue encontrado en el DOM. Asegúrese de que el HTML está cargado.");
                return;
            }


            this.inicializarPopup();


            this.agregarListenersNavegacion();


            this.generarCalendario(this.fechaActual);
        }
    }


    inicializarPopup() {
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

        this.popup.querySelector(".cerrar").addEventListener("click", () => this.cerrarPopup());
        this.popup.addEventListener("click", (e) => {
            if (e.target === this.popup) this.cerrarPopup();
        });
    }

    buscarCursoPorId(id) {
        return CURSOS.find(c => c.id === id);
    }

    mostrarPopup(curso) {
        if (!curso) return;

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


    agregarListenersNavegacion() {
        if (this.btnAnterior) {
            this.btnAnterior.addEventListener('click', () => this.navegarMes(-1));
        }
        if (this.btnSiguiente) {
            this.btnSiguiente.addEventListener('click', () => this.navegarMes(1));
        }
    }

    navegarMes(delta) {

        this.fechaActual.setMonth(this.fechaActual.getMonth() + delta);
        this.generarCalendario(this.fechaActual);
    }



    generarCalendario(fecha) {
        const mes = fecha.getMonth();
        const año = fecha.getFullYear();

        this.tituloMes.textContent = `${this.nombresMeses[mes]} ${año}`;


        const primerDiaDelMes = new Date(año, mes, 1);
        const ultimoDiaDelMes = new Date(año, mes + 1, 0).getDate();

        const diaSemanaInicio = primerDiaDelMes.getDay();

        let html = '';
        let diasTotales = 0;
        let contadorDia = 1;


        this.nombresDias.forEach(dia => {
            html += `<li class="dia-encabezado">${dia}</li>`;
            diasTotales++;
        });


        for (let i = 0; i < diaSemanaInicio; i++) {
            html += '<li class="dia-vacio"></li>';
            diasTotales++;
        }


        while (contadorDia <= ultimoDiaDelMes) {

            const fechaBusqueda = `${año}-${String(mes + 1).padStart(2, '0')}-${String(contadorDia).padStart(2, '0')}`;


            const cursoDelDia = CURSOS.find(c => c.inicio === fechaBusqueda);

            let contenidoDia = `<p class="dia">${contadorDia}</p>`;

            if (cursoDelDia) {

                contenidoDia += `<button class="btn-curso curso-${cursoDelDia.id}" data-curso-id="${cursoDelDia.id}">
                                    ${cursoDelDia.nombre}
                                 </button>`;
            }


            const esHoy = this.esFechaActual(año, mes, contadorDia);
            const claseHoy = esHoy ? 'fecha-actual' : '';


            html += `<li class="dia-celda ${claseHoy}">${contenidoDia}</li>`;

            contadorDia++;
            diasTotales++;
        }



        while (diasTotales % 7 !== 0) {
            html += '<li class="dia-vacio"></li>';
            diasTotales++;
        }


        this.cuerpoCalendario.innerHTML = html;


        this.agregarListenersBotonesCurso();
    }

    esFechaActual(año, mes, dia) {
        const hoy = new Date();
        return (
            año === hoy.getFullYear() &&
            mes === hoy.getMonth() &&
            dia === hoy.getDate()
        );
    }

    agregarListenersBotonesCurso() {
        const botones = this.cuerpoCalendario.querySelectorAll(".btn-curso");
        botones.forEach((btn) => {
            btn.addEventListener("click", () => {

                const cursoId = parseInt(btn.dataset.cursoId);
                let curso = this.buscarCursoPorId(cursoId);

                if (curso) this.mostrarPopup(curso);
            });
        });
    }
}