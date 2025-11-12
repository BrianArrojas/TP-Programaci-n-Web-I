import { carritoVistaGlobal } from './carrito-vista.js';

export class Header {
    constructor() { }

    init() {
        this.render();
    }

    verificarSiHayUsuarioLogueado() {
        const logueado = JSON.parse(localStorage.getItem('logueado'));
        return !!logueado;
    }

    cerrarSesion() {
        localStorage.removeItem('logueado');
        window.location.href = '../index.html';
    }

    actualizarCantidadCarrito() {
        const cantidadCarrito = document.querySelector('#cantidad-carrito');
        const logueado = JSON.parse(localStorage.getItem('logueado'));
        if (cantidadCarrito) cantidadCarrito.textContent = logueado?.carrito?.length || 0;
    }

    abrirSidebar() {
        document.querySelector('#sidebar-carrito')?.classList.add('visible');
        document.querySelector('#overlay-carrito')?.classList.add('visible');
        carritoVistaGlobal.render();
    }

    cerrarSidebar() {
        document.querySelector('#sidebar-carrito')?.classList.remove('visible');
        document.querySelector('#overlay-carrito')?.classList.remove('visible');
    }

    render() {
        const header = document.querySelector('#header');
        if (!header) return;

        header.innerHTML = `
        <div class="header_superior">
            <a class="header_logo" href="/index.html"><img src="/imagenes/platzi.png" alt="Logo" /></a>

            <div class="header_busqueda">
                <a href="/pages/cursos.html" id="btn-busqueda"><img src="/imagenes/lupa-blanca.svg" alt="Lupa" class="lupa-icon" /></a>
                <input list="browsers" placeholder="Buscar cursos..." id="busqueda-input" />
                <datalist id="browsers">
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
                <a href="/pages/perfil.html" id="perfil-usuario">
                    <img src="/imagenes/logueado.png" alt="usuario_logueado">
                    <p id="nombre-usuario"></p>
                </a>
                <a href="#" id="cerrar-sesion">
                    <img src="/imagenes/cerrar_sesion.png" alt="cerrar_sesion">
                    <p>Cerrar sesión</p>
                </a>
            </article>

            <div class="header_carrito">
                <a href="#" id="abrir-sidebar"><img src="/imagenes/carrito-blanco.svg" alt="Carrito de compras" /></a>
                <div><p id="cantidad-carrito">0</p></div>
            </div>
        </div>

        <div class="header_menu">
            <nav>
                <ul>
                    <li><a href="/index.html">Inicio</a></li>
                    <li><a href="/pages/calendario.html">Calendario</a></li>
                    <li><a href="/pages/regala-curso.html">Regalá un curso</a></li>
                    <li><a href="/pages/cursos-empresas.html">Cursos para empresas</a></li>
                    <li><a href="/pages/contacto.html">Contactanos</a></li>
                </ul>
            </nav>
        </div>

        <div class="sidebar-carrito" id="sidebar-carrito">
            <div class="sidebar-header">
                <h2>Tu carrito</h2>
                <button id="cerrar-sidebar">&times;</button>
            </div>
            <div class="sidebar-contenido" id="sidebar-contenido"></div>
            <a href="/pages/realizar-pago.html?carrito=true" class="sidebar-comprar">Comprar cursos</a>
        </div>
        <div class="overlay" id="overlay-carrito"></div>
        `;

        document.querySelector('#btn-busqueda')?.addEventListener('click', (e) => {
            e.preventDefault();
            const query = document.querySelector('#busqueda-input')?.value.trim();
            if (query) {
                const searchParams = new URLSearchParams({ name: query });
                window.location.href = `/pages/cursos.html?${searchParams.toString()}`;
            }
        });

        if (this.verificarSiHayUsuarioLogueado()) {
            document.querySelector('#botones-ingreso').style.display = 'none';
            document.querySelector('#opciones-usuario').style.display = 'flex';
            const logueado = JSON.parse(localStorage.getItem('logueado'));
            document.querySelector('#nombre-usuario').textContent = logueado.usuario;
            document.querySelector('#cerrar-sesion')?.addEventListener('click', (e) => {
                e.preventDefault();
                this.cerrarSesion();
            });
        } else {
            document.querySelector('#botones-ingreso').style.display = 'flex';
            document.querySelector('#opciones-usuario').style.display = 'none';
        }

        document.querySelector('#abrir-sidebar')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.abrirSidebar();
        });
        document.querySelector('#cerrar-sidebar')?.addEventListener('click', () => this.cerrarSidebar());
        document.querySelector('#overlay-carrito')?.addEventListener('click', () => this.cerrarSidebar());

        this.actualizarCantidadCarrito();
    }
}

export const header = new Header();
