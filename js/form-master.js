// Функция отключения страницы: дисейблит все формы и их детей
function disablePage() {
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

// Функция включения страницы: включает все формы и их детей
function enablePage() {
  const form = document.querySelector('.ad-form');
  const filter = document.querySelector('.map__filters');
  form.classList.remove('ad-form--disabled');
  filter.classList.remove('map__filters--disabled');
  for (let j = 0; j <= form.children.length - 1; j++) {
    form.children[j].removeAttribute('disabled');
  }
  for (let i = 0; i <= filter.children.length - 1; i++) {
    filter.children[i].removeAttribute('disabled');
  }
}


export {
  disablePage,
  enablePage
};
