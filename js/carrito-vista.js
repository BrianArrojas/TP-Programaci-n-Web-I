export class CarritoVista {
  constructor() {
    this.container = null;
  }

  render() {
    this.container = document.querySelector('#sidebar-contenido');
    if (!this.container) return; 

    const logueado = JSON.parse(localStorage.getItem('logueado'));
    if (!logueado) {
      this.container.innerHTML = `<p class="no-login">Iniciá sesión para ver tu carrito.</p>`;
      return;
    }

    const carrito = logueado.carrito || [];
    if (carrito.length === 0) {
      this.container.innerHTML = `<p class="carrito-vacio">Tu carrito está vacío.</p>`;
      return;
    }

    this.container.innerHTML = carrito.map((curso, index) => `
      <div class="cursos_card" data-index="${index}">
          <span>AR$ ${curso.precio},00</span>
          <img src="${curso.imagen}" alt="${curso.titulo}" />
          <div>
              <p>${curso.duracion}</p>
              <h3>${curso.titulo}</h3>
          </div>
          <a href="/pages/detalle-curso.html?id=${curso.id}">Ver detalle</a>
          <button class="btn-eliminar">Eliminar</button>
      </div>
    `).join('');

    this.agregarEventosEliminar();
  }

  agregarEventosEliminar() {
    const botones = document.querySelectorAll('.btn-eliminar');
    botones.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const card = e.target.closest('.cursos_card');
        const index = card.dataset.index;
        this.eliminarCurso(index);
      });
    });
  }

  eliminarCurso(index) {
    const logueado = JSON.parse(localStorage.getItem('logueado'));
    if (!logueado || !logueado.carrito) return;

    logueado.carrito.splice(index, 1);
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const indexUsuario = usuarios.findIndex(u => u.usuario === logueado.usuario);
    if (indexUsuario !== -1) usuarios[indexUsuario] = logueado;

    localStorage.setItem('logueado', JSON.stringify(logueado));
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    this.render();
    const cantidad = document.querySelector('#cantidad-carrito');
    if (cantidad) cantidad.textContent = logueado.carrito.length;
  }
}

export const carritoVistaGlobal = new CarritoVista();
