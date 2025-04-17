import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.querySelector('[data-start]');
  const dateInput = document.querySelector('#datetime-picker');
  const daysEl = document.querySelector('[data-days]');
  const hoursEl = document.querySelector('[data-hours]');
  const minutesEl = document.querySelector('[data-minutes]');
  const secondsEl = document.querySelector('[data-seconds]');

  let userSelectedDate = null;
  let timerId = null;

  startBtn.disabled = true;

  flatpickr(dateInput, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const selectedDate = selectedDates[0];
      if (selectedDate <= new Date()) {
        iziToast.error({
          message: 'Please choose a date in the future',
          position: 'topRight',
        });
        startBtn.disabled = true;
        return;
      }
      userSelectedDate = selectedDate;
      startBtn.disabled = false;
    },
  });

  startBtn.addEventListener('click', () => {
    startBtn.disabled = true;
    dateInput.disabled = true;

    timerId = setInterval(() => {
      const timeLeft = userSelectedDate - new Date();

      if (timeLeft <= 0) {
        clearInterval(timerId);
        updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        dateInput.disabled = false;
        return;
      }

      const timeObj = convertMs(timeLeft);
      updateTimerDisplay(timeObj);
    }, 1000);
  });

  function updateTimerDisplay({ days, hours, minutes, seconds }) {
    daysEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);
  }

  function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }

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
});

