document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const recoverBtn = document.getElementById("recoverBtn");

  // 🔹 Inicio de sesión
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
      alert(`Bienvenido, ${user.username} 👋`);
      localStorage.setItem("loggedUser", JSON.stringify(user));
      window.location.href = "game.html"; // 🔥 Redirige al juego después de iniciar sesión
    } else {
      alert("Correo o contraseña incorrectos ❌");
    }
  });

  // 🔹 Recuperar contraseña (simulado)
  recoverBtn.addEventListener("click", () => {
    const recoverEmail = document.getElementById("recoverEmail").value.trim();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.email === recoverEmail);

    if (!recoverEmail) {
      alert("Por favor, ingresá tu correo electrónico.");
      return;
    }

    if (user) {
      alert(`✅ Se ha enviado un enlace de recuperación a ${recoverEmail} (simulado).`);
    } else {
      alert("❌ No se encontró ningún usuario con ese correo.");
    }

    // Cierra el modal
    const modal = bootstrap.Modal.getInstance(document.getElementById("forgotPasswordModal"));
    modal.hide();
  });
});
