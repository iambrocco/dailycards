/**
 *
 * @param {Date} date
 */
export function gregorianToHijri(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  function intPart($floatNum) {
    if ($floatNum < -0.0000001) {
      return Math.ceil($floatNum - 0.0000001);
    }
    return Math.floor($floatNum + 0.0000001);
  }

  let julianDay;
  if (
    year > 1582 ||
    (year == 1582 && month > 10) ||
    (year == 1582 && month == 10 && day > 14)
  ) {
    julianDay =
      intPart((1461 * (year + 4800 + intPart((month - 14) / 12))) / 4) +
      intPart((367 * (month - 2 - 12 * intPart((month - 14) / 12))) / 12) -
      intPart(
        (3 * intPart((year + 4900 + intPart((month - 14) / 12)) / 100)) / 4
      ) +
      day -
      32075;
  } else {
    julianDay =
      367 * year -
      intPart((7 * (year + 5001 + intPart((month - 9) / 7))) / 4) +
      intPart((275 * month) / 9) +
      day +
      1729777;
  }

  let adjustedJulianDay = julianDay - 1948440 + 10632;
  const cycleNumber = intPart((adjustedJulianDay - 1) / 10631);

  adjustedJulianDay = adjustedJulianDay - 10631 * cycleNumber + 354;
  julianDay =
    intPart((10985 - adjustedJulianDay) / 5316) *
      intPart((50 * adjustedJulianDay) / 17719) +
    intPart(adjustedJulianDay / 5670) *
      intPart((43 * adjustedJulianDay) / 15238);
  adjustedJulianDay =
    adjustedJulianDay -
    intPart((30 - julianDay) / 15) * intPart((17719 * julianDay) / 50) -
    intPart(julianDay / 16) * intPart((15238 * julianDay) / 43) +
    29;
  const hijriMonth = intPart((24 * adjustedJulianDay) / 709);
  const hijriDay = adjustedJulianDay - intPart((709 * hijriMonth) / 24);
  const hijriYear = 30 * cycleNumber + julianDay - 30;

  return {
    day: hijriDay,
    month: hijriMonth,
    year: hijriYear,
  };
}
export function adjustHijriDate(
  { day: hijriDay, month: hijriMonth, year: hijriYear },
  daysOffset
) {
  const DAYS_IN_MONTH = 30;
  const MONTHS_IN_YEAR = 12;
  hijriDay = hijriDay + daysOffset;

  if (hijriDay > DAYS_IN_MONTH) {
    // Adjust it and increase the month
    hijriDay = hijriDay - DAYS_IN_MONTH;
    hijriMonth = hijriMonth + 1;
  }

  if (hijriDay < 1) {
    hijriDay = hijriDay + DAYS_IN_MONTH;
    hijriMonth = hijriMonth - 1;
  }

  if (hijriMonth > 12) {
    // Adjust it and increase the year
    hijriMonth = hijriMonth - MONTHS_IN_YEAR;
    hijriYear = hijriYear + 1;
  }

  if (hijriMonth < 1) {
    // Adjust it and increase the year
    hijriMonth = hijriMonth + MONTHS_IN_YEAR;
    hijriYear = hijriYear - 1;
  }
  return {
    day: hijriDay,
    month: hijriMonth,
    year: hijriYear,
  };
}
