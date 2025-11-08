export class Footer {
    constructor() { }

    init() {
        this.render();
    }

    render() {
        const footer = document.querySelector('#footer');

        const template = `
        <a href="index.html"><img src="/imagenes/platzi.png" alt="Logo de la empresa" /></a>
        <div class="footer_dato">
            <h4>INTEGRANTES DEL GRUPO</h4>
            <ul>
                <li>
                    <img src="/imagenes/persona.svg" alt="Persona" />
                    <p>Arrojas, Brian Arian - 41808122</p>
                </li>
                <li>
                    <img src="/imagenes/persona.svg" alt="Persona" />
                    <p>Barrios Villagra, Enzo Guillermo - 47102833</p>
                </li>
                <li>
                    <img src="/imagenes/persona.svg" alt="Persona" />
                    <p>Caltana, Martin - 47094092</p>
                </li>
                <li>
                    <img src="/imagenes/persona.svg" alt="Persona" />
                    <p>Estevez, Blas Ivan - 46703993</p>
                    </li>
                <li>
                    <img src="/imagenes/persona.svg" alt="Persona" />
                    <p>Frias, Uriel Eduardo - 45996034</p>
                </li>
            </ul>
        </div>

        <div class="footer_dato">
            <h4>MENÚ</h4>
            <ul>
                <li><a href="/index.html">Inicio</a></li>
                <li><a href="/pages/calendario.html">Calendario</a></li>
                <li><a href="/pages/regala-curso.html">Regalá un curso</a></li>
                <li><a href="/pages/cursos-empresas.html">Cursos para empresas</a></li>
                <li><a href="/pages/contacto.html">Contactanos</a></li>
            </ul>
        </div>

        <div class="footer_dato">
            <h4>REDES SOCIALES</h4>
            <ul>
                <li>
                    <img src="/imagenes/instagram.svg" alt="Instagram" />
                    <a target="_blank" href="https://www.instagram.com/platzi/">@platzi</a>
                </li>
                <li>
                    <img src="/imagenes/linkedin.svg" alt="LinkedIn" />
                    <a target="_blank" href="https://www.linkedin.com/school/platzi-inc/">Platzi Inc.</a>
                </li>
                <li>
                    <img src="/imagenes/facebook.svg" alt="Facebook" />
                    <a target="_blank" href="https://www.facebook.com/platzi/?locale=es_LA">Platzi en Facebook</a>
                </li>
                <li>
                    <img src="/imagenes/youtube.svg" alt="YouTube" />
                    <a target="_blank" href="https://www.youtube.com/@Platzi">Platzi en YouTube</a>
                </li>
                <li>
                    <img src="/imagenes/x.svg" alt="X" />
                    <a target="_blank" href="https://x.com/platzi/">Platzi en X</a>
                </li>
            </ul>
        </div>
        `;

        footer.innerHTML = template;
    }
}