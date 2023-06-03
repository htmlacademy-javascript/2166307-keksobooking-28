import { adIcon, map, QTY_OF_ADS } from './main.js';

const mapMarkers = [];

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
  for (let i = 0; i < features.length; i++) {
    list = list.concat(`${'<li class="popup__feature popup__feature--'}${features[i]}${'"></li>'}`);
  }
  return list;
}

//Функция отрисовки отдельной карточки отдельного объявления
function adRender(advertisement, owner) {
  const adTemplate = document.querySelector('#card').content.querySelector('.popup');
  const adElement = adTemplate.cloneNode(true);
  const adPhotos = adElement.querySelector('.popup__photos');
  const adType = adElement.querySelector('.popup__type');
  adElement.querySelector('.popup__avatar').src = owner;
  adElement.querySelector('.popup__title').textContent = advertisement.title;
  adElement.querySelector('.popup__text--address').textContent = `${advertisement.address}`;
  adElement.querySelector('.popup__text--price').textContent = `${advertisement.price}${' ₽/ночь'}`;
  switch (advertisement.type) {
    case 'flat':
      adType.textContent = 'Квартира';
      break;
    case 'bungalow':
      adType.textContent = 'Бунгало';
      break;
    case 'house':
      adType.textContent = 'Дом';
      break;
    case 'palace':
      adType.textContent = 'Дворец';
      break;
    case 'hotel':
      adType.textContent = 'Отель';
      break;
  }
  adElement.querySelector('.popup__text--capacity').textContent = `${advertisement.rooms}${' комнаты для '}${advertisement.guests}${' гостей'}`;
  adElement.querySelector('.popup__text--time').textContent = `${'Заезд после '}${advertisement.checkin}${','}${' выезд до '}${advertisement.checkout}`;
  if ('features' in advertisement) {
    adElement.querySelector('.popup__features').innerHTML = createFeaturesList(advertisement.features);
  }
  if ('description' in advertisement) {
    adElement.querySelector('.popup__description').textContent = advertisement.description;
  }
  if ('photos' in advertisement) {
    adPhotos.innerHTML = createImgList(advertisement.photos);
  } else {
    adPhotos.setAttribute('disabled', '');
    adPhotos.removeChild(adPhotos.firstElementChild);
  }
  // добавляем disabled, если блок есть, но пустой..
  adElement.innerHTML = adElement.innerHTML.replace('><', 'disabled><');
  return adElement;
}

//Функция отрисовки точек на карте
function renderPoints(list) {
  for (let i = 0; i <= QTY_OF_ADS - 1; i++){
    const lat = list[i].location.lat;
    const lng = list[i].location.lng;
    const marker = L.marker({ lat, lng }, {
      icon: adIcon,
    });
    mapMarkers.push(marker); //  Add marker to this.mapMarker for future reference
    marker
      .addTo(map)
      .bindPopup(adRender(list[i].offer, list[i].author.avatar));
  }
}

//Функция удаления отрисованных точек на карте
function deleteRenderedPoints() {
  mapMarkers.forEach((point) => {
    point.remove();
  });
}

////Функция отрисовки всех карточек для всех объявлений
function adsRender(advertisements) {
  for (let i = 0; i < advertisements.length - 1; i++) {
    adsRender(advertisements[i].offer, advertisements[i].author.avatar);
  }
}


export {
  adsRender,
  renderPoints,
  deleteRenderedPoints
};
