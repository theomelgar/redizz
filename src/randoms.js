
function getRandomSize() {
  return Math.floor(Math.random() * 156) + 15; // Generates random sizes between 5 and 50
}

function getRandomColor() {
  return `hsl(${Math.random() * 360}, 70%, 60%)`; // Generates random HSL colors
}

function getRandomGradient() {
  const angle = Math.floor(Math.random() * 361); // Random gradient angle
  const color1 = getRandomColor();
  const color2 = getRandomColor();
  return `linear-gradient(${angle}deg, ${color1}, ${color2})`; // Generates linear gradient
}

export {getRandomColor, getRandomGradient, getRandomSize}