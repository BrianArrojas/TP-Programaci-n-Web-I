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
   
        if (window.location.pathname.endsWith('registro.html')) {
            this.verificarSiHayUsuarioLogueado();
            this.registrar();
        }

        if (window.location.pathname.endsWith('inicio-sesion.html')) {
            this.verificarSiHayUsuarioLogueado();
            this.iniciarSesion();
        }
    }


    mostrarDialog(mensaje, callback = () => {}) {

        const dialog = document.createElement('dialog');
        dialog.id = 'customDialog';
        dialog.style.padding = '20px';
        dialog.style.borderRadius = '8px';
        dialog.style.border = '1px solid #09e989';
        dialog.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)'; 
        dialog.style.backgroundColor = '#000000ff';
        dialog.style.zIndex = '1000'; 
        dialog.style.position = 'fixed';
        dialog.style.top = '50%';
        dialog.style.left = '50%';
        dialog.style.transform = 'translate(-50%, -50%)';
        dialog.style.textAlign = 'center';

        dialog.innerHTML = `
            <p style="margin-bottom: 15px; font-size: 1.1em; color: white">${mensaje}</p>
            <button id="cerrarDialog" style="padding: 8px 15px; cursor: pointer; border: none; background-color: #09e989; color: black; border-radius: 4px; font-size: 1em;">Aceptar</button>
        `;

   
        document.body.appendChild(dialog);
        dialog.showModal(); 


        const botonCerrar = dialog.querySelector('#cerrarDialog');
        botonCerrar.addEventListener('click', () => {
            dialog.close();
            dialog.remove(); 
            callback(); 
        });
    }


    nombreCompletoValido(str) {
        const regex = /^[A-Za-z\s]+$/;
        return regex.test(str);
    }

    validarDatosRegistro(usuario) {
        if (!usuario.nombreCompleto || !usuario.usuario || !usuario.contraseña || !usuario.email || !usuario.telefono) {
            this.mostrarDialog('Todos los campos son obligatorios');
            return false;
        } else if (this.nombreCompletoValido(usuario.nombreCompleto) === false) {
            this.mostrarDialog('El nombre completo debe ser solo letras y espacios');
            return false;
        } else if (usuario.email.indexOf('@') === -1 || usuario.email.indexOf('.') === -1) {
            this.mostrarDialog('El email debe contener "@" y "."'); 
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
                this.mostrarDialog('El nombre de usuario o email ya están registrados.');
                return;
            }

            if (this.validarDatosRegistro(usuario)) {
                let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
                usuarios.push(usuario);
                localStorage.setItem('usuarios', JSON.stringify(usuarios));
                localStorage.setItem('logueado', JSON.stringify(usuario));
                
                this.mostrarDialog(`Registro exitoso. ¡Bienvenido, ${usuario.nombreCompleto}!`, () => {
                    window.location.href = '../index.html'; 
                });
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
                    
                    this.mostrarDialog(`¡Bienvenido de nuevo, ${usuarioExistente.nombreCompleto}!`, () => {
                        window.location.href = '../index.html';
                    });

                } else {
                    this.mostrarDialog('Contraseña incorrecta. Por favor, inténtalo de nuevo.');
                    console.log('Contraseña ingresada: ' + usuario.contraseña + ", Contraseña correcta: " + usuarioExistente.contraseña);
                }
            } else {
                this.mostrarDialog('El usuario no existe. Por favor, regístrate primero.');
            }
        })
    }
}