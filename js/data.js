/**
 * @type {Promise<{
 *  "matan": string,
 *  "matan_normalized": string,
 *  "attribution": string,
 *  "categories": string[],
 * }[]>}
 */
export const masjidiHadithsPromise = fetch("./data/masjidi_hadiths.json").then(
  (response) => response.json()
);

export const WEEKDAYS_EN_NAMES = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

export const WEEKDAYS_AR_IMAGES = [
  "/assets/weekdays-diwani/Sun.svg",
  "/assets/weekdays-diwani/Mon.svg",
  "/assets/weekdays-diwani/Tue.svg",
  "/assets/weekdays-diwani/Wed.svg",
  "/assets/weekdays-diwani/Thu.svg",
  "/assets/weekdays-diwani/Fri.svg",
  "/assets/weekdays-diwani/Sat.svg",
];

export const MONTHS_MILADI_NAMES = [
  "يناير",
  "فبراير",
  "مارس",
  "أبريل",
  "مايو",
  "يونيو",
  "يوليو",
  "أغسطس",
  "سبتمبر",
  "أكتوبر",
  "نوفمبر",
  "ديسمبر",
];

export const MONTHS_HIJRI_NAMES = [
  "محرم",
  "صفر",
  "ربيع الأول",
  "ربيع الآخر",
  "جمادى الأولى",
  "جمادى الآخرة",
  "رجب",
  "شعبان",
  "رمضان",
  "شوال",
  "ذو القعدة",
  "ذو الحجة",
];
