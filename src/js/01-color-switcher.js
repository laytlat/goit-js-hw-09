const startChangeColorButton = document.querySelector('[data-start]');
const stopChangeColorButton = document.querySelector('[data-stop]');
let timerId = null;

startChangeColorButton.addEventListener('click', () => {
  startChangeColorButton.disabled = true;
  timerId = setInterval(changingBodyColor, 1000);
});
stopChangeColorButton.addEventListener('click', () => {
  startChangeColorButton.disabled = false;
  clearInterval(timerId);
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changingBodyColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

// function onButtonClickStartChangingColor() {
//   startChangeColorButton.disabled = true;
//   timerId = setInterval(changingBodyColor, 1000);
// }
// function onButtonClickStopChangingColor() {
//   startChangeColorButton.disabled = false;
//   clearInterval(timerId);
// }
