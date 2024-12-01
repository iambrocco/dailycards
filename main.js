import DailyCard from "./js/DailyCard.js";

const dailyCardEl = document.querySelector(".dailyCard");

const date = new Date();
const dailyCard = new DailyCard(date);

dailyCard.assignTo(dailyCardEl);
