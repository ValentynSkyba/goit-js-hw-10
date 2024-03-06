import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

const commonToastSettings = {
  titleColor: '#fff',
  titleSize: '16px',
  titleLineHeight: '1.5',
  messageColor: '#fff',
  messageSize: '16px',
  messageLineHeight: '1.5',
  timeout: 10000,
  resetOnHover: true,
};

form.addEventListener('submit', event => {
  event.preventDefault();

  const delay = Number(event.target.delay.value);
  const state = event.target.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(value => {
      iziToast.success({
        ...commonToastSettings,
        message: `✅ Fulfilled promise in ${value}ms`,
        backgroundColor: '#59a10d',
        progressBarColor: '#326101',
        position: 'topRight',
        icon: '',
      });
    })
    .catch(value => {
      iziToast.error({
        ...commonToastSettings,
        message: `❌ Rejected promise in ${value}ms`,
        backgroundColor: '#ef4040',
        progressBarColor: '#b51b1b',
        position: 'topRight',
        icon: '',
      });
    });
});
