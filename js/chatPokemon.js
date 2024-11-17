
const textarea = document.querySelector('.message-input');

// Calcula a altura de 8 linhas baseado na altura da linha atual
const maxHeight = parseInt(getComputedStyle(textarea).lineHeight, 10) * 8;


textarea.addEventListener('input', function () {
  this.style.height = 'auto'; // Reseta a altura para recalcular corretamente
  const newHeight = this.scrollHeight;

  if (newHeight > maxHeight) {
    this.style.height = `${maxHeight}px`; // Fixa na altura máxima
    this.style.overflowY = 'scroll'; // Adiciona barra de rolagem vertical
  } else {
    this.style.height = `${newHeight}px`; // Ajusta a altura dinamicamente
    this.style.overflowY = 'hidden'; // Remove a barra de rolagem se altura estiver dentro do limite
  }
});
