function createBubbles() {
    const container = document.querySelector('.bubbles-container');
    const bubbleCount = 30; // Número de bombolles que volem generar
  
    for (let i = 0; i < bubbleCount; i++) {
      const bubble = document.createElement('div');
      bubble.classList.add('bubble');
      
      // Tamany aleatori entre 10px i 40px
      const size = Math.random() * 20 + 5;
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      
      // Posició horitzontal aleatòria
      bubble.style.left = `${Math.random() * 100}%`;
      
      // Durada de l'animació aleatòria (entre 5 i 15 segons)
      const duration = Math.random() * 10 + 5;
      bubble.style.animationDuration = `${duration}s`;
      
      // Retard inicial aleatori
      bubble.style.animationDelay = `${Math.random() * 5}s`;
      
      container.appendChild(bubble);
    }
  }
  
  createBubbles();
  