function iniciarEquipo() {
  // Elementos del DOM
  const alertaNoEquipo = document.getElementById("alertaNoEquipo");
  const estadisticasEquipo = document.getElementById("estadisticasEquipo");
  const cancha = document.getElementById("cancha");
  const listaDetallada = document.getElementById("listaDetallada");
  const botonesAccion = document.getElementById("botonesAccion");
  
  const delanteros = document.getElementById("delanteros");
  const mediocampistas = document.getElementById("mediocampistas");
  const defensas = document.getElementById("defensas");
  const arquero = document.getElementById("arquero");
  
  const tablaJugadores = document.getElementById("tablaJugadores");
  const logoutBtn = document.getElementById("logoutBtn");
  
  // Botones de acción
  const btnSimularPartido = document.getElementById("btnSimularPartido");
  const btnEditarEquipo = document.getElementById("btnEditarEquipo");
  const btnEliminarEquipo = document.getElementById("btnEliminarEquipo");

  // Cargar equipo desde localStorage
  function cargarEquipo() {
    const equipoGuardado = localStorage.getItem("miEquipo");
    
    if (!equipoGuardado) {
      mostrarAlertaNoEquipo();
      return null;
    }

    // Manejo básico de errores
    try {
      const equipoData = JSON.parse(equipoGuardado);
      return equipoData;
    } catch (error) {
      console.error("Error al cargar equipo:", error);
      mostrarAlertaNoEquipo();
      return null;
    }
  }

  // Mostrar alerta de equipo vacío
  function mostrarAlertaNoEquipo() {
    alertaNoEquipo.classList.remove("d-none");
    estadisticasEquipo.classList.add("d-none");
    cancha.classList.add("d-none");
    listaDetallada.classList.add("d-none");
    botonesAccion.classList.add("d-none");
  }

  // Mostrar equipo completo
  function mostrarEquipo(equipoData) {
    // Ocultar alerta y mostrar contenido
    alertaNoEquipo.classList.add("d-none");
    estadisticasEquipo.classList.remove("d-none");
    cancha.classList.remove("d-none");
    listaDetallada.classList.remove("d-none");
    botonesAccion.classList.remove("d-none");

    // Actualizar estadísticas
    actualizarEstadisticas(equipoData);

    // Mostrar jugadores en la cancha
    mostrarJugadoresEnCancha(equipoData.jugadores);

    // Mostrar tabla detallada
    mostrarTablaDetallada(equipoData.jugadores);
  }

  // Actualizar estadísticas del equipo
  function actualizarEstadisticas(equipoData) {
    const totalJugadores = equipoData.cantidad || equipoData.jugadores.length;
    const presupuestoUsado = 100 - equipoData.presupuestoRestante;
    const puntosTotal = equipoData.puntosTotal || 0;
    
    let valorPromedio = 0;
    if (totalJugadores > 0) {
      valorPromedio = (presupuestoUsado / totalJugadores).toFixed(1);
    }

    document.getElementById("totalJugadores").textContent = totalJugadores;
    document.getElementById("presupuestoUsado").textContent = "$" + presupuestoUsado + "M";
    document.getElementById("puntosEquipo").textContent = puntosTotal;
    document.getElementById("valorPromedio").textContent = "$" + valorPromedio + "M";
  }

  // Crear tarjeta de jugador
  function crearTarjetaJugador(jugador) {
    const div = document.createElement("div");
    div.className = "text-center";
    div.style.width = "100px";
    
    div.innerHTML = `
      <div class="card bg-dark border-light shadow" style="width: 100px;">
        <div class="card-body p-2">
          <div class="rounded-circle bg-secondary mx-auto mb-2" style="width: 50px; height: 50px; display: flex; align-items: center; justify-content: center;">
            <span class="fw-bold text-light">${jugador.nombre.split(' ')[0].substring(0, 3).toUpperCase()}</span>
          </div>
          <h6 class="small mb-1 text-truncate" title="${jugador.nombre}">${jugador.nombre}</h6>
          <small class="text-muted d-block">$${jugador.precio}M</small>
          <small class="badge bg-success mt-1">${jugador.puntos || 0} pts</small>
        </div>
      </div>
    `;
    
    return div;
  }

  // Mostrar jugadores en la cancha
  function mostrarJugadoresEnCancha(jugadores) {
    // Limpiar posiciones
    delanteros.innerHTML = "";
    mediocampistas.innerHTML = "";
    defensas.innerHTML = "";
    arquero.innerHTML = "";

    // Clasificar jugadores por posición
    for (let i = 0; i < jugadores.length; i++) {
      const jugador = jugadores[i];
      const tarjeta = crearTarjetaJugador(jugador);

      if (jugador.posicion === "delantero") {
        delanteros.appendChild(tarjeta);
      } else if (jugador.posicion === "mediocampista") {
        mediocampistas.appendChild(tarjeta);
      } else if (jugador.posicion === "defensa") {
        defensas.appendChild(tarjeta);
      } else if (jugador.posicion === "arquero") {
        arquero.appendChild(tarjeta);
      }
    }
  }

  // Mostrar tabla detallada
  function mostrarTablaDetallada(jugadores) {
    tablaJugadores.innerHTML = "";

    // Ordenar por posición usando bubble sort
    const orden = { "arquero": 1, "defensa": 2, "mediocampista": 3, "delantero": 4 };
    for (let i = 0; i < jugadores.length - 1; i++) {
      for (let j = 0; j < jugadores.length - 1 - i; j++) {
        if (orden[jugadores[j].posicion] > orden[jugadores[j + 1].posicion]) {
          // Intercambiar jugadores
          const temp = jugadores[j];
          jugadores[j] = jugadores[j + 1];
          jugadores[j + 1] = temp;
        }
      }
    }

    for (let i = 0; i < jugadores.length; i++) {
      const jugador = jugadores[i];
      const fila = document.createElement("tr");
      
      fila.innerHTML = `
        <td>${jugador.nombre}</td>
        <td><span class="badge bg-primary">${jugador.posicion}</span></td>
        <td>${jugador.equipo}</td>
        <td>$${jugador.precio}M</td>
        <td><span class="badge bg-success">${jugador.puntos || 0}</span></td>
      `;
      
      tablaJugadores.appendChild(fila);
    }
  }

  // Simular partido (generar puntos aleatorios)
  btnSimularPartido.addEventListener("click", function() {
    const equipoData = cargarEquipo();
    if (!equipoData) return;

    const sistemaPuntos = new SistemaPuntos();
    let puntosTotal = 0;

    // Generar puntos aleatorios para cada jugador
    for (let i = 0; i < equipoData.jugadores.length; i++) {
      const jugador = equipoData.jugadores[i];
      const puntosPartido = sistemaPuntos.simularPuntosAleatorios(jugador.posicion);
      
      jugador.puntos = (jugador.puntos || 0) + puntosPartido;
      puntosTotal += puntosPartido;
    }

    // Actualizar puntos totales
    equipoData.puntosTotal = (equipoData.puntosTotal || 0) + puntosTotal;

    // Guardar en localStorage
    localStorage.setItem("miEquipo", JSON.stringify(equipoData));

    // Actualizar vista
    mostrarEquipo(equipoData);

    // Mostrar alerta
    alert(`🎉 ¡Partido simulado!\n\nPuntos obtenidos: ${puntosTotal.toFixed(1)}\nTotal acumulado: ${equipoData.puntosTotal.toFixed(1)}`);
  });

  // Editar equipo
  btnEditarEquipo.addEventListener("click", function() {
    window.location.href = "/paginas/seleccion.html";
  });

  // Eliminar equipo
  btnEliminarEquipo.addEventListener("click", function() {
    if (confirm("⚠️ ¿Estás seguro de que querés eliminar tu equipo?\n\nEsta acción no se puede deshacer.")) {
      localStorage.removeItem("miEquipo");
      alert("Equipo eliminado correctamente");
      
      // En lugar de location.reload(), ocultar y mostrar elementos
      mostrarAlertaNoEquipo();
    }
  });

  // Logout
  logoutBtn.addEventListener("click", function() {
    localStorage.removeItem("loggedUser");
    alert("Sesión cerrada");
    window.location.href = "/index.html";
  });

  // Inicializar
  const equipoData = cargarEquipo();
  if (equipoData && equipoData.jugadores && equipoData.jugadores.length > 0) {
    mostrarEquipo(equipoData);
  }
}

// Ejecutar cuando carga la página
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", iniciarEquipo);
} else {
  iniciarEquipo();
}
