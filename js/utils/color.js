const dummyElement = document.createElement("div");

export function colorToRGB(color) {
  dummyElement.style.color = color;
  return dummyElement.style.color
    .match(/[\d\.]+/g)
    .map((value) => parseInt(value));
}

export function rgbToHsl(r, g, b) {
  (r /= 255), (g /= 255), (b /= 255);
  const vmax = Math.max(r, g, b),
    vmin = Math.min(r, g, b);
  let h,
    s,
    l = (vmax + vmin) / 2;

  if (vmax === vmin) {
    return [0, 0, l]; // achromatic
  }

  const d = vmax - vmin;
  s = l > 0.5 ? d / (2 - vmax - vmin) : d / (vmax + vmin);
  if (vmax === r) h = (g - b) / d + (g < b ? 6 : 0);
  if (vmax === g) h = (b - r) / d + 2;
  if (vmax === b) h = (r - g) / d + 4;
  h /= 6;

  return [h * 360, s, l];
}

export function rgbToHex(r, g, b) {
  r = Math.round(r);
  g = Math.round(g);
  b = Math.round(b);
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export function hexToRGB(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16),
      ]
    : null;
}
