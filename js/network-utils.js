import { isEscapeKey } from './utils.js';
import { resetAdForm } from './form-master.js';

const confirmationTemplate = document.querySelector('#success').content.querySelector('.success');
const confirmationElement = confirmationTemplate.cloneNode(true);
const mistakeTemplate = document.querySelector('#error').content.querySelector('.error');
const mistakeElement = mistakeTemplate.cloneNode(true);
const BASE_URL = 'https://28.javascript.pages.academy/keksobooking';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу через 5 секунд',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте повторить отправку через 5 секунд',
};

// Функция показа подтверждения успешной отправки фотографии на сервер
function showConfirmation() {
  document.body.appendChild(confirmationElement);
}

// Функция показа ошибки отправки фотографии на сервер
function showMistake() {
  document.body.appendChild(mistakeElement);
}

//Функция нажатия на Esc/ на кнопку ОК/ на пространство вне сообщения при появившемся подтверждении отправки
const onConfirmationMessageEvent = (evt) => {
  const confirmationMessage = document.querySelector('.success');
  if (isEscapeKey(evt) || confirmationMessage.contains(evt.target)) {
    evt.preventDefault();
    confirmationElement.remove();
    resetAdForm();
    document.removeEventListener('keydown', onConfirmationMessageEvent);
    document.removeEventListener('mouseup', onConfirmationMessageEvent);
  }
};

//Функция нажатия на Esc/ на кнопку ОК/ на пространство вне сообщения при появившемся сообщении об ошибке
const onMistakeMessageEvent = (evt) => {
  const mistakeMessage = document.querySelector('.error');
  const mistakeButton = mistakeMessage.querySelector('.error__button');
  if (isEscapeKey(evt) || mistakeMessage.contains(evt.target) || mistakeButton.contains(evt.target)) {
    evt.preventDefault();
    mistakeElement.remove();
    document.removeEventListener('keydown', onMistakeMessageEvent);
    document.removeEventListener('mouseup', onMistakeMessageEvent);
  }
};


//Функция отправки данных на сервер
const sendData = (body) => fetch(
  `${BASE_URL}${Route.SEND_DATA}`,
  {
    method: 'POST',
    body,
  })
  .then((response) => {
    if (!response.ok) {
      showMistake();
      document.addEventListener('keydown', onMistakeMessageEvent);
      document.addEventListener('mouseup', onMistakeMessageEvent);
      throw new Error();
    } else {
      showConfirmation();
      document.addEventListener('keydown', onConfirmationMessageEvent);
      document.addEventListener('mouseup', onConfirmationMessageEvent);
    }
  })
  .catch(() => {
    showMistake();
    document.addEventListener('keydown', onMistakeMessageEvent);
    document.addEventListener('mouseup', onMistakeMessageEvent);
    throw new Error(ErrorText.SEND_DATA);
  });


export {
  sendData,
  onMistakeMessageEvent,
  onConfirmationMessageEvent
};
