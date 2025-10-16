// Espera a que la página cargue completamente
function iniciarAplicacion() {
  const form = document.getElementById("loginForm");
  const recoverBtn = document.getElementById("recoverBtn");

  // Variable global para guardar usuarios
  let usuarios = [];

  function guardarEnNavegador(datos) {
    // Convierte la lista de usuarios en texto y la guarda
    let texto = "";
    for (let i = 0; i < datos.length; i++) {
      texto = texto + datos[i].usuario + "|" + datos[i].email + "|" + datos[i].contrasena + "\n";
    }
    localStorage.setItem("users", texto);
  }

  function cargarDelNavegador() {
    // Lee los usuarios guardados y los carga en la variable
    let datosGuardados = localStorage.getItem("users");
    
    if (datosGuardados) {
      // Divide por saltos de línea manualmente
      let lineas = [];
      let lineaActual = "";
      for (let i = 0; i < datosGuardados.length; i++) {
        if (datosGuardados[i] === "\n") {
          lineas.push(lineaActual);
          lineaActual = "";
        } else {
          lineaActual = lineaActual + datosGuardados[i];
        }
      }
      if (lineaActual !== "") {
        lineas.push(lineaActual);
      }

      // Procesa cada línea
      for (let i = 0; i < lineas.length; i++) {
        if (lineas[i] !== "") {
          // Divide por | manualmente
          let partes = [];
          let parteActual = "";
          for (let j = 0; j < lineas[i].length; j++) {
            if (lineas[i][j] === "|") {
              partes.push(parteActual);
              parteActual = "";
            } else {
              parteActual = parteActual + lineas[i][j];
            }
          }
          if (parteActual !== "") {
            partes.push(parteActual);
          }

          // Si tiene las 3 partes, agrega el usuario
          if (partes.length === 3) {
            usuarios.push({
              usuario: partes[0],
              email: partes[1],
              contrasena: partes[2]
            });
          }
        }
      }
    }
  }

  // Carga los usuarios al empezar
  cargarDelNavegador();

  // INICIO DE SESIÓN
  form.addEventListener("submit", function(evento) {
    evento.returnValue = false;// Detiene el comportamiento por defecto del formulario

    const email = document.getElementById("email").value.trim();
    const contrasena = document.getElementById("password").value.trim();

    // Busca el usuario con ese email y contraseña
    let usuarioEncontrado = null;
    for (let i = 0; i < usuarios.length; i++) {
      if (usuarios[i].email === email && usuarios[i].contrasena === contrasena) {
        usuarioEncontrado = usuarios[i];
        break;
      }
    }

    if (usuarioEncontrado) {
      alert("Bienvenido, " + usuarioEncontrado.usuario + " 👋");
      
      // Guarda el usuario que inició sesión
      let usuarioTexto = usuarioEncontrado.usuario + "|" + usuarioEncontrado.email + "|" + usuarioEncontrado.contrasena;
      localStorage.setItem("loggedUser", usuarioTexto);
      
      // Redirige al juego
      setTimeout(function() {
        window.location.href = "game.html";
      }, 500);
    } else {
      alert("Correo o contraseña incorrectos ❌");
    }
  });

  // RECUPERAR CONTRASEÑA
  recoverBtn.addEventListener("click", function() {
    const recoverEmail = document.getElementById("recoverEmail").value.trim();

    if (recoverEmail === "") {
      alert("Por favor, ingresá tu correo electrónico.");
      return;
    }

    // Busca si existe el email
    let usuarioEncontrado = false;
    for (let i = 0; i < usuarios.length; i++) {
      if (usuarios[i].email === recoverEmail) {
        usuarioEncontrado = true;
        break;
      }
    }

    if (usuarioEncontrado) {
      alert("Se ha enviado un enlace de recuperación a " + recoverEmail + " (simulado).");
    } else {
      alert("No se encontró ningún usuario con ese correo.");
    }

    // Cierra el modal
    let modal = document.getElementById("forgotPasswordModal");
    modal.style.display = "none";
  });
}

// Ejecuta cuando la página carga
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", iniciarAplicacion);
} else {
  iniciarAplicacion();
}