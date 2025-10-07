// Animación secuencial usando asincronismo
async function revealElementsSequentially() {
  const elements = document.querySelectorAll('.fade-slide');

  for (const el of elements) {
    await new Promise(resolve => setTimeout(resolve, 300)); // delay entre cada elemento
    el.classList.add('visible');
  }
}

// Inicia cuando carga el DOM
document.addEventListener('DOMContentLoaded', async () => {
  await revealElementsSequentially();
});
