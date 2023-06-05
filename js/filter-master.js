import { offers } from './main.js';
import { deleteRenderedPoints, renderPoints } from './ads-render.js';

const DEBOUNCE_TIMEOUT_DELAY = 500; // 500 миллисекунд
const filterContainer = document.querySelector('.map__filters');
const featuresFilter = document.querySelector('#housing-features');

const ANY_VALUE = 'any';
const HOUSING_TYPE_FILTER = 'housing-type';
const HOUSING_PRICE_FILTER = 'housing-price';
const HOUSING_ROOMS_FILTER = 'housing-rooms';
const HOUSING_GUESTS_FILTER = 'housing-guests';
const LOW_PRICE = 'low';
const MIDDLE_PRICE = 'middle';
const HIGH_PRICE = 'high';
const LOW_PRICE_LIMIT = 10000;
const HIGH_PRICE_LEVEL = 50000;

//Функция сброса фильтров в исходное состояние
function resetFilters() {
  filterContainer.reset();
}

//Функция поучения всех чекнутых чекбоксов (возвращает массив)
function getCheckedCheckBoxes() {
  const checkboxesList = featuresFilter.querySelectorAll('.map__checkbox');
  const checkedCheckboxes = [];
  for (let index = 0; index < checkboxesList.length; index++) {
    if (checkboxesList[index].checked) {
      checkedCheckboxes.push(checkboxesList[index].value); // все значения чекнутых боксов кладем в массив
    }
  }
  return checkedCheckboxes;
}

//Функция получения состояния селектов (возвращает массив состояний)
function getSelectsValues() {
  const selectsList = document.querySelectorAll('.map__filter');
  const selectedSelects = [];
  for (let index = 0; index < selectsList.length; index++) {
    const filterName = selectsList[index].name;
    selectedSelects.push({ [filterName]: selectsList[index].value, }); // все значения селектов кладем в массив
  }
  return selectedSelects;
}

// Функция установки хендлера на все элементы фильтра и сама функция фильтрации
function setFilteringMenusChange(callback) {
  filterContainer.addEventListener('change', () => {
    deleteRenderedPoints();
    let newoffers = offers;
    const checkboxesValues = getCheckedCheckBoxes();
    const selectsValues = getSelectsValues();
    if (checkboxesValues.length > 0) {
      newoffers = offers.filter((res) => res.offer.features !== undefined); // отсеиваем все объявления без опций, если хотя бы 1 чекбокс включен
      for (let i = 0; i <= checkboxesValues.length - 1; i++) {
        newoffers = newoffers.filter((res) => res.offer.features.includes(checkboxesValues[i]));
      }
    }
    for (let i = 0; i <= selectsValues.length - 1; i++) {
      const currentObjKey = Object.keys(selectsValues[i])[0];
      if (selectsValues[i][currentObjKey] === ANY_VALUE) {
        continue;
      }
      if (currentObjKey === HOUSING_TYPE_FILTER) {
        newoffers = newoffers.filter((res) => res.offer.type === selectsValues[i][currentObjKey]);
      }
      if (currentObjKey === HOUSING_PRICE_FILTER) {
        if (selectsValues[i][currentObjKey] === MIDDLE_PRICE) {
          newoffers = newoffers.filter((res) => res.offer.price <= HIGH_PRICE_LEVEL && res.offer.price >= LOW_PRICE_LIMIT);
        }
        if (selectsValues[i][currentObjKey] === LOW_PRICE) {
          newoffers = newoffers.filter((res) => res.offer.price <= LOW_PRICE_LIMIT);
        }
        if (selectsValues[i][currentObjKey] === HIGH_PRICE) {
          newoffers = newoffers.filter((res) => res.offer.price >= HIGH_PRICE_LEVEL);
        }
      }
      if (currentObjKey === HOUSING_ROOMS_FILTER) {
        newoffers = newoffers.filter((res) => res.offer.rooms === Number(selectsValues[i][currentObjKey]));
      }
      if (currentObjKey === HOUSING_GUESTS_FILTER) {
        newoffers = newoffers.filter((res) => res.offer.guests === Number(selectsValues[i][currentObjKey]));
      }
    }
    callback(newoffers);
  });
}

//Подарочная функция от Кекса для устранения дребезга
function debounce(callback, timeoutDelay) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId); // Перед каждым новым вызовом удаляем предыдущий таймаут, чтобы они не накапливались
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay); // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

//Функция активации фильтра
function activateFilter() {
  setFilteringMenusChange(debounce(renderPoints, DEBOUNCE_TIMEOUT_DELAY));
}


export {
  activateFilter,
  setFilteringMenusChange,
  debounce,
  resetFilters,
  getCheckedCheckBoxes,
  getSelectsValues
};
