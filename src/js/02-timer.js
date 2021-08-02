import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import { Notify } from 'notiflix';
// import

const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minutesSpan = document.querySelector('[data-minutes]');
const secondsSpan = document.querySelector('[data-seconds]');

const dateInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');

// объект настроек flatpickr
const options = {
   enableTime: true,
   time_24hr: true,
   defaultDate: new Date(),
   minuteIncrement: 1,
   onClose(selectedDates) {
      let diff = selectedDates[0].getTime() - Date.now();
      if (diff <= 0) {
         //   alert('Please choose a date in the future');
         Notify.failure('Please choose a date in the future');
      } else {
         startBtn.disabled = false;
      }
   },
};
//инициализация flatpickr
const initTime = flatpickr(dateInput, options);

// вешает слушатель на кнопку Start
startBtn.addEventListener('click', onClick);

function onClick() {
   // делает неактивной кнопку старта после запуска таймера
   startBtn.disabled = true;
   // делает неактивным поле выбора даты после старта таймера
   const flatpickrInput = document.querySelector('.flatpickr-input');
   flatpickrInput.setAttribute('readonly', true);

   // start interval
   const intervalID = setInterval(() => {
      const currentTime = Date.now();
      const endTime = initTime.selectedDates[0].getTime();
      const deltaTime = endTime - currentTime;

      if (Math.floor(deltaTime / 1000) == 0) {
         clearInterval(intervalID);
         flatpickrInput.removeAttribute('readonly');
         Notify.success('The promotion is over!!!');
      }

      const { days, hours, minutes, seconds } = convertMs(deltaTime);
      daysSpan.textContent = days;
      hoursSpan.textContent = hours;
      minutesSpan.textContent = minutes;
      secondsSpan.textContent = seconds;
      // console.log(`${days}:${hours}:${minutes}:${seconds}`);
   }, 1000);
}
//---------
//---------
//---------
//---------
//---------
//---------
// функция для представления результата в двухзначном виде xx:xx:xx
function addLeadingZero(value) {
   return String(value).padStart(2, '0');
}
// функция вычета из милисекунд
function convertMs(ms) {
   // Number of milliseconds per unit of time
   const second = 1000;
   const minute = second * 60;
   const hour = minute * 60;
   const day = hour * 24;

   // Remaining days
   const days = addLeadingZero(Math.floor(ms / day));
   // Remaining hours
   const hours = addLeadingZero(Math.floor((ms % day) / hour));
   // Remaining minutes
   const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
   // Remaining seconds
   const seconds = addLeadingZero(
      Math.floor((((ms % day) % hour) % minute) / second),
   );

   return { days, hours, minutes, seconds };
   //    return seconds;?
}
