document.addEventListener("DOMContentLoaded", () => {
  const userNameEl = document.getElementById("userName");
  const userPointsEl = document.getElementById("userPoints");
  const userRankEl = document.getElementById("userRank");
  const activePlayersEl = document.getElementById("activePlayers");
  const logoutBtn = document.getElementById("logoutBtn");

  // 🧭 Detectar ruta base automáticamente
  function getBasePath() {
    // Si estamos dentro de /paginas/, subir un nivel
    if (window.location.pathname.includes("/paginas/")) {
      return "../";
    } else {
      return "./";
    }
  }

  // 🔐 Verificar si el usuario está logueado
  const user = JSON.parse(localStorage.getItem("loggedUser"));
  if (!user) {
    alert("Por favor, iniciá sesión para acceder al juego ⚽");
    window.location.href = getBasePath() + "paginas/login.html";
    return;
  }

  // 🧍 Mostrar nombre del usuario
  userNameEl.textContent = user.username;

  // 🎮 Simular datos dinámicos del juego
  const points = Math.floor(Math.random() * 500);
  const rank = Math.floor(Math.random() * 100) + 1;
  const activePlayers = Math.floor(Math.random() * 11) + 1;

  // Guardar progreso simulado
  localStorage.setItem("userStats", JSON.stringify({ points, rank, activePlayers }));

  // ✨ Animar conteo numérico
  function animateValue(element, start, end, duration, prefix = "", suffix = "") {
    const range = end - start;
    const stepTime = Math.max(Math.floor(duration / range), 20);
    let current = start;
    const increment = end > start ? 1 : -1;

    const timer = setInterval(() => {
      current += increment;
      element.textContent = prefix + current + suffix;
      if (current === end) clearInterval(timer);
    }, stepTime);
  }

  // ⏫ Animar estadísticas
  animateValue(userPointsEl, 0, points, 1500);
  animateValue(userRankEl, 100, rank, 1000, "#");
  animateValue(activePlayersEl, 0, activePlayers, 1200);

  // 🚪 Logout
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedUser");
    alert("Sesión cerrada correctamente 👋");
    window.location.href = getBasePath() + "index.html";
  });
});
