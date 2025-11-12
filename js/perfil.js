export class Perfil {
    constructor(usuario) {
        this.usuario = usuario;
    }

    init() {
        if (document.querySelector('.perfil')) {
            this.render();
        }
    }

    render() {
        if (!this.usuario) {
            window.location.href = '/index.html';
        } else {
            let nombreCompleto = this.usuario.nombreCompleto;

            document.getElementById('nombre').innerText = nombreCompleto.toUpperCase();
            document.getElementById('usuario').innerText = `Usuario: ${this.usuario.usuario}`;
            document.getElementById('email').innerText = `Email: ${this.usuario.email}`;
            document.getElementById('telefono').innerText = `Teléfono: ${this.usuario.telefono}`;

            const cursosUsuarioContainer = document.querySelector('#perfil-cursos');

            const cursosPerfil = this.usuario.cursos || [];

            cursosPerfil.forEach(curso => {
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

                cursoCard.appendChild(precio);
                cursoCard.appendChild(imagen);
                cursoCard.appendChild(infoDiv);

                cursosUsuarioContainer.appendChild(cursoCard);
            });
        }
    }
}