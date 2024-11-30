// #region IMPORTS & REFERENCES

const htmlCanvas = document.getElementsByClassName("imageCanvas")[0];
const imageSelect = document.getElementById("dropdown");
const dailyCardBG = document.getElementById("dailyCardBG");
const dailyCardBorder = document.getElementById("dailyCardBorder");
const dailyCardFill = document.getElementById("dailyCardFill");
const hadithInput = document.getElementById("hadithInput");
const qalaText = document.getElementById("qalaText");
/**
 * @type {HTMLCanvasElement}
 */

const previewCanvas = document.getElementById("previewCanvas");
const ctx = previewCanvas.getContext("2d");

const imagePathsPromise = fetch("../data/imagePaths.json")
  .then((response) => response.json())
  .then((data) => {
    return data;
  });
const AhadithJSONPromise = fetch("../data/processedAhadith.json")
  .then((response) => response.json())
  .then((data) => {
    return data;
  });
const MasjidiAhadithJSONPromise = fetch("../data/masjidi_hadiths.json")
  .then((response) => response.json())
  .then((data) => {
    return data;
  });
const date = new Date(Date.now());

const hijriDateJSONPromise = fetch(
  `http://api.aladhan.com/v1/gToH/${
    date.getDate().toString().length == 1
      ? `0${date.getDate().toString()}`
      : date.getDate().toString()
  }-${
    date.getMonth().toString().length == 1
      ? `0${date.getMonth().toString()}`
      : date.getMonth().toString()
  }-${date.getFullYear()}`
)
  .then((response) => response.json())
  .then((data) => {
    return data;
  });
//#endregion

// #region VARIABLES
const unitSize = previewCanvas.width / 14;
const defaultFilter =
  "invert(70%) sepia(72%) brightness(80%) contrast(101%)" +
  ` hue-rotate(${Math.random() * 360}deg)`;
const bgGridFilter = defaultFilter + " brightness(90%) opacity(20%)";
const bgRectFilter = defaultFilter + " brightness(40%) opacity(5%)";
// #region FONT FACES
var diwaniFont = new FontFace("diwani", "url(../assets/fonts/diwani.ttf)");
var tajawalFont = new FontFace("tajawal", "url(../assets/fonts/tajawal.ttf)");
var aljazeeraFont = new FontFace(
  "aljazeera",
  "url(../assets/fonts/aljazeera.ttf)"
);
var arialFont = new FontFace("arial", "url(../assets/fonts/arial.ttf)");
var lemonmilkFont = new FontFace(
  "lemonmilk",
  "url(../assets/fonts/lemonmilk.otf)"
);

arialFont.load().then(function (font) {
  document.fonts.add(font);
});
//#endregion
//#endregion

// #region FUNCTIONS
// #region work
function wrapText(ctx, text, maxWidth) {
  let words = text.split(" ");
  let lines = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    let word = words[i];
    let testLine = currentLine + " " + word;
    let metrics = ctx.measureText(testLine);
    let testWidth = metrics.width;
    if (testWidth > maxWidth) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  lines.push(currentLine);
  return lines;
}

//#endregion
// #region 1. Get A Random Hadith
async function getRandomHadith() {
  let hadithSource =
    // Math.floor(Math.random()) == 0
    //   ? await AhadithJSONPromise
    //   :
    await MasjidiAhadithJSONPromise;
  let randomHadith =
    hadithSource[Math.floor(Math.random() * hadithSource.length)];
  hadithInput.value = randomHadith.matan;
  return randomHadith;
}
//#endregion
// #region 2. Create Canvas
function drawBackground() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, previewCanvas.width, previewCanvas.height);
  ctx.filter = bgGridFilter;
  ctx.drawImage(dailyCardBG, 0, 0, previewCanvas.width, previewCanvas.height);
  4;
  ctx.filter = "none";
  ctx.drawImage(dailyCardFill, 0, 0, previewCanvas.width, previewCanvas.height);
  ctx.filter = defaultFilter;
  ctx.drawImage(
    dailyCardBorder,
    0,
    0,
    previewCanvas.width,
    previewCanvas.height
  );
}
//#endregion
// #region 3. Place Date
async function placeDate() {
  //#region FUNCTION VARIABLES
  let hijriDateJSON = (await hijriDateJSONPromise).data.hijri;
  ctx.filter = bgRectFilter;
  ctx.fillRect(unitSize * 2, unitSize * 2, unitSize * 10, unitSize * 4);
  ctx.filter = defaultFilter;
  let imagesJSON = await imagePathsPromise;
  let dayNameNumber = date.getDay();
  let day = imagesJSON.daysOfTheWeek[dayNameNumber];
  let miladiMonth = imagesJSON.miladiMonths[date.getMonth()];
  let miladiYear = date.getFullYear();
  let hijriMonth = imagesJSON.hijriMonths[hijriDateJSON.month.number];
  let hijriYear = hijriDateJSON.year;
  let hijriDayNumber = hijriDateJSON.day;
  let dayNumber = date.getDate();
  let imagesArray = [
    {
      path: day,
      x: unitSize * 7.75,
      y: unitSize * 1.75,
      dw: 4 * unitSize,
      dh: 4 * unitSize,
    },
    {
      path: hijriMonth,
      x: unitSize * 2.6,
      y: unitSize * 1.5,
      dw: 3 * unitSize,
      dh: 3 * unitSize,
    },
    {
      path: miladiMonth,
      x: unitSize * 2.5,
      y: unitSize * 1.75,
      dw: 4 * unitSize,
      dh: 4 * unitSize,
    },
    {
      path: imagesJSON.dividers[0],
      x: unitSize * 2.9,
      y: unitSize * 4.25,
      dw: unitSize * 3,
      dh: unitSize / 1.5,
    },
  ];
  //#endregion
  for (let image in imagesArray) {
    let img = new Image();
    img.src = `.${imagesArray[image].path}`;
    img.onload = () => {
      ctx.filter = imagesArray[image].filter ?? defaultFilter;
      imagesArray[image].dh
        ? ctx.drawImage(
            img,
            imagesArray[image].x,
            imagesArray[image].y,
            imagesArray[image].dw,
            imagesArray[image].dh
          )
        : ctx.drawImage(img, imagesArray[image].x, imagesArray[image].y);
    };
  }
  // #region DRAW DATE BACKGROUND RECT
  diwaniFont.load().then(function (font) {
    document.fonts.add(font);
    ctx.filter = defaultFilter + " brightness(160%)";
    ctx.fillRect(
      imagesArray[2].x + unitSize * 3,
      unitSize * 0.9 + imagesArray[2].y,
      (unitSize * (1.28 * 1.57) +
        imagesArray[2].y -
        (unitSize * 1.1 + imagesArray[2].y)) /
        1.4,
      imagesArray[1].x / 1.7
    );
    ctx.filter = defaultFilter;
  });
  //#endregion
  // #region DRAW YEAR AND DAY NUMBER
  aljazeeraFont.load().then(function (font) {
    document.fonts.add(font);
    ctx.direction = "rtl";
    ctx.font = "130px aljazeera";

    ctx.filter = defaultFilter + "brightness(250%)";
    // #region Hijri Day Number
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    ctx.fillText(
      hijriDayNumber.toString(),
      imagesArray[1].x + 3.4 * unitSize,
      unitSize * 1.6 + imagesArray[1].y
    );
    //#endregion
    // #region Gregorian Day Number
    ctx.fillText(
      dayNumber.toString(),
      imagesArray[2].x + 3.5 * unitSize,
      unitSize * 2.42 + imagesArray[1].y
    );
    //#endregion
    // #region Year Text
    ctx.filter = defaultFilter;
    ctx.filter = defaultFilter + " brightness(180%)";
    ctx.font = "100px aljazeera";
    ctx.fillText(
      `${hijriYear}هـ - ${miladiYear}مـ`,
      imagesArray[3].x * 1.9,
      imagesArray[3].y + unitSize
    );
    //#endregion
  });
  //#endregion
  // #region DRAW ENGLISH DAY
  lemonmilkFont.load().then(function (font) {
    ctx.direction = "ltr";
    document.fonts.add(font);
    ctx.font = "100px 'lemonmilk'";

    // Measure and center text
    const dayNameText = imagesJSON.dayNames[dayNameNumber].toUpperCase();
    const textWidth = ctx.measureText(dayNameText).width;
    const centerX = imagesArray[0].x + imagesArray[0].dw / 2;
    const textX = centerX - textWidth / 2;
    const textY = imagesArray[0].y + imagesArray[0].dh / 1.3;
    ctx.fillRect(textX - 45, textY - 15, textWidth, 125);

    ctx.textAlign = "left"; // Reset to default for consistency
    ctx.textBaseline = "top";
    ctx.filter = defaultFilter + "brightness(300%)";
    ctx.fillText(dayNameText, textX, textY);
    ctx.filter = defaultFilter;
  });
  //#endregion
  ctx.filter = defaultFilter;

  // #region DRAW MID DIVIDER
  function drawMidDivider() {
    const divider1 = {
      path: imagesJSON.dividers[1],
      x: unitSize * 6,
      y: unitSize * 3.5,
      dw: 150,
      dh: 150,
    };
    const divider1Img = new Image();
    divider1Img.src = `.${divider1.path}`;
    divider1Img.onload = () => {
      // Move the canvas origin to the center of the image
      ctx.translate(previewCanvas.width / 1.9, divider1.y + divider1.dh / 2.5);

      // Rotate the canvas
      ctx.rotate((45 * Math.PI) / 180); // Convert degrees to radians

      // Draw the image at its new origin (adjust by -dw/2 and -dh/2 to center it)
      ctx.drawImage(
        divider1Img,
        -divider1.dw / 2,
        -divider1.dh / 5,
        divider1.dw,
        divider1.dh
      );
      ctx.rotate(-(45 * Math.PI) / 180); // Convert degrees to radians
      ctx.translate(
        -previewCanvas.width / 1.9,
        -(divider1.y + divider1.dh) / 1.11
      );
    };
  }
  //#endregion
  drawMidDivider();
}
//#endregion
// #region 4. Place Hadith
async function placeHadith() {
  // Draw the background rectangle
  ctx.filter = bgRectFilter;
  ctx.fillRect(2 * unitSize, 7 * unitSize, 10 * unitSize, 3 * unitSize);
  ctx.filter = defaultFilter;

  // Load the font and place the Hadith text
  tajawalFont.load().then(async function (font) {
    document.fonts.add(font);

    // Add the "قَالَ رَسُولَ اللَّهِ ﷺ" text
    ctx.font = "150px tajawal";
    ctx.textAlign = "center"; // Center-align the text
    ctx.textBaseline = "top"; // Align the top of the text
    ctx.fillText("قَالَ رَسُولَ اللَّهِ ﷺ", 7 * unitSize, 7.4 * unitSize);

    // Fetch the Hadith
    let hadith = await getRandomHadith();

    // Dynamically adjust font size for the Hadith text
    let maxWidth = 8 * unitSize; // Slightly smaller than the rectangle's width
    let fontSize = 130;
    ctx.font = `${fontSize}px tajawal`;

    // Center the Hadith text horizontally and place it within the rectangle
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    let lines = wrapText(ctx, hadith.matan, maxWidth);
    let lineHeight = fontSize * 1.2; // Adjust line spacing
    let startY = 8.8 * unitSize - (lines.length * lineHeight) / 2;
    
    lines.forEach((line, index) => {
      ctx.direction = "rtl"
      ctx.fillText(line, 7 * unitSize, startY + index * lineHeight);
    });
      });

  // Reset the filter
  ctx.filter = defaultFilter;
}
//#endregion
// #region 5. Draw Basmalah and Logo
async function placeBasmalah() {
  let imagesJSON = await imagePathsPromise;

  const images = [
    {
      path: imagesJSON.bismillah[0],
      filter: defaultFilter + " brightness(70%)",
      x: unitSize * 2.75,
      y: unitSize * 11,
      dw: unitSize * 7.5,
      dh: unitSize * 0.75,
    },
    ,
    {
      path: imagesJSON.logo[0],
      filter: "none",
      x: unitSize * 10.4,
      y: unitSize * 10.9,
      dw: unitSize,
      dh: unitSize,
    },
  ];
  ctx.filter = bgRectFilter;
  ctx.fillRect(
    2.5 * unitSize,
    10.875 * unitSize,
    9 * unitSize,
    1.25 * unitSize
  );
  ctx.filter = defaultFilter;

  for (let unit in images) {
    let imageJSON = images[unit];
    let img = new Image();
    img.src = `.${imageJSON.path}`;
    img.onload = () => {
      ctx.filter = imageJSON.filter ?? defaultFilter;
      ctx.drawImage(img, imageJSON.x, imageJSON.y, imageJSON.dw, imageJSON.dh);
    };
  }
}
//#endregion
// #region 6. Process All
function processDailyCard() {
  drawBackground();
  placeBasmalah();
  placeDate();
  placeHadith();
}
//#endregion
// #endregion
processDailyCard();
//#region DOWNLOAD
const downloadButton = document.getElementById("download")
downloadButton.addEventListener('click', function () {
  // Convert the canvas content to a data URL
  const dataURL = previewCanvas.toDataURL('image/png');
  
  // Create an <a> element for download
  const link = document.createElement('a');
  link.href = dataURL;
  link.download = 'canvas-image.png'; // The name of the downloaded file
  
  // Trigger the download
  link.click();
});
//#endregion