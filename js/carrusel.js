export class Carrusel {
    constructor(indiceInicial = 1) {
        this.indiceActual = indiceInicial;
        this.intervalo = null;
        this.contenedor = null;
        this.diapositivas = [];
        this.puntos = [];
    }

    init() {
        if (document.querySelector('.js-carrusel-container')) {
            this.contenedor = document.querySelector('.js-carrusel-container');
            if (!this.contenedor) return;

            this.diapositivas = this.contenedor.querySelectorAll(".js-carrusel-slide");
            this.puntos = document.querySelectorAll(".js-PdP");

            if (this.diapositivas.length === 0) return;

            this.vincularEventos();
            this.mostrarDiapositiva(this.indiceActual);
            this.iniciarAutoAvance();
        }
    }

    mostrarDiapositiva(n) {
        if (n > this.diapositivas.length) this.indiceActual = 1;
        if (n < 1) this.indiceActual = this.diapositivas.length;

        this.diapositivas.forEach(diapositiva => {
            diapositiva.style.display = "none";
        });

        this.puntos.forEach(punto => {
            punto.classList.remove("active");
        });

        this.diapositivas[this.indiceActual - 1].style.display = "block";
        if (this.puntos[this.indiceActual - 1]) {
            this.puntos[this.indiceActual - 1].classList.add("active");
        }
    }

    avanzar(n) {
        this.reiniciarAutoAvance();
        this.mostrarDiapositiva(this.indiceActual += n);
    }

    irA(n) {
        this.reiniciarAutoAvance();
        this.mostrarDiapositiva(this.indiceActual = n);
    }

    iniciarAutoAvance() {
        this.intervalo = setInterval(() => {
            this.mostrarDiapositiva(this.indiceActual += 1);
        }, 3000);
    }

    reiniciarAutoAvance() {
        clearInterval(this.intervalo);
        this.iniciarAutoAvance();
    }

    vincularEventos() {
        const flechaPrev = this.contenedor.querySelector(".js-prev");
        const flechaNext = this.contenedor.querySelector(".js-next");

        if (flechaPrev) flechaPrev.addEventListener("click", () => this.avanzar(-1));
        if (flechaNext) flechaNext.addEventListener("click", () => this.avanzar(1));

        this.puntos.forEach((punto, i) => {
            punto.addEventListener("click", () => this.irA(i + 1));
        });
    }
}