import { CURSOS } from './cursos.js';

const cursosDestacadosContainer = document.querySelector('#cursos-destacados');

CURSOS.forEach(curso => {
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

    cursosDestacadosContainer.appendChild(cursoCard);
});