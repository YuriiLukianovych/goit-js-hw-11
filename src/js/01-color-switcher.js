const refs = {
   startBtn: document.querySelector('button[data-start]'),
   stopBtn: document.querySelector('button[data-stop]'),
};

refs.startBtn.addEventListener('click', startColorSwitcher);
refs.stopBtn.addEventListener('click', stopColorSwitcer);

let intervalID = null;

function startColorSwitcher() {
   refs.startBtn.disabled = true;
   refs.stopBtn.disabled = false;
   swithBodyBgColor();
   intervalID = setInterval(swithBodyBgColor, 1000);
}

function stopColorSwitcer() {
   refs.startBtn.disabled = false;
   refs.stopBtn.disabled = true;
   clearInterval(intervalID);
}

function swithBodyBgColor() {
   document.body.style.backgroundColor = getRandomHexColor();
}

// функция генерации случайного цвета
function getRandomHexColor() {
   return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
