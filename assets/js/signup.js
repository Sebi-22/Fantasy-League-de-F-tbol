    const form = document.getElementById("formularioRegistro");
    const inputUsuario = document.getElementById("usuario");
    const inputEmail = document.getElementById("mail");
    const inputContrasena = document.getElementById("contrasena");
    const inputConfirmar = document.getElementById("confirmar");

    // Variable global para guardar usuarios
    let usuarios = [];

    function validarEmail(email) {
      // Busca el @ en el email
      let posicionArroba = -1;
      for (let i = 0; i < email.length; i++) {
        if (email[i] === "@") {
          posicionArroba = i;
          break;
        }
      }

      // Busca el . después del @
      let posicionPunto = -1;
      for (let i = posicionArroba + 1; i < email.length; i++) {
        if (email[i] === ".") {
          posicionPunto = i;
        }
      }

      // Valida que tenga @ y . en el orden correcto
      if (posicionArroba > 0 && posicionPunto > posicionArroba) {
        return true;
      }
      return false;
    }

    function mostrarError(elemento, mensaje) {
      elemento.textContent = mensaje;
      elemento.classList.remove("d-none");
    }

    function limpiarError(elemento) {
      elemento.textContent = "";
      elemento.classList.add("d-none");
    }

    function guardarEnNavegador() {
      // Convierte la lista de usuarios en texto y la guarda
      let texto = "";
      for (let i = 0; i < usuarios.length; i++) {
        texto = texto + usuarios[i].usuario + "|" + usuarios[i].email + "|" + usuarios[i].contrasena + "\n";
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

    form.addEventListener("submit", function(evento) {
      // Detiene el comportamiento por defecto del formulario
      evento.returnValue = false;

      const usuario = inputUsuario.value.trim();//trim quita espacios al inicio y final
      const email = inputEmail.value.trim();
      const contrasena = inputContrasena.value;
      const confirmar = inputConfirmar.value;

      limpiarError(document.getElementById("errorUsuario"));
      limpiarError(document.getElementById("errorEmail"));
      limpiarError(document.getElementById("errorContrasena"));
      limpiarError(document.getElementById("errorConfirmar"));

      let errores = false;

      if (!usuario) {
        mostrarError(document.getElementById("errorUsuario"), "Completá el usuario");
        errores = true;
      }

      if (!email) {
        mostrarError(document.getElementById("errorEmail"), "Completá el email");
        errores = true;
      } else if (!validarEmail(email)) {
        mostrarError(document.getElementById("errorEmail"), "Email inválido");
        errores = true;
      }

      if (!contrasena) {
        mostrarError(document.getElementById("errorContrasena"), "Completá la contraseña");
        errores = true;
      }

      if (contrasena !== confirmar) {
        mostrarError(document.getElementById("errorConfirmar"), "Las contraseñas no coinciden");
        errores = true;
      }

      if (errores) return;

      // Verifica si el email ya existe
      let emailRepetido = false;
      for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].email === email) {
          emailRepetido = true;
          break;
        }
      }

      if (emailRepetido) {
        mostrarError(document.getElementById("errorEmail"), "Este email ya está registrado");
        return;
      }

      // Agrega el nuevo usuario
      usuarios.push({ usuario, email, contrasena });
      
      // Guarda en el navegador
      guardarEnNavegador();

      alert("Registro exitoso ✅");
      form.reset();
      setTimeout(function() {
        window.location.href = "login.html";
      }, 500);
    });