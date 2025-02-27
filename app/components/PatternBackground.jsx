import React from 'react';
import getRandomColor from "../utils/ColorGenerator.js";

function generatePattern() {
  const shapes = ['circle', 'square', 'triangle'];
  const shape = shapes[Math.floor(Math.random() * shapes.length)];
  const color = getRandomColor();
  const size = Math.floor(Math.random() * 50) + 10;

  switch (shape) {
    case 'circle':
      return {
        backgroundColor: color,
        borderRadius: '50%',
        width: `${size}px`,
        height: `${size}px`,
      };
    case 'triangle':
      return {
        width: 0,
        height: 0,
        borderLeft: `${size / 2}px solid transparent`,
        borderRight: `${size / 2}px solid transparent`,
        borderBottom: `${size}px solid ${color}`,
        backgroundColor: 'transparent',
      };
    case 'square':
    default:
      return {
        backgroundColor: color,
        width: `${size}px`,
        height: `${size}px`,
      };
  }
}

function PatternBackground() {
  const patternStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(10, 1fr)',
    gridTemplateRows: 'repeat(10, 1fr)',
    gap: '5px',
  };

  const patterns = Array.from({ length: 100 }).map((_, index) => (
    <div key={index} style={generatePattern()} />
  ));

  return <div style={patternStyle}>{patterns}</div>;
}

export default PatternBackground;
