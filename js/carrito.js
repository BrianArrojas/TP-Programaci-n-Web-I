import { dialogGlobal } from "./dialog.js";
import { header } from './header.js';

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

        const callbackNoLogueado = () => {
            window.location.href = '/pages/inicio-sesion.html';
        }

        if (!this.hayUsuarioLogueado()) {
            dialogGlobal.mostrar('Debes iniciar sesión para agregar cursos al carrito.', callbackNoLogueado);
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
            dialogGlobal.mostrar(`"${curso.titulo}" ya está en tu carrito.`, true);
            return;
        }

        carrito.push(curso);
        this.usuarios[indice].carrito = carrito;

        localStorage.setItem('usuarios', JSON.stringify(this.usuarios));
        localStorage.setItem('logueado', JSON.stringify(this.usuarios[indice]));
        dialogGlobal.mostrar(`"${curso.titulo}" se agregó correctamente al carrito.`);
        header.actualizarCantidadCarrito();
    }
}