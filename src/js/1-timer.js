// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import icon from '../img/bi_x-octagon.svg';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  datetimePicker: document.querySelector('#datetime-picker'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= options.defaultDate) {
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      refs.startBtn.disabled = true;
      return;
    }
    refs.startBtn.disabled = false;
    userSelectedDate = selectedDates[0];
  },
};

const flatpickrInstance = flatpickr('#datetime-picker', options);

refs.startBtn.disabled = true;
refs.startBtn.addEventListener('click', onStartBtnClick);

let userSelectedDate = null;
let timerId = null;

function onStartBtnClick() {
  refs.startBtn.disabled = true;
  refs.datetimePicker.disabled = true;

  timerId = setInterval(() => {
    const deltaTime = userSelectedDate - Date.now();

    if (deltaTime <= 0) {
      clearInterval(timerId);
      refs.datetimePicker.disabled = false;
      return;
    }

    updateTimerFace(deltaTime);
  }, 1000);
}

function updateTimerFace(time) {
  const timeComponents = convertMs(time);

  refs.days.textContent = addZero(timeComponents.days);
  refs.hours.textContent = addZero(timeComponents.hours);
  refs.minutes.textContent = addZero(timeComponents.minutes);
  refs.seconds.textContent = addZero(timeComponents.seconds);
}

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

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addZero(value) {
  return String(value).padStart(2, '0');
}

iziToast.settings({
  timeout: 10000,
  resetOnHover: true,
  backgroundColor: '#EF4040',
  progressBarColor: '#B51B1B',

  messageColor: '#fff',
  messageSize: '16px',
  messageLineHeight: '1.5',

  iconUrl: icon,

  title: 'Error',
  titleColor: '#fff',
  titleSize: '16px',
  titleLineHeight: '1.5',
});
