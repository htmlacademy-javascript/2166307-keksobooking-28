import { adsRender } from './ads-render.js';
import { createOffersArr, createAuthorsArr, ADS_COUNT } from './mock.js';

const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const ZOOM = 13;
const offers = createOffersArr(ADS_COUNT);
const authors = createAuthorsArr(ADS_COUNT);

// начальные координаты карты
const startCoordinate = {
  lat: 35.6845,
  lng: 139.7521,
};

// Инициализируем Леафлет (вызываем у L метод map(), чтобы создать карту), прикручиваем ее к блоку map-canvas и задаем начальный зум
const map = L.map('map-canvas').setView(startCoordinate, ZOOM);

L.tileLayer(TILE_LAYER, {
  attribution: COPYRIGHT
}).addTo(map);

// Отрисовываем объявления в виде поинтов на карте, используя данные из массивов offers и authors
offers.forEach((offer, index) => {
  const lat = offer.address.lat;
  const lng = offer.address.lng;
  const marker = L.marker({ lat, lng });
  marker
    .addTo(map)
    .bindPopup(adsRender(offer, authors[index]));
});


