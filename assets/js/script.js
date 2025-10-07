document.addEventListener("DOMContentLoaded", async () => {
  const preloader = document.getElementById("preloader");

  // Simulamos carga asíncrona (por ejemplo, datos o imágenes)
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Transición para ocultar el preloader
  preloader.style.opacity = "0";
  preloader.style.transition = "opacity 0.5s ease";
  
  setTimeout(() => {
    preloader.style.display = "none";
  }, 500);
});
