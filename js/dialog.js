export class Dialog {

    constructor(openButtonElement, dialogElement, closeButtonElement) {
        
        this.botonAbrir = openButtonElement;
        this.ventanaDialogo = dialogElement;
        this.botonCerrar = closeButtonElement;

        this.manejarApertura = this.manejarApertura.bind(this);
        this.manejarCierre = this.manejarCierre.bind(this);
    }


    manejarApertura(evento) {
        evento.preventDefault();
        this.ventanaDialogo.showModal(); 
    }

    manejarCierre(evento) {
        evento.preventDefault();
        this.ventanaDialogo.close(); 
    }

    render() {
        if (this.botonAbrir) {
            this.botonAbrir.addEventListener("click", this.manejarApertura);
        }
        if (this.botonCerrar) {
            this.botonCerrar.addEventListener("click", this.manejarCierre);
        }
    }
}