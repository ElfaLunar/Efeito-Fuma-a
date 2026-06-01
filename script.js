// script.js
const smoky = document.getElementById("smoky");
const letters = smoky.querySelectorAll("li");

// Ordem de volta desejada: y, k, o, m, s
// Índices: S(0), m(1), o(2), k(3), y(4)
const resetOrder = [4, 3, 2, 1, 0]; // y, k, o, m, S

let activeTimeouts = [];   // Timeouts para ativação (mouseenter)
let resetTimeouts = [];     // Timeouts para reset na ordem correta (mouseleave)

// Cancela todos os timeouts de ativação pendentes
function clearActiveTimeouts() {
  activeTimeouts.forEach(timeout => clearTimeout(timeout));
  activeTimeouts = [];
}

// Cancela todos os timeouts de reset pendentes
function clearResetTimeouts() {
  resetTimeouts.forEach(timeout => clearTimeout(timeout));
  resetTimeouts = [];
}

// Aplica efeito "sumir" em todas as letras, uma por uma (S, m, o, k, y)
function applySmokeEffect() {
  clearResetTimeouts(); // Cancela qualquer retorno pendente
  letters.forEach((letter, index) => {
    const timeout = setTimeout(() => {
      letter.classList.add("active");
    }, index * 300);
    activeTimeouts.push(timeout);
  });
}

// Remove o efeito "fumaça" na ordem específica: y, k, o, m, S
function resetInOrder() {
  clearActiveTimeouts(); // Cancela qualquer ativação pendente
  
  resetOrder.forEach((index, position) => {
    const timeout = setTimeout(() => {
      letters[index].classList.remove("active");
    }, position * 300);
    resetTimeouts.push(timeout);
  });
}

// Evento: mouse entra -> todas somem (S, m, o, k, y)
smoky.addEventListener("mouseenter", () => {
  applySmokeEffect();
});

// Evento: mouse sai -> letras voltam na ordem: y, k, o, m, S
smoky.addEventListener("mouseleave", () => {
  resetInOrder();
});
