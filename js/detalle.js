import { CURSOS } from "./cursos.js";

export class CursoDetalle {
    constructor() { }

    init() {
        this.render();
    }

    obtenerIdCurso() {
        const allParams = new URLSearchParams(window.location.search); // get all URL params
        const id = parseInt(allParams.get('id')); // get the 'id' param and convert to integer
        return id;
    }

    obtenerDatosCurso() {
        return CURSOS.find(c => c.id === this.obtenerIdCurso()); // find the course with the matching id
    }

    obtenerCursosDestacadosMenosActual() {
        // get 3 random courses excluding the current one
        return CURSOS.filter(c => c.id !== this.obtenerIdCurso()).sort(() => 0.5 - Math.random()).slice(0, 3); 
    }

    render() {
        if (this.obtenerDatosCurso()) {
            const datosContainer = document.querySelector('#curso-datos');

            const curso = this.obtenerDatosCurso();

            const imagenCurso = document.querySelector('#curso-imagen');
            imagenCurso.src = curso.imagen;


            const datosTemplate =
                `<h2>${curso.titulo}</h2>
            <ul>
                <li>Valor: $${curso.precio}</li>
                <li>Tiempo de dedicación necesario: ${curso.duracion}</li>
                <li>
                    Descripción del curso: ${curso.descripcion}
                </li>
                <li>Requisitos previos: ${curso.requisitos}</li>
            </ul>`;

            datosContainer.innerHTML = datosTemplate;

            const contenidosContainer = document.querySelector('#contenidos-curso');

            const contenidosTemplate = `
                <details>
                    <summary>Introducción</summary>
                    <ul>
                        <li class="item_clase">
                        <div>
                            <img src="../imagenes/persona.svg" alt="Icono persona" />
                            <p>Clase 1: ${curso.contenidos.introduccion.clase1[0]}</p>
                        </div>
                        <div>
                            <div>
                            <img src="../imagenes/reloj.svg" alt="Icono reloj" />
                            <p>${curso.contenidos.introduccion.clase1[1]} min</p>
                            </div>
                            <input type="checkbox" class="checkbox-item" id="checkbox-item-checked" />
                        </div>
                        </li>
                        <li class="item_clase">
                        <div>
                            <img src="../imagenes/persona.svg" alt="Icono persona" />
                            <p>Clase 2: ${curso.contenidos.introduccion.clase2[0]}</p>
                        </div>
                        <div>
                            <div>
                            <img src="../imagenes/reloj.svg" alt="Icono reloj" />
                            <p>${curso.contenidos.introduccion.clase2[1]} min</p>
                            </div>
                            <input type="checkbox" name="checkbox-item" class="checkbox-item" />
                        </div>
                        </li>
                        <li class="item_clase">
                        <div>
                            <img src="../imagenes/persona.svg" alt="Icono persona" />
                            <p>Clase 3: ${curso.contenidos.introduccion.clase3[0]}</p>
                        </div>
                        <div>
                            <div>
                            <img src="../imagenes/reloj.svg" alt="Icono reloj" />
                            <p>${curso.contenidos.introduccion.clase3[1]} min</p>
                            </div>
                            <input type="checkbox" name="checkbox-item" class="checkbox-item" />
                        </div>
                        </li>
                    </ul>
                </details>

                <details>
                    <summary>Unidad 1</summary>
                    <ul>
                        <li class="item_clase">
                        <div>
                            <img src="../imagenes/persona.svg" alt="Icono persona" />
                            <p>Clase 1: ${curso.contenidos.unidad1.clase1[0]}</p>
                        </div>
                        <div>
                            <div>
                            <img src="../imagenes/reloj.svg" alt="Icono reloj" />
                            <p>${curso.contenidos.unidad1.clase1[1]} min</p>
                            </div>
                            <input type="checkbox" class="checkbox-item" id="checkbox-item-checked" />
                        </div>
                        </li>
                        <li class="item_clase">
                        <div>
                            <img src="../imagenes/persona.svg" alt="Icono persona" />
                            <p>Clase 2: ${curso.contenidos.unidad1.clase2[0]}</p>
                        </div>
                        <div>
                            <div>
                            <img src="../imagenes/reloj.svg" alt="Icono reloj" />
                            <p>${curso.contenidos.unidad1.clase2[1]} min</p>
                            </div>
                            <input type="checkbox" name="checkbox-item" class="checkbox-item" />
                        </div>
                        </li>
                        <li class="item_clase">
                        <div>
                            <img src="../imagenes/persona.svg" alt="Icono persona" />
                            <p>Clase 3: ${curso.contenidos.unidad1.clase3[0]}</p>
                        </div>
                        <div>
                            <div>
                            <img src="../imagenes/reloj.svg" alt="Icono reloj" />
                            <p>${curso.contenidos.unidad1.clase3[1]} min</p>
                            </div>
                            <input type="checkbox" name="checkbox-item" class="checkbox-item" />
                        </div>
                        </li>
                    </ul>
                </details>

                <details>
                    <summary>Unidad 2</summary>
                    <ul>
                        <li class="item_clase">
                        <div>
                            <img src="../imagenes/persona.svg" alt="Icono persona" />
                            <p>Clase 1: ${curso.contenidos.unidad2.clase1[0]}</p>
                        </div>
                        <div>
                            <div>
                            <img src="../imagenes/reloj.svg" alt="Icono reloj" />
                            <p>${curso.contenidos.unidad2.clase1[1]} min</p>
                            </div>
                            <input type="checkbox" class="checkbox-item" id="checkbox-item-checked" />
                        </div>
                        </li>
                        <li class="item_clase">
                        <div>
                            <img src="../imagenes/persona.svg" alt="Icono persona" />
                            <p>Clase 2: ${curso.contenidos.unidad2.clase2[0]}</p>
                        </div>
                        <div>
                            <div>
                            <img src="../imagenes/reloj.svg" alt="Icono reloj" />
                            <p>${curso.contenidos.unidad2.clase2[1]} min</p>
                            </div>
                            <input type="checkbox" name="checkbox-item" class="checkbox-item" />
                        </div>
                        </li>
                        <li class="item_clase">
                        <div>
                            <img src="../imagenes/persona.svg" alt="Icono persona" />
                            <p>Clase 3: ${curso.contenidos.unidad2.clase3[0]}</p>
                        </div>
                        <div>
                            <div>
                            <img src="../imagenes/reloj.svg" alt="Icono reloj" />
                            <p>${curso.contenidos.unidad2.clase3[1]} min</p>
                            </div>
                            <input type="checkbox" name="checkbox-item" class="checkbox-item" />
                        </div>
                        </li>
                    </ul>
                </details>
            `;

            contenidosContainer.innerHTML = contenidosTemplate;

            const docenteContainer = document.querySelector('#docente-datos');

            let estrellas = "";
            let grisesCantidad = 5 - curso.docente.calificacion;
            for (let i = 0; i < curso.docente.calificacion; i++) {
                estrellas += `<li><img src="../imagenes/estrella.svg" alt="Estrella llena" /></li>`;
            }
            for (let i = 0; i < grisesCantidad; i++) {
                estrellas += `<li><img src="../imagenes/estrella-gris.svg" alt="Estrella vacía" /></li>`;
            }

            const docenteTemplate = `
            <img src="../imagenes/persona.svg" alt="Persona icono" />

            <div>
                <h3>${curso.docente.nombre.toLocaleUpperCase()}</h3>

                <ul>${estrellas}</ul>

                <p>${curso.docente.descripcion}</p>
            </div >`;

            docenteContainer.innerHTML = docenteTemplate;

            const cursosDestacadosContainer = document.querySelector('#cursos-destacados');

            const cursosDestacados = this.obtenerCursosDestacadosMenosActual();

            cursosDestacados.forEach(curso => {
                const cursoCard = document.createElement('div');
                cursoCard.classList.add('cursos_destacados_card');
            
                const precio = document.createElement('span');
                precio.textContent = 'AR$ ' + curso.precio.toFixed(2).replace('.', ',');
            
                const imagen = document.createElement('img');
                imagen.src = curso.imagen;
                imagen.alt = curso.titulo;
            
                const infoDiv = document.createElement('div');
                const duracion = document.createElement('p');
                duracion.textContent = curso.duracion;
                infoDiv.appendChild(duracion);
                const titulo = document.createElement('h3');
                titulo.textContent = curso.titulo;
                infoDiv.appendChild(titulo);
            
                const detalleLink = document.createElement('a');
                detalleLink.href = `./detalle-curso.html?id=${curso.id}`;
                detalleLink.textContent = 'Ver detalle';
            
                const comprarLink = document.createElement('a');
                comprarLink.href = './pages/Inicio-sesion.html';
                const comprarButton = document.createElement('button');
                comprarButton.textContent = 'Comprar';
                comprarLink.appendChild(comprarButton);
            
                cursoCard.appendChild(precio);
                cursoCard.appendChild(imagen);
                cursoCard.appendChild(infoDiv);
                cursoCard.appendChild(detalleLink);
                cursoCard.appendChild(comprarLink);
            
                cursosDestacadosContainer.appendChild(cursoCard);
            });
        }
    }
}