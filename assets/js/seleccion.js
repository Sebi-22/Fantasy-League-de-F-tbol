function iniciarSeleccion() {
  // Base de datos de jugadores ficticios
  let basejugadores = [
    // Arqueros
    { id: 1, nombre: "Dibu Martinez", posicion: "arquero", equipo: "Argentina", precio: 8 },
    { id: 2, nombre: "Armani", posicion: "arquero", equipo: "Argentina", precio: 6 },
    
    // Defensas
    { id: 3, nombre: "Romero", posicion: "defensa", equipo: "Argentina", precio: 10 },
    { id: 4, nombre: "Otamendi", posicion: "defensa", equipo: "Argentina", precio: 7 },
    { id: 5, nombre: "Tagliafico", posicion: "defensa", equipo: "Argentina", precio: 8 },
    { id: 6, nombre: "Molina", posicion: "defensa", equipo: "Argentina", precio: 7 },
    { id: 7, nombre: "Medel", posicion: "defensa", equipo: "Chile", precio: 5 },
    
    // Mediocampistas
    { id: 8, nombre: "De Paul", posicion: "mediocampista", equipo: "Argentina", precio: 9 },
    { id: 9, nombre: "Paredes", posicion: "mediocampista", equipo: "Argentina", precio: 8 },
    { id: 10, nombre: "Lo Celso", posicion: "mediocampista", equipo: "Argentina", precio: 7 },
    { id: 11, nombre: "Enzo Fernandez", posicion: "mediocampista", equipo: "Argentina", precio: 10 },
    
    // Delanteros
    { id: 12, nombre: "Messi", posicion: "delantero", equipo: "Argentina", precio: 15 },
    { id: 13, nombre: "Vinicius Jr", posicion: "delantero", equipo: "Brasil", precio: 12 },
    { id: 14, nombre: "Neymar", posicion: "delantero", equipo: "Brasil", precio: 11 }
  ];

  // Elementos del HTML
  const tablaJugadores = document.getElementById("tablaJugadores");
  const filtroposicion = document.getElementById("filtroposicion");
  const filtroEquipo = document.getElementById("filtroEquipo");
  const presupuestoDisponible = document.getElementById("presupuestoDisponible");
  const cantidadJugadores = document.getElementById("cantidadJugadores");
  const listaJugadoresSeleccionados = document.getElementById("listaJugadoresSeleccionados");
  const btnGuardarEquipo = document.getElementById("btnGuardarEquipo");
  const btnLimpiar = document.getElementById("btnLimpiar");
  const logoutBtn = document.getElementById("logoutBtn");

  // Crear equipo del usuario
  let miEquipo = new EquipoUsuario("Mi Equipo Fantasy", "usuario123");

  // Llenar selector de equipos
  function llenarSelectorEquipos() {
    let equipos = [];
    for (let i = 0; i < basejugadores.length; i++) {
      let equipo = basejugadores[i].equipo;
      let existe = false;
      for (let j = 0; j < equipos.length; j++) {
        if (equipos[j] === equipo) {
          existe = true;
          break;
        }
      }
      if (!existe) {
        equipos.push(equipo);
      }
    }

    for (let i = 0; i < equipos.length; i++) {
      let option = document.createElement("option");
      option.value = equipos[i];
      option.textContent = equipos[i];
      filtroEquipo.appendChild(option);
    }
  }

  // Mostrar jugadores en la tabla
  function mostrarJugadores(jugadores) {
    tablaJugadores.innerHTML = "";

    for (let i = 0; i < jugadores.length; i++) {
      let jugador = jugadores[i];
      let fila = document.createElement("tr");

      fila.innerHTML = `
        <td>${jugador.nombre}</td>
        <td><span class="badge bg-primary">${jugador.posicion}</span></td>
        <td>${jugador.equipo}</td>
        <td>$${jugador.precio}M</td>
        <td>
          <button class="btn btn-sm btn-success btn-agregar" data-id="${jugador.id}">
            +
          </button>
        </td>
      `;

      tablaJugadores.appendChild(fila);
    }

    // Agregar eventos a los botones
    let botonesAgregar = document.querySelectorAll(".btn-agregar");
    for (let i = 0; i < botonesAgregar.length; i++) {
      botonesAgregar[i].addEventListener("click", function(evento) {
        let idJugador = evento.target.getAttribute("data-id");
        agregarJugador(idJugador);
      });
    }
  }

  // Filtrar jugadores
  function filtrarJugadores() {
    let posicion = filtroposicion.value;
    let equipo = filtroEquipo.value;
    let resultados = [];

    for (let i = 0; i < basejugadores.length; i++) {
      let jugador = basejugadores[i];
      let coincidePosicion = posicion === "" || jugador.posicion === posicion;
      let coincideEquipo = equipo === "" || jugador.equipo === equipo;

      if (coincidePosicion && coincideEquipo) {
        resultados.push(jugador);
      }
    }

    mostrarJugadores(resultados);
  }

  // Agregar jugador al equipo
  function agregarJugador(idJugador) {
    // Buscar el jugador en la base de datos
    let jugadorEncontrado = null;
    for (let i = 0; i < basejugadores.length; i++) {
      if (basejugadores[i].id == idJugador) {
        jugadorEncontrado = basejugadores[i];
        break;
      }
    }

    if (!jugadorEncontrado) {
      alert("Jugador no encontrado");
      return;
    }

    // Crear objeto Jugador
    let nuevoJugador = new Jugador(
      jugadorEncontrado.id,
      jugadorEncontrado.nombre,
      jugadorEncontrado.posicion,
      jugadorEncontrado.equipo,
      jugadorEncontrado.precio
    );

    // Agregar al equipo
    let resultado = miEquipo.agregarJugador(nuevoJugador);

    if (resultado.exito) {
      alert(resultado.mensaje);
      actualizarInterfaz();
    } else {
      alert("Error: " + resultado.mensaje);
    }
  }

  // Eliminar jugador del equipo
  function eliminarJugador(idJugador) {
    let resultado = miEquipo.eliminarJugador(idJugador);
    if (resultado.exito) {
      actualizarInterfaz();
    } else {
      alert("Error: " + resultado.mensaje);
    }
  }

  // Actualizar interfaz
  function actualizarInterfaz() {
    // Presupuesto
    presupuestoDisponible.textContent = miEquipo.presupuesto;

    // Cantidad de jugadores
    cantidadJugadores.textContent = miEquipo.jugadores.length;

    // Conteo por posición
    let conteoArqueros = 0;
    let conteoDefensas = 0;
    let conteoMediocampistas = 0;
    let conteoDelanteros = 0;

    for (let i = 0; i < miEquipo.jugadores.length; i++) {
      let posicion = miEquipo.jugadores[i].posicion;
      if (posicion === "arquero") conteoArqueros++;
      else if (posicion === "defensa") conteoDefensas++;
      else if (posicion === "mediocampista") conteoMediocampistas++;
      else if (posicion === "delantero") conteoDelanteros++;
    }

    document.getElementById("conteoArqueros").textContent = conteoArqueros;
    document.getElementById("conteoDefensas").textContent = conteoDefensas;
    document.getElementById("conteoMediocampistas").textContent = conteoMediocampistas;
    document.getElementById("conteoDelanteros").textContent = conteoDelanteros;

    // Lista de jugadores seleccionados
    if (miEquipo.jugadores.length === 0) {
      listaJugadoresSeleccionados.innerHTML = '<p class="text-muted">Sin jugadores aún</p>';
    } else {
      let html = '<ul class="list-unstyled">';
      for (let i = 0; i < miEquipo.jugadores.length; i++) {
        let jugador = miEquipo.jugadores[i];
        html += `
          <li class="mb-2 d-flex justify-content-between align-items-center">
            <span>${jugador.nombre} <small class="text-muted">($${jugador.precio}M)</small></span>
            <button class="btn btn-sm btn-danger btn-eliminar" data-id="${jugador.id}">×</button>
          </li>
        `;
      }
      html += '</ul>';
      listaJugadoresSeleccionados.innerHTML = html;

      // Agregar eventos a botones de eliminar
      let botonesEliminar = document.querySelectorAll(".btn-eliminar");
      for (let i = 0; i < botonesEliminar.length; i++) {
        botonesEliminar[i].addEventListener("click", function(evento) {
          let idJugador = evento.target.getAttribute("data-id");
          eliminarJugador(idJugador);
        });
      }
    }

    // Habilitar botón de guardar si el equipo está completo
    if (miEquipo.jugadores.length === 11) {
      btnGuardarEquipo.disabled = false;
    } else {
      btnGuardarEquipo.disabled = true;
    }
  }

  // Guardar equipo
  btnGuardarEquipo.addEventListener("click", function() {
    let equipoInfo = miEquipo.obtenerInfo();
    let datosEquipo = JSON.stringify(equipoInfo);
    localStorage.setItem("miEquipo", datosEquipo);
    alert("Equipo guardado correctamente!");
    setTimeout(function() {
      window.location.href = "/paginas/equipo.html";
    }, 500);
  });

  // Limpiar todo
  btnLimpiar.addEventListener("click", function() {
    if (confirm("¿Estás seguro de que querés limpiar el equipo?")) {
      miEquipo = new EquipoUsuario("Mi Equipo Fantasy", "usuario123");
      actualizarInterfaz();
    }
  });

  // Logout
  logoutBtn.addEventListener("click", function() {
    localStorage.removeItem("loggedUser");
    alert("Sesión cerrada");
    window.location.href = "/index.html";
  });

  // Eventos de filtros
  filtroposicion.addEventListener("change", filtrarJugadores);
  filtroEquipo.addEventListener("change", filtrarJugadores);

  // Inicializar
  llenarSelectorEquipos();
  mostrarJugadores(basejugadores);
  actualizarInterfaz();
}

// Ejecutar cuando carga la página
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", iniciarSeleccion);
} else {
  iniciarSeleccion();
}