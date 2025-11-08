import { CURSOS } from './cursos.js';

export class Busqueda {
    constructor() { }

    init() {
        if (window.location.pathname.endsWith('cursos.html')) {
            this.render();
        }
    }

    obtenerCursos() {
        const allParams = new URLSearchParams(window.location.search); // get all URL params (name=word1+word2+...)
        const name = allParams.get('name');

        console.log(name);

        if (name) {
            const keywords = name.split('+');

            const cursosFiltrados = CURSOS.filter(curso => {
                const texto = (curso.titulo).toLowerCase();
                return keywords.some(keyword => texto.includes(keyword));
            });

            console.log('Cursos encontrados:', cursosFiltrados);
            return cursosFiltrados;
        }
        return undefined;
    }

    render() {
        const cursos = this.obtenerCursos();
        const resultadosContainer = document.querySelector('#resultados-busqueda');

        if (cursos && cursos.length > 0) {
            cursos.forEach(curso => {
                const cursoCard = document.createElement('div');
                cursoCard.classList.add('cursos_card');

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
                detalleLink.href = `./pages/detalle-curso.html?id=${curso.id}`;
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

                resultadosContainer.appendChild(cursoCard);
            });
        } else {
            resultadosContainer.innerHTML = '<p>No se encontraron cursos que coincidan con la búsqueda.</p>';
        }
    }
}