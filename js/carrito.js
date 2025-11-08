export class Carrito {
    constructor() {
        this.usuarioLogueado = JSON.parse(localStorage.getItem('logueado'));
        this.usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    }

    actualizarDatos() {
        this.usuarioLogueado = JSON.parse(localStorage.getItem('logueado'));
        this.usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    }

    hayUsuarioLogueado() {
        return !!this.usuarioLogueado;
    }

    agregarCurso(curso) {
        this.actualizarDatos();

        if (!this.hayUsuarioLogueado()) {
            alert('Debes iniciar sesión para agregar cursos al carrito.');
            window.location.href = './pages/inicio-sesion.html';
            return;
        }

        const indice = this.usuarios.findIndex(u => u.usuario === this.usuarioLogueado.usuario);
        if (indice === -1) return;

        if (!this.usuarios[indice].carrito) {
            this.usuarios[indice].carrito = [];
        }

        const carrito = this.usuarios[indice].carrito;
        const yaExiste = carrito.some(c => c.id === curso.id);

        if (yaExiste) {
            this.mostrarPopup(`"${curso.titulo}" ya está en tu carrito.`, true);
            return;
        }

        carrito.push(curso);
        this.usuarios[indice].carrito = carrito;

        localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
        localStorage.setItem('logueado', JSON.stringify(this.usuarios[indice]));

        this.mostrarPopup(`"${curso.titulo}" se agregó correctamente al carrito.`);
    }

    mostrarPopup(mensaje, error = false) {
        const popup = document.createElement('div');
        popup.classList.add('popup');
        popup.textContent = mensaje;

        if (error) popup.classList.add('popup-error');

        document.body.appendChild(popup);
        setTimeout(() => popup.remove(), 2000);
    }
}