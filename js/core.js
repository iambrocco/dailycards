import { masjidiHadithsPromise } from "./data.js";

export async function getRandomHadith() {
  const hadiths = await masjidiHadithsPromise;
  const length = hadiths.length;

  return hadiths[Math.floor(Math.random() * length)];
}
