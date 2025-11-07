export class Usuario {
    constructor(nombreCompleto, usuario, contraseña, email, telefono) {
        this.nombreCompleto = nombreCompleto;
        this.usuario = usuario;
        this.contraseña = contraseña;
        this.email = email;
        this.telefono = telefono;
    }

    init() {
        // Si estamos en la página de registro, configurar el registro
        if (window.location.pathname.endsWith('registro.html')) {
            this.verificarSiHayUsuarioLogueado();
            this.registrar();
        }
    }

    nombreCompletoValido(str) {
        const regex = /^[A-Za-z\s]+$/;
        return regex.test(str);
    }

    validarDatosRegistro(usuario) {
        if (!usuario.nombreCompleto || !usuario.usuario || !usuario.contraseña || !usuario.email || !usuario.telefono) {
            alert('Todos los campos son obligatorios');
            return false;
        } else if (this.nombreCompletoValido(usuario.nombreCompleto) === false) {
            alert('El nombre completo debe ser solo letras y espacios');
            return false;
        } else if (usuario.email.indexOf('@') === -1 || usuario.email.indexOf('.') === -1) {
            alert('El email debe contener "@" y "."');
            return false;
        }

        return true;
    }

    verificarSiUsuarioYaExiste(usuario) {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

        return usuarios.some(u => u.usuario === usuario.usuario || u.email === usuario.email); // true si ya existe
    }

    verificarSiHayUsuarioLogueado() {
        // redirigir al index si ya hay un usuario logueado
        const logueado = JSON.parse(localStorage.getItem('logueado'));
        if (logueado) {
            window.location.href = '../index.html';
        }
    }

    registrar() {
        const camposRegistro = document.querySelectorAll('.campo-registro');

        const btnRegistro = document.querySelector('#btn-registro');

        btnRegistro.addEventListener('click', (e) => {
            e.preventDefault();

            const usuarioDatos = {};

            camposRegistro.forEach(campo => {
                usuarioDatos[campo.name] = campo.value;
            });

            const usuario = new Usuario(
                usuarioDatos['nombreCompleto'],
                usuarioDatos['usuario'],
                usuarioDatos['contraseña'],
                usuarioDatos['email'],
                usuarioDatos['telefono']
            );

            if (this.validarDatosRegistro(usuario) && !this.verificarSiUsuarioYaExiste(usuario)) {
                let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
                usuarios.push(usuario);
                localStorage.setItem('usuarios', JSON.stringify(usuarios));
                localStorage.setItem('logueado', JSON.stringify(usuario));
                alert(`Registro exitoso. ¡Bienvenido, ${usuario.nombreCompleto}!`);
                window.location.href = '../index.html';
            }
        });
    }
}