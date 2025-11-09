export class CarruselMediosPago {
  constructor() {
    this.contenedor = document.querySelector('.js-medios_pago_logos');
    this.flechaIzquierda = document.querySelector('.medios_pago_flechas img:first-child'); 
    this.flechaDerecha = document.querySelector('.medios_pago_flechas img:last-child'); 
    
    this.interval = null;
    this.intervalTime = 7000; 
    this.anchoLogo = 120; 
    this.isAnimando = false;
  }

  init() {
    if (!this.contenedor) return;

    this.iniciarCarruselAutomatico();
    this.agregarListenersFlechas(); 
  }

  
  moverDerecha() {
    if (this.isAnimando) return;
    this.isAnimando = true;

    this.contenedor.style.transition = 'transform 0.5s ease';
    this.contenedor.style.transform = `translateX(-${this.anchoLogo}px)`;

   
    setTimeout(() => {
   
      const primerLogo = this.contenedor.querySelector('img:first-child');
      this.contenedor.appendChild(primerLogo);

   
      this.contenedor.style.transition = 'none';
      this.contenedor.style.transform = 'translateX(0)';
      this.isAnimando = false;
    }, 500); 
  }

  moverIzquierda() {
    if (this.isAnimando) return;
    this.isAnimando = true;

    const ultimoLogo = this.contenedor.querySelector('img:last-child');
    this.contenedor.prepend(ultimoLogo);

   
    this.contenedor.style.transition = 'none';
    this.contenedor.style.transform = `translateX(-${this.anchoLogo}px)`;

   
    setTimeout(() => {
    
      this.contenedor.style.transition = 'transform 0.5s ease';
      this.contenedor.style.transform = 'translateX(0)';
    
      setTimeout(() => {
          this.isAnimando = false;
      }, 500); 
    }, 50);
  }

 

  agregarListenersFlechas() {
 
    if (this.flechaDerecha) {
      this.flechaDerecha.addEventListener('click', () => {
        clearInterval(this.interval); 
        this.moverDerecha();
        this.iniciarCarruselAutomatico();
      });
    }

   
    if (this.flechaIzquierda) {
      this.flechaIzquierda.addEventListener('click', () => {
        clearInterval(this.interval); 
        this.moverIzquierda();
        this.iniciarCarruselAutomatico(); 
      });
    }
  }



  iniciarCarruselAutomatico() {
    
    if (this.interval) {
        clearInterval(this.interval);
    }

    this.interval = setInterval(() => {
    
      this.moverDerecha();
    }, this.intervalTime);
  }
}