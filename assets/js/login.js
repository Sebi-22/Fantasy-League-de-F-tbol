document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Obtener usuarios registrados
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Buscar coincidencia
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
      alert(`Bienvenido, ${user.username} 👋`);
      localStorage.setItem("loggedUser", JSON.stringify(user));
      window.location.href = "index.html"; // Redirige al inicio o dashboard
    } else {
      alert("Correo o contraseña incorrectos ❌");
    }
  });
});
