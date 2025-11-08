export class Header {
    constructor() { }

    init() {
        this.render();
    }

    verificarSiHayUsuarioLogueado() {
        const logueado = JSON.parse(localStorage.getItem('logueado'));
        if (logueado) {
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
        const header = document.querySelector('#header');

        const template = `
        <div class="header_superior">
            <a class="header_logo" href="/index.html">
                <img src="/imagenes/platzi.png" alt="Logo" />
            </a>

            <div class="header_busqueda">
                <a href="/pages/cursos.html"><img src="/imagenes/lupa-blanca.svg" alt="Lupa" class="lupa-icon" /></a>
                <input list="browsers" placeholder="Buscar cursos..." />
                <datalist id="browsers" name="myBrowser">
                <option value="Introducción a HTML5, CSS y JavaScript"></option>
                <option value="Curso de JavaScript para Principiantes"></option>
                <option value="Curso de Python Nivel Avanzado"></option>
                <option value="Curso de Python Nivel Intermedio"></option>
                <option value="Introducción a Machine Learning"></option>
                <option value="Conceptos de Amazon Web Services"></option>
                </datalist>
            </div>

            <article class="boton_login_register" id="botones-ingreso">
                <a href="/pages/inicio-sesion.html" class="boton_estandar">Ingresar</a>
                <a href="/pages/registro.html" class="boton_estandar">Registrarse</a>
            </article>

            <article class="usuario_logueado" id="opciones-usuario">
                <div>
                <img src="/imagenes/logueado.png" alt="usuario_logueado">
                <p id="nombre-usuario"></p>
                </div>
                <a href="/index.html" id="cerrar-sesion">
                <img src="/imagenes/cerrar_sesion.png" alt="cerrar_sesion">
                <p>Cerrar sesion</p>
                </a>
            </article>

            <div class="header_carrito">
                <a href="/pages/carrito.html"><img src="/imagenes/carrito-blanco.svg" alt="Carrito de compras" /></a>
                <div>
                <p>4</p>
                </div>
            </div>
        </div>

        <div class="header_menu">
            <nav>
                <ul>
                <li><a href="/index.html">Inicio</a></li>
                <li><a href="/pages/calendario.html">Calendario</a></li>
                <li><a href="/pages/regala-curso.html">Regalá un curso</a></li>
                <li>
                    <a href="/pages/cursos-empresas.html">Cursos para empresas</a>
                </li>
                <li><a href="/pages/contacto.html">Contactanos</a></li>
                </ul>
            </nav>
        </div>`;

        header.innerHTML = template;

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