export class Carrusel {

    #indiceDiapositiva;
    #intervaloDiapositivas;
    #diapositivas;
    #puntos;
    #contenedorElemento; 

    constructor(selectorOElemento, indiceInicial = 1) {
        this.#indiceDiapositiva = indiceInicial;
        
        let contenedor;

        if (typeof selectorOElemento === 'string') {
            contenedor = document.querySelector(selectorOElemento);
        } else if (selectorOElemento instanceof HTMLElement) {
            contenedor = selectorOElemento;
        }

        if (!contenedor) {
            console.error(`Error: No se pudo encontrar ni validar el contenedor.`);
            return;
        }

        this.#contenedorElemento = contenedor; 

        this.#diapositivas = this.#contenedorElemento.getElementsByClassName("js-carrusel-slide");
        this.#puntos = document.getElementsByClassName("js-PdP");

        this.#vincularEventos(this.#contenedorElemento);
    }

    iniciar() {
        if (!this.#contenedorElemento || this.#diapositivas.length === 0) return;

        this.mostrarDiapositivas(this.#indiceDiapositiva);
        this.#iniciarAvanceAutomatico();
    }
    

    avanzarDiapositivas(n) {
        this.#reiniciarAvanceAutomatico(); 
        this.mostrarDiapositivas(this.#indiceDiapositiva += n);
    }

    irADiapositiva(n) {
        this.#reiniciarAvanceAutomatico();
        this.mostrarDiapositivas(this.#indiceDiapositiva = n);
    }

    mostrarDiapositivas(n) {
        if (n > this.#diapositivas.length) { this.#indiceDiapositiva = 1; }
        if (n < 1) { this.#indiceDiapositiva = this.#diapositivas.length; }

        for (let i = 0; i < this.#diapositivas.length; i++) {
            this.#diapositivas[i].style.display = "none";
        }
        for (let i = 0; i < this.#puntos.length; i++) {
            this.#puntos[i].className = this.#puntos[i].className.replace(" active", "");
        }

        this.#diapositivas[this.#indiceDiapositiva - 1].style.display = "block";
        this.#puntos[this.#indiceDiapositiva - 1].className += " active";
    }

    // --- Métodos Privados ---

    #vincularEventos(contenedor) {
        const flechaPrev = contenedor.querySelector(".js-prev");
        const flechaNext = contenedor.querySelector(".js-next");
        
        if (flechaPrev) flechaPrev.addEventListener('click', () => this.avanzarDiapositivas(-1));
        if (flechaNext) flechaNext.addEventListener('click', () => this.avanzarDiapositivas(1));
        
        for (let i = 0; i < this.#puntos.length; i++) {
            this.#puntos[i].addEventListener('click', () => this.irADiapositiva(i + 1));
        }
    }
    
    #iniciarAvanceAutomatico() {
        this.#intervaloDiapositivas = setInterval(() => {
            this.mostrarDiapositivas(this.#indiceDiapositiva += 1);
        }, 3000);
    }

    #reiniciarAvanceAutomatico() {
        clearInterval(this.#intervaloDiapositivas); 
        this.#iniciarAvanceAutomatico(); 
    }
}