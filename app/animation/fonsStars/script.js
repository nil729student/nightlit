// Funció per crear estrelles estàtiques
function createStars() {
  const container = document.querySelector('.stars-container');
  const starCount = 2000; // Número d'estrelles

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    
    // Posició aleatòria per tota la pantalla
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    
    // Tamany aleatori entre 1px i 3px (estrelles petites)
    const size = Math.random() * 4 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    
    // Per tenir un parpelleig desfasat
    star.style.animationDelay = `${Math.random() * 3}s`;
    
    container.appendChild(star);
  }
}

// Funció per crear un estel fugaz
function createShootingStar() {
  const container = document.querySelector('.stars-container');
  const shootingStar = document.createElement('div');
  shootingStar.classList.add('shooting-star');
  
  // Posiciona l'estel fugaz a una zona aleatòria de cualsavol lloc de la pantalla
  shootingStar.style.top = `${Math.random() * 100}%`;
  shootingStar.style.left = `${Math.random() * 100}%`;



  
  // Assigna un retard aleatori per variar els moments d'aparició
  shootingStar.style.animationDelay = `${Math.random() * 10}s`;
  
  container.appendChild(shootingStar);
  
  // Esborra l'estel fugaz un cop acaba la seva animació (2 segons)
  setTimeout(() => {
    shootingStar.remove();
  }, 2000);
}

// Inicialització: crea les estrelles estàtiques i genera periòdicament estels fugaces
export function init() {
  createStars();
  // Cada 3 segons s'intenta crear un estel fugaz
  setInterval(createShootingStar, 3000);
}


