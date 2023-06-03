import { getRandomArrayElement, shuffleRange, getRandomInteger, roundHundred } from './utils.js';

// Initial test-data settings
const ADS_COUNT = 10;
const TOKYO_LAT_TOP = 35.70000; //TOKYO BORDERS
const TOKYO_LAT_BOTTOM = 35.65000; //TOKYO BORDERS
const TOKYO_LNG_RIGHT = 139.80000; //TOKYO BORDERS
const TOKYO_LNG_LEFT = 139.70000; //TOKYO BORDERS
const EPITHETS = ['восхитительное', 'прекрасное', 'гениальное', 'умопомрачительное', 'яркое', 'запоминающееся', 'старинное', 'незабываемое', 'неожиданное', 'красивое', 'авторское', 'редкое', 'роскошное', 'прикольное', 'забавное', 'удобное', 'душевное', 'необычайное', 'доступное', 'служебное', 'известное', 'безопасное', 'качественное', 'новое', 'уникальное', 'скромное',];
const FOR_WHOM = ['семьи', 'развеселой компании', 'многодетной семьи', 'молодоженов', 'президента', 'пенсионеров', 'пионеров', 'всей семьи', 'комсомольцев', 'переселенцев', 'релокантов', 'дипломатов', 'настоящих самураев'];
const PRICE_RANGE = [0, 100000];
const ROOM_RANGE = [1, 3];
const ACCOMMODATION_TYPE = ['bungalow', 'flat', 'hotel', 'house', 'palace'];
const TIMEIN_TIMEOUT_RANGE = ['12:00', '13:00', '14:00'];
const OPTIONS = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];


// Функция формирования массива с объектами - уникальными координатами локаций
function createLocationsArr(top, bottom, right, left, qtyOfСoordinates) {
  const LAT_ARRAY = shuffleRange(0, Number(String((top - bottom) % 1).split('.')[1].slice(0, 5)) - 1);
  const LNG_ARRAY = shuffleRange(0, Number(String((right - left) % 1).split('.')[1].slice(0, 5)) - 1);
  LAT_ARRAY.forEach((num, index) => {
    LAT_ARRAY[index] = num / 100000 + bottom;
    LAT_ARRAY[index] = Number(String(LAT_ARRAY[index]).slice(0, 8));
  });
  LNG_ARRAY.forEach((num, index) => {
    LNG_ARRAY[index] = num / 100000 + left;
    LNG_ARRAY[index] = Number(String(LNG_ARRAY[index]).slice(0, 9));
  });
  const arr = [];
  for (let i = 0; i <= qtyOfСoordinates - 1; i++) {
    arr.push({
      lat: LAT_ARRAY[i],
      lng: LNG_ARRAY[i],
    });
  }
  return arr;
}

// Функция формирования массива с объектами - авторами (пути к аватаркам)
function createAuthorsArr(qtyOfAuthors) {
  const arr = [];
  let zero = '';
  const figures = shuffleRange(1, qtyOfAuthors);
  for (let i = 0; i <= qtyOfAuthors - 1; i++) {
    if (figures[i] < 10) {
      zero = '0';
    }
    arr.push({
      avatar: `${'img/avatars/user'}${zero}${figures[i]}${'.png'}`,
    });
    zero = '';
  }
  return arr;
}

// Функция формирования массива случайной длины (но не длинее указанного максимального значения) со значениями из заданной коллекции
function createPhotosArr(max) {
  const arr = [];
  const n = getRandomInteger(1, max);
  for (let i = 0; i <= n - 1; i++) {
    arr.push(getRandomArrayElement(PHOTOS));
  }
  return arr;
}

// Функция формирования массива случайной длины (но не длинее указанного максимального значения) со значениями из заданной коллекции
function createFeaturesArr(max) {
  const arr = [];
  const n = getRandomInteger(0, max);
  for (let i = 0; i <= n - 1; i++) {
    const element = getRandomArrayElement(OPTIONS);
    if (i !== 0 && !arr.includes(element)) {
      arr.push(element);
    }
    if (i === 0) {
      arr.push(element);
    }
  }
  return arr;
}

// Функция формирования массива с объектами - offer'ами
function createOffersArr(qtyOfOffers) {
  const arr = [];
  const ADDRESS_ARR = createLocationsArr(TOKYO_LAT_TOP, TOKYO_LAT_BOTTOM, TOKYO_LNG_RIGHT, TOKYO_LNG_LEFT, qtyOfOffers);
  for (let i = 0; i <= qtyOfOffers - 1; i++) {
    const PHOTOS_ARR = createPhotosArr(qtyOfOffers);
    const FEATURES_ARR = createFeaturesArr(OPTIONS.length);
    arr.push({
      title: `${'Это'} ${getRandomArrayElement(EPITHETS)}${','} ${getRandomArrayElement(EPITHETS)} ${'и'} ${getRandomArrayElement(EPITHETS)} ${' жилье для '} ${getRandomArrayElement(FOR_WHOM)}${'.'}`,
      address: ADDRESS_ARR[i],
      price: roundHundred(getRandomInteger(PRICE_RANGE[0], PRICE_RANGE[1])),
      type: `${getRandomArrayElement(ACCOMMODATION_TYPE)}`,
      rooms: getRandomInteger(ROOM_RANGE[0], ROOM_RANGE[1]),
      guests: getRandomInteger(ROOM_RANGE[0], ROOM_RANGE[1]),
      checkin: `${getRandomArrayElement(TIMEIN_TIMEOUT_RANGE)}`,
      checkout: `${getRandomArrayElement(TIMEIN_TIMEOUT_RANGE)}`,
      features: FEATURES_ARR,
      description: `${'Это'} ${getRandomArrayElement(EPITHETS)}${' предложение!'}`,
      photos: PHOTOS_ARR,
    });
  }
  return arr;
}


export {
  ADS_COUNT,
  createOffersArr,
  createAuthorsArr
};
