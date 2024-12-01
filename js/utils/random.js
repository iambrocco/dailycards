export function random(min, max) {
  return Math.random() * (max - min + 1) + min;
}

export function randomInt(min, max) {
  return Math.floor(random(min, max));
}
