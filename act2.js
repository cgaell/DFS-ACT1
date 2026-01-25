
class Juego {
    constructor(nombre, imagen) {
        this.nombre = nombre;
        this.imagen = imagen;
        this.elemento = this.crearElemento();
    }

    crearElemento() {
        const nuevaTarjeta = document.createElement('div');
        nuevaTarjeta.className = 'game-card';
        
        nuevaTarjeta.innerHTML = `<div class="card-body">
                <div class="poster-container">
                    <img src="${this.imagen}" alt="${this.nombre}" class="poster">
                </div>
                <div class="game-details">
                    <div class="game-header">
                        <h3>${this.nombre}</h3>
                    </div>
                    <div class="status-row">
                        <span class="status-text label-status">Actualizacion en espera</span>
                    </div>
                </div>
            </div>
            <div class="card-controls">
                <button class="control-btn btn-toggle">▶</button>
                <button class="control-btn btn-close">X</button>
                <button class="control-btn">...</button>
            </div>
        `;

        nuevaTarjeta.querySelector('.btn-close').addEventListener('click', () => this.eliminar());

        nuevaTarjeta.querySelector('.btn-toggle').addEventListener('click', () => this.cambiarEstado());

        return nuevaTarjeta;
    }

    cambiarEstado() {
        const label = this.elemento.querySelector('.label-status');
        const boton = this.elemento.querySelector('.btn-toggle');

        if (label.innerText === "Actualizacion en espera" || label.innerText === "Pausado") {
            label.innerText = "Descargando...";
            boton.innerText = "⏸";
        } else {
            label.innerText = "Pausado";
            boton.innerText = "▶";
        }
    }

    eliminar() {
        this.elemento.remove();
    }
}

class GestorDescargas {
    constructor(contenedorId) {
        this.contenedor = document.getElementById(contenedorId);
        this.EmpezarEventos();
        alert("BIENVENIDO AL GESTOR DE DESCARGAS DE EPIC GAMES!");
    }

    EmpezarEventos() {
        document.getElementById('btn-agregar').addEventListener('click', () => this.agregarDescarga());
        document.getElementById('btn-eliminar').addEventListener('click', () => this.eliminarDescarga());
    }

    agregarDescarga() {
        const nombreJuego = prompt("Ingrese el nombre del juego:");
        const urlImagen = prompt("Ingrese la URL de la imagen del juego:");
        if (nombreJuego && urlImagen) {
            const nuevoJuego = new Juego(nombreJuego, urlImagen);
            this.contenedor.appendChild(nuevoJuego.elemento);
        } else {
            alert("Nombre del juego o URL de la imagen no proporcionados.");
        }
    }

    eliminarDescarga() {
        const tarjetas = this.contenedor.getElementsByClassName('game-card');
        if (tarjetas.length > 0) {
            tarjetas[tarjetas.length - 1].remove();
        } else {
            alert("No hay descargas para eliminar.");
        }
    }
}

const iniciarGestor = new GestorDescargas('container-descargas');
        