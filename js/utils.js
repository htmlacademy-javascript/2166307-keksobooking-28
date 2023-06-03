import { map } from './main.js';
import { resetFilters } from './filter-master.js';

const submitButton = document.querySelector('.ad-form__submit');
const alertContainer = document.createElement('div');

// Функция перетасовки случайным образом порядка элементов в заданном диапазоне при помощи алгоритма Фишера-Йетса,
// возвращает перемешанный  массив
const shuffleRange = (a, b) => {
  const foo = [];
  //преобразуем диапазон в массив
  for (let i = a; i <= b; i++) {
    foo.push(i);
  }
  function shuffle(arr) {
    let j, temp;
    for (let i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  }
  shuffle(foo);
  return foo;
};

// Функция получения случайного числа в заданном диапазоне
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// Функция получения случайного элемента из массива
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// Функция получения Set'a заданной длинны из случайных целых чисел (Set - массив, содержащий уникальные элементы)
// на выходе функция дает обычный массив с уникальными значениями
const getSet = (setLength) => {
  const nums = new Set();
  while (nums.size !== setLength) {
    nums.add(Math.floor(Math.random() * (setLength + 100)) + 1);
  }
  const arr = Array.from(nums); // преобразуем set в массив
  return arr;
};

//Функция округления до сотен
function roundHundred(value) {
  return Math.round(value / 100) * 100;
}

//Функция блокировки кнопки submit после отправки
const blockSubmitButton = () => {
  submitButton.disabled = true;
  map.closePopup();
  resetFilters();
};

//Функция разблокировки кнопки submit после отправки
const unblockSubmitButton = () => {
  submitButton.disabled = false;
  // alertContainer.remove();
};

//Функция показа сообщения об ошибке
const showAlert = (message) => {
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'yellow';
  alertContainer.style.color = 'red';
  alertContainer.classList.add = 'alert__container';
  alertContainer.textContent = message;
  document.body.append(alertContainer);
};

//Функция удаления сообщения об ошибке
const removeAlert = () => {
  alertContainer.remove();
};

//Функция проверки нажатия на ESC
const isEscapeKey = (evt) => evt.key === 'Escape';


export {
  shuffleRange,
  getRandomInteger,
  getRandomArrayElement,
  getSet,
  showAlert,
  removeAlert,
  blockSubmitButton,
  unblockSubmitButton,
  roundHundred,
  isEscapeKey
};
