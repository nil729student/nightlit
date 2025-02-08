function createParticles() {
    const container = document.querySelector('.particles-container');
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Assignem un color aleatori (que no canviarà durant l'animació)
      const color = colors[Math.floor(Math.random() * colors.length)];
      particle.style.backgroundColor = color;
      
      // Tamany aleatori entre 5 i 15px
      const size = Math.random() * 10 + 5;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Posició inicial aleatòria
      setParticlePosition(particle);
      
      // Animació amb durada i delay aleatoris (per variar l'inici de cada partícula)
      const duration = Math.random() * 2 + 5; // entre 5s i 7s
      const delay = Math.random() * 2; // entre 0s i 2s
      particle.style.animationDuration = `${duration}s`;
      particle.style.animationDelay = `${delay}s`;
      
      // Afegim un event listener per canviar la posició i altres propietats al final de cada iteració
      particle.addEventListener('animationiteration', () => {
        // Quan acaba la iteració (la partícula ha desaparegut), la reposicionem
        setParticlePosition(particle);
        // Opcional: també podem modificar la durada o altres paràmetres si volem més variació
        particle.style.animationDuration = `${Math.random() * 2 + 5}s`;
        particle.style.animationDelay = `0s`; // En les iteracions posteriors, ja no es necessita delay
      });
      
      container.appendChild(particle);
    }
  }
  
  // Funció per reposicionar la partícula aleatòriament a la pantalla
  function setParticlePosition(particle) {
    particle.style.left = `${Math.random() * 100}%`;
    // Podem variar també la posició vertical per començar des de la part inferior o central
    particle.style.top = `${Math.random() * 100}%`;
  }
  
  createParticles();
  