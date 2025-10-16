// ⚽ CLASE JUGADOR
class Jugador {
  constructor(id, nombre, posicion, equipo, precio) {
    this.id = id;
    this.nombre = nombre;
    this.posicion = posicion;
    this.equipo = equipo;
    this.precio = precio;
    this.puntos = 0;
    this.partidos = 0;
  }

  // Suma puntos al jugador
  agregarPuntos(cantidad) {
    this.puntos = this.puntos + cantidad;
  }

  // Reinicia los puntos
  reiniciarPuntos() {
    this.puntos = 0;
  }

  // Obtiene la información del jugador
  obtenerInfo() {
    return {
      id: this.id,
      nombre: this.nombre,
      posicion: this.posicion,
      equipo: this.equipo,
      precio: this.precio,
      puntos: this.puntos,
      partidos: this.partidos
    };
  }
}

// ⚽ CLASE EQUIPO
class EquipoUsuario {
  constructor(nombreEquipo, usuario) {
    this.nombreEquipo = nombreEquipo;
    this.usuario = usuario;
    this.jugadores = [];
    this.presupuesto = 100; // Presupuesto inicial en millones
  }

  // Agrega un jugador al equipo
  agregarJugador(jugador) {
    // Verifica si hay presupuesto
    if (this.presupuesto < jugador.precio) {
      return { exito: false, mensaje: "No hay presupuesto suficiente" };
    }

    // Verifica cantidad máxima de jugadores
    if (this.jugadores.length >= 11) {
      return { exito: false, mensaje: "Equipo completo (máximo 11)" };
    }

    // Verifica cantidad por posición
    let conteoPosicion = 0;
    for (let i = 0; i < this.jugadores.length; i++) {
      if (this.jugadores[i].posicion === jugador.posicion) {
        conteoPosicion = conteoPosicion + 1;
      }
    }

    // Validar límites por posición
    if (jugador.posicion === "arquero" && conteoPosicion >= 1) {
      return { exito: false, mensaje: "Máximo 1 arquero" };
    }
    if (jugador.posicion === "defensa" && conteoPosicion >= 4) {
      return { exito: false, mensaje: "Máximo 4 defensas" };
    }
    if (jugador.posicion === "mediocampista" && conteoPosicion >= 4) {
      return { exito: false, mensaje: "Máximo 4 mediocampistas" };
    }
    if (jugador.posicion === "delantero" && conteoPosicion >= 2) {
      return { exito: false, mensaje: "Máximo 2 delanteros" };
    }

    // Agrega el jugador
    this.jugadores.push(jugador);
    this.presupuesto = this.presupuesto - jugador.precio;

    return { exito: true, mensaje: "Jugador agregado correctamente" };
  }

  // Elimina un jugador del equipo
  eliminarJugador(idJugador) {
    let indice = -1;
    for (let i = 0; i < this.jugadores.length; i++) {
      if (this.jugadores[i].id === idJugador) {
        indice = i;
        break;
      }
    }

    if (indice === -1) {
      return { exito: false, mensaje: "Jugador no encontrado" };
    }

    let jugadorEliminado = this.jugadores[indice];
    this.presupuesto = this.presupuesto + jugadorEliminado.precio;
    
    // Elimina el jugador del array
    let nuevoArray = [];
    for (let i = 0; i < this.jugadores.length; i++) {
      if (i !== indice) {
        nuevoArray.push(this.jugadores[i]);
      }
    }
    this.jugadores = nuevoArray;

    return { exito: true, mensaje: "Jugador eliminado" };
  }

  // Calcula puntos totales del equipo
  calcularPuntosTotal() {
    let total = 0;
    for (let i = 0; i < this.jugadores.length; i++) {
      total = total + this.jugadores[i].puntos;
    }
    return total;
  }

  // Obtiene información del equipo
  obtenerInfo() {
    let infoJugadores = [];
    for (let i = 0; i < this.jugadores.length; i++) {
      infoJugadores.push(this.jugadores[i].obtenerInfo());
    }

    return {
      nombreEquipo: this.nombreEquipo,
      usuario: this.usuario,
      jugadores: infoJugadores,
      cantidad: this.jugadores.length,
      presupuestoRestante: this.presupuesto,
      puntosTotal: this.calcularPuntosTotal()
    };
  }
}

// ⚽ CLASE SISTEMA DE PUNTOS
class SistemaPuntos {
  constructor() {
    this.reglas = {
      gol: 5,
      asistencia: 3,
      tarjetaAmarilla: -1,
      tarjetaRoja: -3,
      victoriaCompleta: 1,
      empate: 0,
      derrota: 0
    };
  }

  // Calcula puntos según estadísticas
  calcularPuntosJugador(estadisticas) {
    let puntos = 0;

    // Goles
    if (estadisticas.goles) {
      puntos = puntos + (estadisticas.goles * this.reglas.gol);
    }

    // Asistencias
    if (estadisticas.asistencias) {
      puntos = puntos + (estadisticas.asistencias * this.reglas.asistencia);
    }

    // Tarjetas amarillas
    if (estadisticas.tarjetasAmarillas) {
      puntos = puntos + (estadisticas.tarjetasAmarillas * this.reglas.tarjetaAmarilla);
    }

    // Tarjetas rojas
    if (estadisticas.tarjetasRojas) {
      puntos = puntos + (estadisticas.tarjetasRojas * this.reglas.tarjetaRoja);
    }

    return puntos;
  }

  // Simula puntos aleatorios para pruebas
  simularPuntosAleatorios(posicion) {
    let goles = 0;
    let asistencias = 0;
    let tarjetasAmarillas = 0;

    if (posicion === "delantero") {
      goles = Math.floor(Math.random() * 3);
      asistencias = Math.floor(Math.random() * 2);
    } else if (posicion === "mediocampista") {
      goles = Math.floor(Math.random() * 2);
      asistencias = Math.floor(Math.random() * 3);
    } else if (posicion === "defensa") {
      asistencias = Math.floor(Math.random() * 1);
    }

    tarjetasAmarillas = Math.floor(Math.random() * 2);

    let estadisticas = {
      goles: goles,
      asistencias: asistencias,
      tarjetasAmarillas: tarjetasAmarillas,
      tarjetasRojas: 0
    };

    return this.calcularPuntosJugador(estadisticas);
  }

  // Obtiene las reglas de puntuación
  obtenerReglas() {
    return this.reglas;
  }

  // Modifica las reglas
  modificarRegla(tipo, valor) {
    if (this.reglas[tipo] !== undefined) {
      this.reglas[tipo] = valor;
      return { exito: true, mensaje: "Regla modificada" };
    }
    return { exito: false, mensaje: "Regla no existe" };
  }
}