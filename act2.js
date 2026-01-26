
class Juego {
    constructor(nombre, imagen) {
        this.nombre = nombre;
        this.imagen = imagen;
        this.progreso = 0;
        this.intervalo = null;
        this.elemento = this.crearElemento();
    }

    crearElemento() {
        const nuevaTarjeta = document.createElement('div');
        nuevaTarjeta.className = 'game-card';
        
        nuevaTarjeta.innerHTML = `<div class="card-body">
                <div class="poster-container">
                    <img src="${this.imagen}" alt="${this.nombre}" class="poster img-poster"/>
                </div>
                <div class="game-details">
                    <div class="game-header">
                        <h3 class="title-text">${this.nombre}</h3>
                    </div>
                    <div class="status-row">
                        <span class="status-text label-status">Actualización en espera</span>
                        <span class="percentage-text">0%</span>
                    </div>
                    <div class="progress-container">
                        <div class="progress-bar"></div>
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

        actualizarDatos(nuevoNombre, nuevaImagen) {
            this.nombre = nuevoNombre;
            this.imagen = nuevaImagen;
            this.elemento.querySelector('.title-text').innerText = this.nombre;
            const img = this.elemento.querySelector('.img-poster');
            img.src = this.imagen;
            img.alt = this.nombre;
        }

    cambiarEstado() {
        const label = this.elemento.querySelector('.label-status');
        const boton = this.elemento.querySelector('.btn-toggle');

        if (label.innerText === "Actualizacion en espera" || label.innerText === "Pausado") {
            label.innerText = "Descargando...";
            boton.innerText = "⏸";
            this.iniciarProgreso();
        } else {
            label.innerText = "Pausado";
            boton.innerText = "▶";
            this.pausarProgreso();
        }
    }

    iniciarProgreso() {
        if (this.intervalo) return; 

        this.intervalo = setInterval(() => {
            if (this.progreso < 100) {
                this.progreso += Math.random() * 2; 
                if (this.progreso > 100) this.progreso = 100;
                this.actualizarVisualBarra();
            } else {
                this.detenerProgreso();
                this.elemento.querySelector('.label-status').innerText = "Completado";
                this.elemento.querySelector('.label-status').style.color = "#013220";
            }
        }, 500);
    }


    pausarProgreso() {
        clearInterval(this.intervalo);
        this.intervalo = null;
    }

    actualizarVisualBarra() {
        const barra = this.elemento.querySelector('.progress-bar');
        const porcentaje = this.elemento.querySelector('.percentage-text');
        
        barra.style.width = `${this.progreso}%`;
        porcentaje.innerText = `${Math.floor(this.progreso)}%`;
    }


    eliminar() {
        this.elemento.remove();
        this.pausarProgreso();
    }
}

class GestorDescargas {
    constructor(contenedorId) {
        this.contenedor = document.getElementById(contenedorId);
        this.juegos = [];
        this.EmpezarEventos();
        alert("BIENVENIDO AL GESTOR DE DESCARGAS DE EPIC GAMES!");
    }

    EmpezarEventos() {
        document.getElementById('btn-agregar').addEventListener('click', () => this.agregarDescarga());
        document.getElementById('btn-eliminar').addEventListener('click', () => this.eliminarDescarga());
        document.getElementById('btn-editar').addEventListener('click', () => this.editarJuego());

        const btnNavEditar = document.getElementById('btn-editar');
        if(btnNavEditar) {
            btnNavEditar.addEventListener('click', () => {
                const tarjetas = this.contenedor.querySelectorAll('.game-card');
                if (tarjetas.length > 0) {
                    // Accionamos el click del botón interno de la última tarjeta
                    tarjetas[tarjetas.length - 1].querySelector('.btn-editar').click();
                }
            });
        }
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
    
    editarJuego() {
        alert("Proximamente podras editar la ultima descarga agregada.");
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
        