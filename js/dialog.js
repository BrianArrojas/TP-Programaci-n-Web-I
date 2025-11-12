export class Dialog {
    constructor() {
        this.dialog = document.createElement('dialog');
        this.dialog.id = 'customDialog';
        this.dialog.classList.add('custom-dialog');
        document.body.appendChild(this.dialog);
    }

    mostrar (mensaje, callback = () => {}) {
        this.dialog.innerHTML = `
            <p class="dialog-mensaje">${mensaje}</p>
            <button id="cerrarDialog" class="dialog-boton-aceptar">Aceptar</button>
        `;

        this.dialog.showModal();

        const btnCerrar = this.dialog.querySelector('#cerrarDialog');

        btnCerrar.addEventListener('click', () => {
            this.dialog.close();
            
            if (typeof callback === 'function') {
                callback();
            }
        });
    }
}

export const dialogGlobal = new Dialog();