import iziToast from "izitoast";   
import "izitoast/dist/css/iziToast.min.css";

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');

  form.addEventListener('submit', evt => {
    evt.preventDefault();

    const delay = Number(form.elements.delay.value);
    const state = form.elements.state.value;

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
      .then(ms => {
        iziToast.success({
          message: `✅ Fulfilled promise in ${ms}ms`,
          position: 'topRight',
        });
      })
      .catch(ms => {
        iziToast.error({
          message: `❌ Rejected promise in ${ms}ms`, // ← исправлено с delay → ms
          position: 'topRight',
        });
      });

    form.reset();
  });
});
