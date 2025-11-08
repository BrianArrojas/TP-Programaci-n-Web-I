export class Usuario {
    constructor(nombreCompleto, usuario, contraseña, email, telefono, carrito=[]) {
        this.nombreCompleto = nombreCompleto;
        this.usuario = usuario;
        this.contraseña = contraseña;
        this.email = email;
        this.telefono = telefono;
        this.carrito = carrito;
    }

    init() {
        // Si estamos en la página de registro, configurar el registro
        if (window.location.pathname.endsWith('registro.html')) {
            this.verificarSiHayUsuarioLogueado();
            this.registrar();
        }

        if (window.location.pathname.endsWith('inicio-sesion.html')) {
            this.verificarSiHayUsuarioLogueado();
            this.iniciarSesion();
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
         // devolver el usuario si existe, sino undefined
        return usuarios.find(u => u.usuario === usuario.usuario || u.email === usuario.email);
    }

    verificarSiHayUsuarioLogueado() {
        // redirigir al index si ya hay un usuario logueado
        if (JSON.parse(localStorage.getItem('logueado'))) {
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

            if (this.validarDatosRegistro(usuario) && this.verificarSiUsuarioYaExiste(usuario) == undefined) {
                let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
                usuarios.push(usuario);
                localStorage.setItem('usuarios', JSON.stringify(usuarios));
                localStorage.setItem('logueado', JSON.stringify(usuario));
                alert(`Registro exitoso. ¡Bienvenido, ${usuario.nombreCompleto}!`);
                window.location.href = '../index.html';
            }
        });
    }

    iniciarSesion() {
        const camposInicioSesion = document.querySelectorAll('.campo-inicio-sesion');

        const btnInicioSesion = document.querySelector('#btn-inicio-sesion');

        btnInicioSesion.addEventListener('click', (e) => {
            e.preventDefault();

            const usuarioDatos = {};

            camposInicioSesion.forEach(campo => {
                usuarioDatos[campo.name] = campo.value;
            });

            const usuario = new Usuario(
                null,
                usuarioDatos['usuario'],
                usuarioDatos['contraseña'],
                null,
                null
            );

            const usuarioExistente = this.verificarSiUsuarioYaExiste(usuario);

            if (usuarioExistente !== undefined) {
                if (usuarioExistente.contraseña === usuario.contraseña) {
                    localStorage.setItem('logueado', JSON.stringify(usuarioExistente));
                    alert(`¡Bienvenido de nuevo, ${usuarioExistente.nombreCompleto}!`);
                    window.location.href = '../index.html';
                } else {
                    alert('Contraseña incorrecta. Por favor, inténtalo de nuevo.');
                    console.log('Contraseña ingresada: ' + usuario.contraseña + ", Contraseña correcta: " + usuarioExistente.contraseña);
                }
            } else {
                alert('El usuario no existe. Por favor, regístrate primero.');
            }
        })
    }
}