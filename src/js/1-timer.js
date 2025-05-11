import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const startBtn = document.querySelector("button");
const pickerEl = document.querySelector("#datetime-picker")
const daysEl = document.querySelector(".days");
const hoursEl = document.querySelector(".hours");
const minutesEl = document.querySelector(".minutes");
const secondsEl = document.querySelector(".seconds");

let userSelectedDate;
let presentTime;
let timerID;


startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  dateFormat: "Y-m-d H:i",
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    presentTime = new Date(); 
    if(userSelectedDate > presentTime){
      startBtn.disabled = false;
    }
    else{
      startBtn.disabled = true;
      iziToast.show({message:"Please choose a date in the future"});
    }
    
  },
  
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

startBtn.addEventListener("click", () => {
  startBtn.disabled = true;
  pickerEl.disabled = true;

  timerID = setInterval(()=>{
    const now = new Date();
    const delta = userSelectedDate - now;

    if(delta < 0){
      pickerEl.disabled = false;
      clearInterval(timerID);
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(delta);
    daysEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);
    
  }, 1000)

  });

flatpickr("#datetime-picker", options);
