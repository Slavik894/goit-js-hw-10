import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const pickerEl = document.querySelector("#delay-picker");
const fulfilledRadioEl = document.querySelector("#fulfilledProm");
const rejectedRadioEl = document.querySelector("#rejectedProm");
const formEl = document.querySelector(".form");


function createPromise(e){
    e.preventDefault();
    const delay = pickerEl.value;
    const promise = new Promise((resolve, reject) =>
{
setTimeout(() => {
    if (fulfilledRadioEl.checked) {
      resolve(`✅ Fulfilled promise in ${delay} ms`);
    } else {
      reject(`❌ Rejected promise in ${delay} ms`);
    }
  }, `${delay}`);
});

promise
    .then(value => iziToast.show({message: value}))
    .catch(error => iziToast.show({message: error}));

}


formEl.addEventListener("submit", createPromise);
    