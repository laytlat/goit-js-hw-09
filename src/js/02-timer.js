import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

let timerID = null;
let timeInMsDifference = 0;
const timerRefs = {
  startBtn: document.querySelector('[data-start]'),
  daysField: document.querySelector('[data-days]'),
  hoursField: document.querySelector('[data-hours]'),
  minutesField: document.querySelector('[data-minutes]'),
  secondsField: document.querySelector('[data-seconds]'),
};
const flatpickrOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() - new Date() < 0) {
      timerRefs.startBtn.disabled = true;
      Notiflix.Notify.failure('Please choose a date in the future');
    }
    if (selectedDates[0].getTime() - new Date() > 0) {
      timerRefs.startBtn.disabled = false;
    }
    console.log(selectedDates[0]);
    timeInMsDifference = selectedDates[0].getTime() - new Date();
  },
};

timerRefs.startBtn.disabled = true;
timerRefs.startBtn.addEventListener('click', onBtnClickStartTimer);

flatpickr('#datetime-picker', flatpickrOptions);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function onBtnClickStartTimer() {
  timerID = setInterval(() => {
    const { days, hours, minutes, seconds } = convertMs(timeInMsDifference);
    timerRefs.daysField.textContent = addLeadingZero(days);
    timerRefs.hoursField.textContent = addLeadingZero(hours);
    timerRefs.minutesField.textContent = addLeadingZero(minutes);
    timerRefs.secondsField.textContent = addLeadingZero(seconds);
    if (timeInMsDifference > 1000) {
      timeInMsDifference -= 1000;
    }
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
