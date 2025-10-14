document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signupForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || !email || !password) {
      alert("Por favor, completá todos los campos.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.some(user => user.email === email);
    if (exists) {
      alert("Ya existe un usuario con este correo electrónico.");
      return;
    }

    users.push({ username, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registro exitoso ✅");
    form.reset();
    window.location.href = "login.html";
  });
});
