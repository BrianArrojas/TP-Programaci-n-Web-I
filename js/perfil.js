import { dialogGlobal } from './dialog.js';

export class Perfil {
    constructor(usuario) {
        this.usuario = usuario;
        this.form = document.querySelector("#perfil-form");
        this.inputNombre = document.querySelector("#nombre");
        this.inputUsuario = document.querySelector("#usuario");
        this.inputEmail = document.querySelector("#email");
        this.inputTelefono = document.querySelector("#telefono");
        this.inputPassActual = document.querySelector("#password");
        this.inputPassNueva = document.querySelector("#pass-nueva");
    }

    init() {
        if (document.querySelector('.perfil')) {
            this.render();

        }
    }

    esAlfabetico(str) {
        return /^[A-Za-z\s]+$/.test(str);
    }

    esNumerico(str) {
        return /^[0-9]+$/.test(str);
    }

    validarTelefono(telefono) {
        return /^\d{4}-?\d{4}$/.test(telefono);
    }

    validarEmail(email) {
        return email.indexOf("@") !== -1 &&
            email.indexOf(".") !== -1 &&
            email.length >= 5;
    }

    guardarCambios() {
        const nombre = this.inputNombre.value.trim();
        const usuarioNuevo = this.inputUsuario.value.trim();
        const email = this.inputEmail.value.trim();
        const telefono = this.inputTelefono.value.trim();
        const passActualIngresada = this.inputPassActual.value.trim();
        const passNueva = this.inputPassNueva.value.trim();

        if (!nombre || !usuarioNuevo || !email || !telefono || !passActualIngresada) {
            dialogGlobal.mostrar("Todos los campos son obligatorios.");
            return;
        }

        if (!this.esAlfabetico(nombre)) {
            dialogGlobal.mostrar("El nombre completo debe contener solo letras y espacios.");
            return;
        }
        if (!this.validarEmail(email)) {
            dialogGlobal.mostrar('El email debe contener "@" y "." y tener al menos 5 caracteres.');
            return;
        }

        if (!this.esNumerico(telefono)) {
            dialogGlobal.mostrar("El teléfono solo puede contener números.");
            return;
        }

        if (!this.validarTelefono(telefono)) {
            dialogGlobal.mostrar("El teléfono debe tener 8 dígitos (1234-5678).");
            return;
        }

        if (passActualIngresada !== this.usuario.contraseña) {
            dialogGlobal.mostrar("La contraseña actual es incorrecta.");
            return;
        }

        if (passNueva) {
            if (passNueva.length < 6) {
                dialogGlobal.mostrar("La nueva contraseña debe tener al menos 6 caracteres.");
                return;
            }
            if (this.esAlfabetico(passNueva) || this.esNumerico(passNueva)) {
                dialogGlobal.mostrar("La contraseña debe ser alfanumérica.");
                return;
            }
        }

        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        const indice = usuarios.findIndex(u => u.usuario === this.usuario.usuario);

        if (indice === -1) {
            dialogGlobal.mostrar("Usuario no encontrado.");
            return;
        }

        usuarios[indice].nombreCompleto = nombre;
        usuarios[indice].usuario = usuarioNuevo;
        usuarios[indice].email = email;
        usuarios[indice].telefono = telefono;

        if (passNueva) {
            usuarios[indice].contraseña = passNueva;
        }

        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        localStorage.setItem("logueado", JSON.stringify(usuarios[indice]));

        dialogGlobal.mostrar("Datos actualizados correctamente.");

        this.usuario = usuarios[indice];
        this.render();
    }

    render() {
        if (!this.usuario) {
            window.location.href = '/index.html';
            return;
        }

        this.inputNombre.value = this.usuario.nombreCompleto;
        this.inputUsuario.value = this.usuario.usuario;
        this.inputEmail.value = this.usuario.email;
        this.inputTelefono.value = this.usuario.telefono;

        this.form.addEventListener("submit", (e) => {
            e.preventDefault();
            this.guardarCambios();
        });

        const cursosUsuarioContainer = document.querySelector('#perfil-cursos');
        cursosUsuarioContainer.innerHTML = "";

        const cursosPerfil = this.usuario.cursos || [];

        if (cursosPerfil.length === 0) {
            const mensaje = document.createElement('p');
            mensaje.textContent = 'Aún no tienes cursos comprados.';
            cursosUsuarioContainer.appendChild(mensaje);
            return;
        }

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
