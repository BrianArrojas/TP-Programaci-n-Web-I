import { CURSOS } from './cursos.js';

export class Inicio {
    constuctor() { }

    init() {
        if (window.location.pathname.endsWith('index.html')) {
            this.render();
        }
    }

    verificarSiHayUsuarioLogueado() {
        const logueado = JSON.parse(localStorage.getItem('logueado'));
        if(logueado) {
            console.log('hay usuario logueado: ' + logueado.usuario);
            return true;
        } else {
            return false;
        }
    }

    cerrarSesion() {
        localStorage.removeItem('logueado');
        window.location.href = '../index.html';
    }

    render() {
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

        const botonesIngreso = document.querySelector('#botones-ingreso');
        const opcionesUsuario = document.querySelector('#opciones-usuario');

        if (this.verificarSiHayUsuarioLogueado()) {
            botonesIngreso.style.display = 'none';
            opcionesUsuario.style.display = 'flex';

            const nombreUsuario = document.querySelector('#nombre-usuario');
            const logueado = JSON.parse(localStorage.getItem('logueado'));
            nombreUsuario.textContent = logueado.usuario;

            const cerrarSesionBtn = document.querySelector('#cerrar-sesion');
            cerrarSesionBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.cerrarSesion();
            });
        } else {
            botonesIngreso.style.display = 'flex';
            opcionesUsuario.style.display = 'none';
        }
    }
}