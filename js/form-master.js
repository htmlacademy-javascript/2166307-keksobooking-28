import { blockSubmitButton, unblockSubmitButton, showAlert, removeAlert } from './utils.js';
import { sendData } from './network-utils.js';
import { offers, resetUserMarker, cityCenter, newPointInput, ALERT_SHOW_TIME } from './main.js';
import { resetFilters } from './filter-master.js';
import { deleteRenderedPoints, renderPoints } from './ads-render.js';

const adForm = document.querySelector('.ad-form');
const accomodationTypeSelector = document.querySelector('#type');
const priceInput = document.querySelector('#price');
const titleInput = document.querySelector('#title');
const timeinSelector = document.querySelector('#timein');
const timeoutSelector = document.querySelector('#timeout');
const roomsSelector = document.querySelector('#room_number');
const capacitySelector = document.querySelector('#capacity');
const avatarInput = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview').querySelector('img');
const imagesInput = document.querySelector('#images');
const imagesPreview = document.querySelector('.ad-form__photo-container');
const sliderContainer = document.querySelector('.ad-form__slider');
const resetButton = document.querySelector('.ad-form__reset');
const checkboxInputList = document.querySelectorAll('.features__checkbox');
const descriptionInput = document.querySelector('#description');

const FLAT = 'flat';
const BUNGALOW = 'bungalow';
const HOUSE = 'house';
const PALACE = 'palace';
const HOTEL = 'hotel';
const NOT_FOR_GUESTS = '0';
const ONE_HUNDRED_ROOMS = '100';
const MIN_QTY_SYMBOLS = 30;
const MAX_QTY_SYMBOLS = 100;
const TITLE_ALERT_MESSAGE = 'ЗАГОЛОВОК ОБЪЯВЛЕНИЯ: минимальная длина 30 символов.';
const PRICE_ALERT_MESSAGE = 'МИНИМАЛЬНЫЕ ЦЕНЫ ЗА НОЧЬ: Бунгало - от 0 | Квартира - от 1000 | Отель - от 3000 | Дворец - от 10000 .';
const ROOMS_ALERT_MESSAGE = 'КОЛИЧЕСТВО КОМНАТ : 1 комната - для 1 гостя | 2 комнаты - для 1/2 гостей | 3 комнаты - для 1/2/3 гостей | 100 комнат - не для гостей';


// Хендлер на загрузку аватара
avatarInput.addEventListener('input', previewAvatar);

// Функция превью аватара
function previewAvatar() {
  avatarPreview.src = URL.createObjectURL(avatarInput.files[0]);
}

// Хендлер на загрузку фотографий жилья
imagesInput.addEventListener('input', previewImage);

// Функция превью фотографий жилья
function previewImage() {
  const emptyImageContainer = imagesPreview.querySelector('.ad-form__photo');
  const newImageContainer = document.createElement('div');
  const newImg = document.createElement('img');
  newImg.src = URL.createObjectURL(imagesInput.files[0]);
  newImg.class = 'popup__photo';
  newImg.width = 70;
  newImg.height = 70;
  newImg.alt = 'Фотография жилья';
  if (emptyImageContainer.innerHTML === '') {
    emptyImageContainer.appendChild(newImg);
    return;
  }
  newImageContainer.classList.add('ad-form__photo');
  newImageContainer.appendChild(newImg);
  imagesPreview.appendChild(newImageContainer);
}

//Функция меняющая мин значение цены и плейсхолдер в Input Price в зависимости от типа размещения
function changeMinPrice() {
  switch (accomodationTypeSelector.value) {
    case FLAT:
      priceInput.min = 1000;
      priceInput.value = 1000;
      priceInput.placeholder = 1000;
      removeSliderListener();
      sliderContainer.noUiSlider.destroy();
      startNoUiSlider();
      setSliderListener();
      priceInput.parentNode.classList.remove('ad-form__element--invalid');
      removeAlert();
      break;
    case BUNGALOW:
      priceInput.min = 0;
      priceInput.value = 0;
      priceInput.placeholder = 0;
      removeSliderListener();
      sliderContainer.noUiSlider.destroy();
      startNoUiSlider();
      setSliderListener();
      priceInput.parentNode.classList.remove('ad-form__element--invalid');
      removeAlert();
      break;
    case HOUSE:
      priceInput.min = 5000;
      priceInput.value = 5000;
      priceInput.placeholder = 5000;
      removeSliderListener();
      sliderContainer.noUiSlider.destroy();
      startNoUiSlider();
      setSliderListener();
      priceInput.parentNode.classList.remove('ad-form__element--invalid');
      removeAlert();
      break;
    case PALACE:
      priceInput.min = 10000;
      priceInput.value = 10000;
      priceInput.placeholder = 10000;
      removeSliderListener();
      sliderContainer.noUiSlider.destroy();
      startNoUiSlider();
      setSliderListener();
      priceInput.parentNode.classList.remove('ad-form__element--invalid');
      removeAlert();
      break;
    case HOTEL:
      priceInput.min = 3000;
      priceInput.value = 3000;
      priceInput.placeholder = 3000;
      removeSliderListener();
      sliderContainer.noUiSlider.destroy();
      startNoUiSlider();
      setSliderListener();
      priceInput.parentNode.classList.remove('ad-form__element--invalid');
      removeAlert();
      break;
  }
}

// Обработчик на Selector типа размещения
accomodationTypeSelector.addEventListener('change', changeMinPrice);


//Функции, связывающие поля timein / timeout
function changeTimein() {
  timeoutSelector.value = timeinSelector.value;
}
function changeTimeout() {
  timeinSelector.value = timeoutSelector.value;
}

// Обработчики на selector'ы timein и timeout
timeinSelector.addEventListener('change', changeTimein);
timeoutSelector.addEventListener('change', changeTimeout);

// Настройки слайдера
const SLIDER_SETTING = [
  {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100000,
    step: 500,
  },];

//Подключаем валидатор Pristine
const pristine = new Pristine(adForm);

//Функция валидации поля Title
function validateTitle(field) {
  if (field.length <= MAX_QTY_SYMBOLS && field.length >= MIN_QTY_SYMBOLS) {
    titleInput.parentNode.classList.remove('ad-form__element--invalid');
    removeAlert();
    return true;
  }
  titleInput.parentNode.classList.add('ad-form__element--invalid');
  showAlert(TITLE_ALERT_MESSAGE);
  return false;
}

//Функция валидации поля Price
function validatePrice(field) {
  if (field >= priceInput.min) {
    priceInput.parentNode.classList.remove('ad-form__element--invalid');
    removeAlert();
    return true;
  }
  priceInput.parentNode.classList.add('ad-form__element--invalid');
  showAlert(PRICE_ALERT_MESSAGE);
  return false;
}

//Функция валидации Capacity
function validateCapacity(field) {
  if (roomsSelector.value === ONE_HUNDRED_ROOMS && field === NOT_FOR_GUESTS || roomsSelector.value !== ONE_HUNDRED_ROOMS && field !== NOT_FOR_GUESTS && Number(roomsSelector.value) >= Number(field)) {
    roomsSelector.parentNode.classList.remove('ad-form__element--invalid');
    removeAlert();
    return true;
  }
  roomsSelector.parentNode.classList.add('ad-form__element--invalid');
  showAlert(ROOMS_ALERT_MESSAGE);
  return false;
}

// Подключаем Pristine на titleInput
pristine.addValidator(
  titleInput,
  validateTitle
);

// Подключаем Pristine на priceInput
pristine.addValidator(
  priceInput,
  validatePrice
);

// Подключаем Pristine на selector количества гостей
pristine.addValidator(
  capacitySelector,
  validateCapacity
);

// Обработчик на Selector типа размещения
roomsSelector.addEventListener('change', () => {
  pristine.validate();
});

//Функция инициализации noUiSlider
function startNoUiSlider() {
  noUiSlider.create(sliderContainer, {
    range: {
      min: SLIDER_SETTING[0].min,
      max: SLIDER_SETTING[0].max,
    },
    start: Number(priceInput.placeholder),
    step: SLIDER_SETTING[0].step,
    connect: 'lower',
    format: {
      to: function (value) {
        return value;
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });
}

//Функция установки начального значения слайдера
function setSliderValue() {
  priceInput.value = sliderContainer.noUiSlider.get();
}

// Функция установки хендлера на бегунок слайдера с функцией, передающей значение слайдера в inputPrice
function setSliderListener() {
  sliderContainer.noUiSlider.on('update', setSliderValue);
}

// Функция удаления хендлера на бегунок слайдера с функцией, передающей значение слайдера в inputPrice
function removeSliderListener() {
  sliderContainer.noUiSlider.off('update', setSliderValue);
}

//Начальная инициализация noUiSlider
startNoUiSlider();
setSliderListener();

// Функция отключения страницы: дисейблит все формы и их детей
function deactivateAllForms() {
  const form = document.querySelector('.ad-form');
  const filter = document.querySelector('.map__filters');
  form.classList.add('ad-form--disabled');
  filter.classList.add('map__filters--disabled');
  for (let j = 0; j <= form.children.length - 1; j++) {
    form.children[j].setAttribute('disabled', '');
  }
  for (let i = 0; i <= filter.children.length - 1; i++) {
    filter.children[i].setAttribute('disabled', '');
  }
}

// Функция активации формы для размещения объявлений
function activateAdForm() {
  const form = document.querySelector('.ad-form');
  form.classList.remove('ad-form--disabled');
  for (let j = 0; j <= form.children.length - 1; j++) {
    form.children[j].removeAttribute('disabled');
  }
}

// Функция активации фильтров
function activateFilterForm() {
  const filter = document.querySelector('.map__filters');
  filter.classList.remove('map__filters--disabled');
  for (let i = 0; i <= filter.children.length - 1; i++) {
    filter.children[i].removeAttribute('disabled');
  }
}

//Хендлер на отправку формы
const setUserFormSubmit = (onSuccess) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(onSuccess)
        .catch(
          () => {
            blockSubmitButton();
            setTimeout(() => {
              unblockSubmitButton();
            }, ALERT_SHOW_TIME);
          }
        );
    } else {
      if (titleInput.value === '') {
        titleInput.parentNode.classList.add('ad-form__element--invalid');
        showAlert(TITLE_ALERT_MESSAGE);
      }
    }
  });
};

//Функция сброса формы для размещения объявления в исходное состояние
function resetAdForm() {
  const imagesContainers = imagesPreview.querySelectorAll('.ad-form__photo');
  const newImageContainer = document.createElement('div');
  for (let i = 0; i <= imagesContainers.length - 1; i++) {
    imagesContainers[i].parentNode.removeChild(imagesContainers[i]);
  }
  newImageContainer.classList.add('ad-form__photo');
  imagesPreview.appendChild(newImageContainer);
  avatarPreview.src = 'img/muffin-grey.svg';
  titleInput.value = null;
  accomodationTypeSelector.value = FLAT;
  changeMinPrice();
  timeinSelector.value = '12:00';
  timeoutSelector.value = '12:00';
  capacitySelector.value = '3';
  roomsSelector.value = '1';
  descriptionInput.value = null;
  resetUserMarker();
  newPointInput.value = `${cityCenter.lat}${', '}${cityCenter.lng}`;
  for (let i = 0; i <= checkboxInputList.length - 1; i++) {
    checkboxInputList[i].checked = false;
  }
}

// Хендлер на кнопку сброса формы
resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetAdForm();
  resetFilters();
  deleteRenderedPoints();
  renderPoints(offers);
});

export {
  setUserFormSubmit,
  deactivateAllForms,
  activateAdForm,
  activateFilterForm,
  resetAdForm,
  FLAT,
  BUNGALOW,
  HOUSE,
  PALACE,
  HOTEL
};
