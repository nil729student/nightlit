// ColorGenerator.js
const getRandomNeonColor = () => {
  const colors = ['#FF00FF', '#00FFFF', '#00FF00', '#FFFF00', '#FF0000', '#0000FF'];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const generateDiscoMosaicBackground = () => {
  // Seleccionamos tres colores aleatorios para el degradado.
  const color1 = getRandomNeonColor();
  const color2 = getRandomNeonColor();
  const color3 = getRandomNeonColor();

  // Retornamos un objeto de estilos que incluye un degradado animado y un sutil parpadeo neon.
  return {
    background: `linear-gradient(45deg, ${color1}, ${color2}, ${color3})`,
    backgroundSize: '300% 300%',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    padding: '16px',
    margin: '16px',
    animation: 'gradientShift 8s ease infinite, neonFlicker 2s ease-in-out infinite'
  };
};
