import { getRandomHadith } from "./core.js";
import {
  MONTHS_HIJRI_NAMES,
  MONTHS_MILADI_NAMES,
  WEEKDAYS_AR_IMAGES,
  WEEKDAYS_EN_NAMES,
} from "./data.js";
import { gregorianToHijri } from "./lib/hijri.js";

export default class DailyCard {
  constructor(date = new Date()) {
    this.date = date;
    this.hijriDate = gregorianToHijri(date);

    this.weekday = date.getDay();

    this.month = date.getMonth() + 1;
    this.day = date.getDate();
    this.year = date.getFullYear();

    this.hijriMonth = this.hijriDate.month;
    this.hijriDay = this.hijriDate.day;
    this.hijriYear = this.hijriDate.year;
  }

  get weekdayArImage() {
    return WEEKDAYS_AR_IMAGES[this.weekday];
  }

  get weekdayEnName() {
    return WEEKDAYS_EN_NAMES[this.weekday];
  }

  get monthMiladiName() {
    return MONTHS_MILADI_NAMES[this.month - 1];
  }

  get monthHijriName() {
    return MONTHS_HIJRI_NAMES[this.hijriMonth - 1];
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
