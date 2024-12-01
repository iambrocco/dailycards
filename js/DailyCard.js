import { getRandomHadith } from "./core.js";
import {
  MONTHS_HIJRI_NAMES,
  MONTHS_MILADI_NAMES,
  WEEKDAYS_AR_IMAGES,
  WEEKDAYS_EN_NAMES,
} from "./data.js";

export default class DailyCard {
  constructor(date = new Date()) {
    this.date = date;

    this.weekday = date.getDay();
    this.month = date.getMonth();
    this.day = date.getDate();
    this.year = date.getFullYear();

    // TODO - compute real hijri date
    this.hijriMonth = (this.month + 1) % 12;
    this.hijriDay = this.day + 1;
    this.hijriYear = this.year + 200;
  }

  get weekdayArImage() {
    return WEEKDAYS_AR_IMAGES[this.weekday];
  }

  get weekdayEnName() {
    return WEEKDAYS_EN_NAMES[this.weekday];
  }

  get monthMiladiName() {
    return MONTHS_MILADI_NAMES[this.month];
  }

  get monthHijriName() {
    return MONTHS_HIJRI_NAMES[this.hijriMonth];
  }

  getWeekdayEnNameChars() {
    return WEEKDAYS_EN_NAMES[this.weekday].split("");
  }
  getWeekdayEnNameCharSpans() {
    return this.getWeekdayEnNameChars().map((char) => {
      const span = document.createElement("span");
      span.textContent = char;
      return span;
    });
  }

  async assignTo(el) {
    const monthHijriEl = el.querySelector("#month-hijri");
    const monthMiladiEl = el.querySelector("#month-miladi");
    const dayHijriEl = el.querySelector("#day-hijri");
    const dayMiladiEl = el.querySelector("#day-miladi");
    const yearHijriEl = el.querySelector("#year-hijri");
    const yearMiladiEl = el.querySelector("#year-miladi");

    const weekdayArEl = el.querySelector("#weekday-ar");
    const weekdayEnEl = el.querySelector("#weekday-en");

    const hadithEl = el.querySelector("#hadith");
    const attributionEl = el.querySelector("#attribution");

    dayMiladiEl.textContent = this.day;
    dayHijriEl.textContent = this.hijriDay;

    monthMiladiEl.textContent = this.monthMiladiName;
    monthHijriEl.textContent = this.monthHijriName;

    yearHijriEl.textContent = this.hijriYear;
    yearMiladiEl.textContent = this.year;

    weekdayArEl.style.setProperty(
      "--weekday-ar-url",
      `url(${this.weekdayArImage})`
    );

    weekdayEnEl.textContent = "";
    for (const charSpan of this.getWeekdayEnNameCharSpans()) {
      weekdayEnEl.appendChild(charSpan);
    }

    const hadith = await getRandomHadith();

    hadithEl.textContent = hadith.matan_normalized;
    attributionEl.textContent = `(${hadith.attribution})`;
  }
}
