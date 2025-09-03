// Sliders
const redRange = document.getElementById("redRange");
const greenRange = document.getElementById("greenRange");
const blueRange = document.getElementById("blueRange");

// Inputs numéricos
const redInput = document.getElementById("redInput");
const greenInput = document.getElementById("greenInput");
const blueInput = document.getElementById("blueInput");

// Labels dinámicos
const redValue = document.getElementById("redValue");
const greenValue = document.getElementById("greenValue");
const blueValue = document.getElementById("blueValue");

const colorBox = document.getElementById("color-box");
const hexCode = document.getElementById("hex-code");

// Color Picker
const colorPicker = document.getElementById("colorPicker");

// Convertir número a HEX de 2 dígitos
function toHex(num) {
  let hex = Number(num).toString(16);
  return hex.length < 2 ? "0" + hex : hex;
}

// Convertir HEX a RGB
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

// Limitar valores entre 0 y 255
function clamp(value) {
  if (value === "") return 0;
  value = parseInt(value);
  if (isNaN(value)) return 0;
  if (value < 0) return 0;
  if (value > 255) return 255;
  return value;
}

// Actualiza sliders, inputs, color box y picker
function updateColor() {
  const r = clamp(redRange.value);
  const g = clamp(greenRange.value);
  const b = clamp(blueRange.value);

  redValue.textContent = r;
  greenValue.textContent = g;
  blueValue.textContent = b;

  redInput.value = r;
  greenInput.value = g;
  blueInput.value = b;

  const rgbColor = `rgb(${r}, ${g}, ${b})`;
  const hex = "#" + toHex(r) + toHex(g) + toHex(b);

  colorBox.style.backgroundColor = rgbColor;
  hexCode.textContent = hex;
  colorPicker.value = hex;
}

// Eventos
[redRange, greenRange, blueRange].forEach(el => el.addEventListener("input", updateColor));
redInput.addEventListener("input", () => { redRange.value = clamp(redInput.value); updateColor(); });
greenInput.addEventListener("input", () => { greenRange.value = clamp(greenInput.value); updateColor(); });
blueInput.addEventListener("input", () => { blueRange.value = clamp(blueInput.value); updateColor(); });
colorPicker.addEventListener("input", () => {
  const { r, g, b } = hexToRgb(colorPicker.value);
  redRange.value = r;
  greenRange.value = g;
  blueRange.value = b;
  updateColor();
});

// Inicializar
updateColor();
