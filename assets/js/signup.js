document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signupForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Validar campos
    if (!username || !email || !password) {
      alert("Por favor, completá todos los campos.");
      return;
    }

    // Obtener usuarios existentes o crear lista vacía
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Verificar si ya existe el email
    const exists = users.some(user => user.email === email);// some devuelve true si al menos un elemento cumple la condición
    if (exists) {
      alert("Ya existe un usuario con este correo electrónico.");
      return;
    }

    // Agregar nuevo usuario
    users.push({ username, email, password });
    localStorage.setItem("users", JSON.stringify(users));// setItem guarda en localStorage y JSON.stringify convierte el array en string

    alert("Registro exitoso ✅");
    form.reset();// reset limpia el formulario
    window.location.href = "login.html";
  });
});
