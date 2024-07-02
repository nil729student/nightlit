const getRandomNeonColor = () => {
  const colors = ['#FF00FF', '#00FFFF', '#00FF00', '#FFFF00', '#FF0000', '#0000FF'];
  return colors[Math.floor(Math.random() * colors.length)];
};


export const generateDiscoMosaicBackground = () => {
  const color1 = getRandomNeonColor();
  const color2 = getRandomNeonColor();
  const color3 = getRandomNeonColor();
  return `repeating-linear-gradient(
      45deg,
      ${color1},
      ${color1} 10px,
      ${color2} 10px,
      ${color2} 20px,
      ${color3} 20px,
      ${color3} 30px
  )`;
};