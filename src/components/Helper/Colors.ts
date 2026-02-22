export function randomColor() {
  return Math.floor(Math.random() * 256).toString(16);
}

export function randomColorHEX() {
  return `#${(Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6)}`;
}
