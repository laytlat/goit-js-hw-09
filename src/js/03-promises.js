import Notiflix from 'notiflix';

const refs = {
  formEl: document.querySelector('.form'),
  firstDelayField: document.querySelector('[name="delay"]'),
  delayStep: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
};
let promiseTime = 0;

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, promiseTime);
  });
}

refs.formEl.addEventListener('submit', onBtnClickCreatePromises);

function onBtnClickCreatePromises(e) {
  e.preventDefault();
  promiseTime = Number(refs.firstDelayField.value);
  for (let i = 1; i <= refs.amount.value; i += 1) {
    createPromise(i, promiseTime)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    promiseTime = Number(promiseTime) + Number(refs.delayStep.value);
  }
}
