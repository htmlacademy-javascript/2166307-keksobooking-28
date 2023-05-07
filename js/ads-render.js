
// Функция генерации HTML-кода для вывода фотографий жилья
function createImgList(photos) {
  let list = '';
  for (let i = 0; i < photos.length - 1; i++) {
    list = list.concat(`${'<img src="'}${photos[i]}${'" class="popup__photo" width="45" height="40" alt="Фотография жилья"></img>'}`);
  }
  return list;
}

// Функция генерации HTML-кода для вывода списка опций жилья
function createFeaturesList(features) {
  let list = '';
  for (let i = 0; i < features.length - 1; i++) {
    list = list.concat(`${'<li class="popup__feature popup__feature--'}${features[i]}${'"></li>'}`);
  }
  return list;
}

//Функция отрисовки отдельного объявления
function adsRender(advertisement, owner) {
  const adTemplate = document.querySelector('#card').content.querySelector('.popup');
  const adElement = adTemplate.cloneNode(true);
  adElement.querySelector('.popup__avatar').src = owner.avatar;
  adElement.querySelector('.popup__title').textContent = advertisement.title;
  adElement.querySelector('.popup__text--address').textContent = `${advertisement.address.lat}${'   '}${advertisement.address.lng}`;
  adElement.querySelector('.popup__text--price').textContent = `${advertisement.price}${' ₽/ночь'}`;
  switch (advertisement.type) {
    case 'flat':
      adElement.querySelector('.popup__type').textContent = 'Квартира';
      break;
    case 'bungalow':
      adElement.querySelector('.popup__type').textContent = 'Бунгало';
      break;
    case 'house':
      adElement.querySelector('.popup__type').textContent = 'Дом';
      break;
    case 'palace':
      adElement.querySelector('.popup__type').textContent = 'Дворец';
      break;
    case 'hotel':
      adElement.querySelector('.popup__type').textContent = 'Отель';
      break;
  }
  adElement.querySelector('.popup__text--capacity').textContent = `${advertisement.rooms}${' комнаты для '}${advertisement.guests}${' гостей'}`;
  adElement.querySelector('.popup__text--time').textContent = `${'Заезд после '}${advertisement.checkin}${','}${' выезд до '}${advertisement.checkout}`;
  adElement.querySelector('.popup__features').innerHTML = createFeaturesList(advertisement.features);
  adElement.querySelector('.popup__description').textContent = advertisement.description;
  adElement.querySelector('.popup__photos').innerHTML = createImgList(advertisement.photos);
  // добавляем disabled, если блок пустой..
  adElement.innerHTML = adElement.innerHTML.replace('><', 'disabled><');
  return adElement;
}


export {
  adsRender
};
