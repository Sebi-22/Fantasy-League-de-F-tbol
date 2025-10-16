function iniciarJuego() {
  const userNameEl = document.getElementById("userName");
  const userPointsEl = document.getElementById("userPoints");
  const userRankEl = document.getElementById("userRank");
  const activePlayersEl = document.getElementById("activePlayers");
  
  // Crea el botón de logout dinámicamente
  let logoutBtn = document.getElementById("logoutBtn");
  if (!logoutBtn) {
    logoutBtn = document.createElement("button");
    logoutBtn.id = "logoutBtn";
    logoutBtn.textContent = "Cerrar sesión";
    logoutBtn.className = "btn btn-danger btn-sm ms-3";
    let navbarNav = document.querySelector(".navbar-nav");
    if (navbarNav) {
      navbarNav.parentElement.appendChild(logoutBtn);
    }
  }

  // Obtiene la ruta base según dónde esté la página
  function obtenerRutaBase() {
    let ruta = window.location.pathname;
    if (ruta.indexOf("/paginas/") !== -1) {
      return "../";
    } else {
      return "./";
    }
  }

  // Lee el usuario guardado del navegador
  let datosUsuario = localStorage.getItem("loggedUser");
  let usuario = null;

  if (datosUsuario) {
    // Divide el texto guardado por |
    let partes = [];
    let parteActual = "";
    for (let i = 0; i < datosUsuario.length; i++) {
      if (datosUsuario[i] === "|") {
        partes.push(parteActual);
        parteActual = "";
      } else {
        parteActual = parteActual + datosUsuario[i];
      }
    }
    if (parteActual !== "") {
      partes.push(parteActual);
    }

    // Si tiene las 3 partes, crea el objeto usuario
    if (partes.length === 3) {
      usuario = {
        usuario: partes[0],
        email: partes[1],
        contrasena: partes[2]
      };
    }
  }

  // Si no hay usuario, redirige al login
  if (!usuario) {
    alert("Por favor, iniciá sesión para acceder al juego");
    window.location.href = obtenerRutaBase() + "paginas/login.html";
    return;
  }

  // Muestra el nombre del usuario
  userNameEl.textContent = usuario.usuario;

  // Genera números aleatorios para las estadísticas
  function numeroAleatorio(minimo, maximo) {
    return Math.floor(Math.random() * (maximo - minimo + 1)) + minimo;
  }

  const puntos = numeroAleatorio(1, 500);
  const ranking = numeroAleatorio(1, 100);
  const jugadoresActivos = numeroAleatorio(1, 11);

  // Guarda las estadísticas en el navegador
  let estadisticasTexto = puntos + "|" + ranking + "|" + jugadoresActivos;
  localStorage.setItem("userStats", estadisticasTexto);

  // Anima el conteo de números
  function animarNumero(elemento, inicio, fin, duracion, prefijo, sufijo) {
    prefijo = prefijo || "";
    sufijo = sufijo || "";

    const diferencia = fin - inicio;
    const pasos = Math.abs(diferencia);
    const tiempoEntreParsos = duracion / pasos;
    let numeroActual = inicio;

    let intervalo = setInterval(function() {
      if (numeroActual < fin) {
        numeroActual = numeroActual + 1;
      } else if (numeroActual > fin) {
        numeroActual = numeroActual - 1;
      }

      elemento.textContent = prefijo + numeroActual + sufijo;

      if (numeroActual === fin) {
        clearInterval(intervalo);
      }
    }, tiempoEntreParsos);
  }

  // Anima las estadísticas
  animarNumero(userPointsEl, 0, puntos, 1500, "", "");
  animarNumero(userRankEl, 100, ranking, 1000, "#", "");
  animarNumero(activePlayersEl, 0, jugadoresActivos, 1200, "", "");

  // Botón para cerrar sesión
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function() {
      localStorage.removeItem("loggedUser");
      alert("Sesión cerrada correctamente");
      window.location.href = obtenerRutaBase() + "index.html";
    });
  }
}

// Ejecuta cuando la página carga
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", iniciarJuego);
} else {
  iniciarJuego();
}