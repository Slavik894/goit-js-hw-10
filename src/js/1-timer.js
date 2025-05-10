import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

const options = {
  enableTime: true,
  time_24hr: true,
    dateFormat: "Y-m-d H:i",
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

flatpickr("#datetime-picker", options);

