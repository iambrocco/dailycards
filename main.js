import "./js/utils/InlineHTMLElement.js";
import DailyCard from "./js/DailyCard.js";
import { colorToRGB, hexToRGB, rgbToHex, rgbToHsl } from "./js/utils/color.js";
import { randomInt } from "./js/utils/random.js";

const dailyCardEl = document.querySelector(".dailyCard");
const hijriOffsetInput = document.getElementById("hijri-offset");
const colorInput = document.getElementById("color");
const randomizeColorButton = document.getElementById("random-color");
const randomizeHadithButton = document.getElementById("random-hadith");
const scaleInput = document.getElementById("download-scale");
const downloadPngButton = document.getElementById("download-png");

const date = new Date();
const dailyCard = new DailyCard(date);

hijriOffsetInput.addEventListener("input", updateHijriOffset);
colorInput.addEventListener("input", updateColors);
randomizeColorButton.addEventListener("click", randomizeColor);
randomizeHadithButton.addEventListener("click", updateHadith);
downloadPngButton.addEventListener("click", downloadPng);

randomizeColor();
updateHijriOffset();
updateHadith();

function updateHijriOffset() {
  dailyCard.adjustHijriDate(Number(hijriOffsetInput.value));
  dailyCard.assignDatesTo(dailyCardEl);
}

function updateHadith() {
  dailyCard.assignHadithTo(dailyCardEl);
}

function updateColors() {
  const [r, g, b] = hexToRGB(colorInput.value);

  const [h, s, l] = rgbToHsl(r, g, b);

  dailyCardEl.style.setProperty("--color-h", h);
  dailyCardEl.style.setProperty("--color-s", `${s * 100}%`);
  dailyCardEl.style.setProperty("--color-l", `${l * 100}%`);
}
function randomizeColor() {
  const randomHue = randomInt(0, 360);
  const randomSaturation = randomInt(45, 55);
  const randomLightness = randomInt(45, 55);

  dailyCardEl.style.setProperty("--color-h", randomHue);
  dailyCardEl.style.setProperty("--color-s", `${randomSaturation}%`);
  dailyCardEl.style.setProperty("--color-l", `${randomLightness}%`);

  colorInput.value = rgbToHex(
    ...colorToRGB(
      `hsl(${randomHue}, ${randomSaturation}%, ${randomLightness}%)`
    )
  );
}

async function downloadPng() {
  const dataurl = await domtoimage.toPng(dailyCardEl, {
    width: 1080,
    height: 1080,
    scale: +scaleInput.value,
    onclone(element) {
      element.style.transform = 'none';
    },
  });

  const a = document.createElement("a");
  a.href = dataurl;
  a.download = `Daily Card ${date.toISOString().split("T")[0]}.png`;
  a.click();
}
