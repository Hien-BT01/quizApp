const submit = document.querySelector("#submit");
let countdown = 0;
import { popUp, modal } from "./script.js";
const timeElements = document.querySelectorAll(".time-up span");
export function showTime() {
  let futureDate = new Date().getTime() + 90000;
  countdown = setInterval(remainingTime, 1000,futureDate);
}
function remainingTime(timeRemain) {
  const date = new Date().getTime();
  let remain = timeRemain - date;
  const oneMinute = 1000 * 60;
  const oneSecond = oneMinute / 60;
  let minuteLeft = Math.floor(remain / oneMinute);
  let secondLeft = Math.floor((remain % oneMinute) / oneSecond);
  const getTime = [minuteLeft, secondLeft];
  function formatTime(item) {
    if (item < 10) {
      return (item = `0${item}`);
    }
    return item;
  }
  timeElements.forEach((timeElement, index) => {
    timeElement.innerHTML = formatTime(getTime[index]);
  });
  if (remain < 0) {
    const { warning } = popUp;
    const { icon, text, type } = warning;
    modal(icon, text, type);
    clearInterval(countdown);
    timeElements.forEach((timeElement) => {
      timeElement.innerHTML = "00";
    });
  }
}
showTime();
submit.addEventListener("click", (e) => {
  clearInterval(countdown);
});
