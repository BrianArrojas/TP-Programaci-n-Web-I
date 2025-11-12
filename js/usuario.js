import { dialogGlobal } from './dialog.js';

export class Usuario {
    constructor(nombreCompleto, usuario, contraseña, email, telefono, carrito=[], cursos=[]) {
        this.nombreCompleto = nombreCompleto;
        this.usuario = usuario;
        this.contraseña = contraseña;
        this.email = email;
        this.telefono = telefono;
        this.carrito = carrito;
        this.cursos=cursos;
    }

    init() {
    
        if (window.location.pathname.endsWith('registro.html')) {
            this.verificarSiHayUsuarioLogueado();
            this.registrar();
        }

        if (window.location.pathname.endsWith('inicio-sesion.html')) {
            this.verificarSiHayUsuarioLogueado();
            this.iniciarSesion();
        }
    }

    obtenerUsuarioLogueado() {
        return JSON.parse(localStorage.getItem('logueado'));
    }

    nombreCompletoValido(str) {
        const regex = /^[A-Za-z\s]+$/;
        return regex.test(str);
    }

    validarDatosRegistro(usuario) {
        if (!usuario.nombreCompleto || !usuario.usuario || !usuario.contraseña || !usuario.email || !usuario.telefono) {
            dialogGlobal.mostrar('Todos los campos son obligatorios');
            return false;
        } else if (this.nombreCompletoValido(usuario.nombreCompleto) === false) {
            dialogGlobal.mostrar('El nombre completo debe ser solo letras y espacios');
            return false;
        } else if (usuario.email.indexOf('@') === -1 || usuario.email.indexOf('.') === -1) {
            dialogGlobal.mostrar('El email debe contener "@" y "."'); 
            return false;
        }

        return true;
    }

    verificarSiUsuarioYaExiste(usuario) {
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        return usuarios.find(u => u.usuario === usuario.usuario || u.email === usuario.email);
    }

    verificarSiHayUsuarioLogueado() {
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

            const usuarioExistente = this.verificarSiUsuarioYaExiste(usuario);

            if (usuarioExistente) {
                dialogGlobal.mostrar('El nombre de usuario o email ya están registrados.');
                return;
            }

            if (this.validarDatosRegistro(usuario)) {
                let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
                usuarios.push(usuario);
                localStorage.setItem('usuarios', JSON.stringify(usuarios));
                localStorage.setItem('logueado', JSON.stringify(usuario));
                
                let callback = function() {
                    window.location.href = '/index.html';
                }

                dialogGlobal.mostrar(`Registro exitoso. ¡Bienvenido, ${usuario.nombreCompleto}!`, callback);
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
                    
                    let callback = function() {
                        window.location.href = '/index.html';
                    }

                    dialogGlobal.mostrar(`¡Bienvenido de nuevo, ${usuarioExistente.nombreCompleto}!`, callback);

                } else {
                    dialogGlobal.mostrar('Contraseña incorrecta. Por favor, inténtalo de nuevo.');
                    console.log('Contraseña ingresada: ' + usuario.contraseña + ", Contraseña correcta: " + usuarioExistente.contraseña);
                }
            } else {
                dialogGlobal.mostrar('El usuario no existe. Por favor, regístrate primero.');
            }
        })
    }
}