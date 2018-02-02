'use strict';

var QUANTITY_OFFER = 8;
var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var OFFER_TYPES = ['flat', 'house', 'bungalo'];
var OFFER_TIMES = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PIN_HEIGHT = 70;
var PIN_WIDTH = 50;
var PIN_IMG_WIDTH = 40;
var PIN_IMG_HEIGHT = 40;
var PHOTO_WIDTH = 100;
var MIN_COORDINATE_X = 300;
var MAX_COORDINATE_X = 900;
var MIN_COORDINATE_Y = 150;
var MAX_COORDINATE_Y = 500;
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;

document.querySelector('.map').classList.remove('.map--faded');

var renderOffer = function (quantity) {
  var offers = [];

  // создание массива фотографий
  var imgUrls = [];
  for (var i = 1; i <= QUANTITY_OFFER; i++) {
    imgUrls.push('img/avatars/user0' + i + '.png');
  }
  // копируем массив названий и фотографий
  var offersTitles = OFFER_TITLES.slice();
  var offersPhotos = OFFER_PHOTOS.slice();
  // создание объекта предложения
  for (i = 0; i < quantity; i++) {
    // получение номера фото предложения
    var offerImgNumber = Math.floor(Math.random() * imgUrls.length);
    // получение номера названия предложения
    var offerTitleNumber = Math.floor(Math.random() * offersTitles.length);
    // сортировка массива случайным образом
    offersPhotos.sort();
    // формируем массив случайной длины
    var offersFeatures = OFFER_FEATURES.slice();
    offersFeatures.sort();
    offersFeatures.length = Math.floor(Math.random() * (offersFeatures.length - 1) + 1);
    // определение координат случайным образом в заданном диапазоне
    var offerLocationX = Math.floor(Math.random() * (MAX_COORDINATE_X - MIN_COORDINATE_X) + MIN_COORDINATE_X);
    var offerLocationY = Math.floor(Math.random() * (MAX_COORDINATE_Y - MIN_COORDINATE_Y) + MIN_COORDINATE_Y);
    offers.push({
      'author': {
        'avatar': imgUrls[offerImgNumber]
      },
      'offer': {
        'title': offersTitles[offerTitleNumber],
        'address': offerLocationX + ', ' + offerLocationY,
        'price': Math.floor(Math.random() * (MAX_PRICE - MIN_PRICE) + MIN_PRICE),
        'type': OFFER_TYPES[Math.floor(Math.random() * OFFER_TYPES.length)],
        'rooms': Math.floor(Math.random() * (5 - 1) + 1),
        'guests': Math.floor(Math.random() * (10 - 1) + 1),
        'checkin': OFFER_TIMES[Math.floor(Math.random() * OFFER_TIMES.length)],
        'checkout': OFFER_TIMES[Math.floor(Math.random() * OFFER_TIMES.length)],
        'features': offersFeatures,
        'description': '',
        'photos': offersPhotos
      },
      'location': {
        'x': offerLocationX,
        'y': offerLocationY
      }
    });
  }
  // удаление из массивов картинок и названий использованных элементов
  imgUrls.splice(offerImgNumber, 1);
  offersTitles.splice(offerTitleNumber, 1);
  return offers;
};

// генерируем массив предложений
var offers = renderOffer(QUANTITY_OFFER);

// создание шаблона метки
var templateButton = document.createElement('button');
templateButton.className = 'map__pin';
var templateImgInButton = document.createElement('img');
templateImgInButton.width = PIN_IMG_WIDTH;
templateImgInButton.height = PIN_IMG_HEIGHT;
templateImgInButton.draggable = false;
templateButton.appendChild(templateImgInButton);

// функция добавления параметров метки
var renderOfferMarker = function (offer) {
  var marker = templateButton.cloneNode(true);
  marker.style = 'left: ' + (offer.location.x - PIN_WIDTH / 2) + 'px; top: ' + (offer.location.y - PIN_HEIGHT) + 'px;';
  marker.firstChild.src = offer.author.avatar;
  return marker;
};

// формирование фрагмента со всеми метками
var offersFragment = document.createDocumentFragment();
for (var i = 0; i < QUANTITY_OFFER; i++) {
  offersFragment.appendChild(renderOfferMarker(offers[i]));
}
document.querySelector('.map__pins').appendChild(offersFragment);

// заполнение данными карточки товара
var renderOfferCard = function (offerItem) {
  var offerType = 'Квартира';
  if (offerItem.offer.type === 'bungalo') {
    offerType = 'Бунгало';
  } else if (offerItem.offer.type === 'house') {
    offerType = 'Дом';
  }
  var filledOffer = templateOfferCard.cloneNode(true);
  filledOffer.querySelector('h3').textContent = offerItem.offer.title;
  filledOffer.querySelector('p small').textContent = offerItem.offer.address;
  filledOffer.querySelector('.popup__price').textContent = offerItem.offer.price + '&#x20bd;/ночь';
  filledOffer.querySelector('h4').textContent = offerType;
  filledOffer.querySelector('h4 + p').textContent = offerItem.offer.rooms + ' комнаты для ' + offerItem.offer.guests + ' гостей';
  filledOffer.querySelector('p + p').textContent = 'Заезд после ' + offerItem.offer.checkin + ', выезд до ' + offerItem.offer.checkout;
  filledOffer.querySelector('.popup__avatar').src = offerItem.author.avatar;
  filledOffer.querySelector('ul + p').textContent = offerItem.offer.description;

  // поиск родительского блока для доп услуг
  var offerFeatures = filledOffer.querySelector('.popup__features');
  offerFeatures.textContent = '';
  // создание шаблона
  var templateFeature = document.createElement('li');
  templateFeature.classList.add('feature');
  // создание фрагмента для вставки
  var offerFeaturesFragment = document.createDocumentFragment();
  // генерируем список услуг
  for (i = 0; i < offerItem.offer.features.length; i++) {
    var featureItem = templateFeature.cloneNode();
    featureItem.classList.add('feature--' + offerItem.offer.features[i]);
    offerFeaturesFragment.appendChild(featureItem);
  }
  // добавляем созданный фрагмент в родительский блок
  offerFeatures.appendChild(offerFeaturesFragment);

  // добавление фотографий по шаблону
  var offerPicture = filledOffer.querySelector('.popup__pictures');
  offerPicture.textContent = '';
  // добавление стилей для контейнера фото, дабы выглядело ок
  offerPicture.style = 'display: flex; flex-wrap: wrap; justify-content: space-between;';
  var templatePicture = document.createElement('li');
  var offerPicturesFragment = document.createDocumentFragment();
  for (i = 0; i < offerItem.offer.photos.length; i++) {
    var pictureItem = templatePicture.cloneNode();
    var imgInPicture = document.createElement('img');
    imgInPicture.src = offerItem.offer.photos[i];
    imgInPicture.width = PHOTO_WIDTH;
    pictureItem.appendChild(imgInPicture);
    offerPicturesFragment.appendChild(pictureItem);
  }
  offerPicture.appendChild(offerPicturesFragment);
  return filledOffer;
};

// добавление карточки предложения
var templateOfferCard = document.querySelector('template').content;
var offerCardsFragment = document.createDocumentFragment();
offerCardsFragment.appendChild(renderOfferCard(offers[0]));
document.querySelector('.map').insertBefore(offerCardsFragment, document.querySelector('.map__filters-container'));
