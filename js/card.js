'use strict';

(function () {

  var PHOTO_WIDTH = 100;

  // заполнение вспомогательных данных для карточки предложения
  var OfferTypes = {
    bungalo: 'Бунгало',
    house: 'Дом',
    flat: 'Квартира'
  };

  var getOfferFeatures = function (offerItem) {
    var templateFeature = document.createElement('li');
    templateFeature.classList.add('feature');
    var offerFeaturesFragment = document.createDocumentFragment();

    for (var i = 0; i < offerItem.offer.features.length; i++) {
      var featureItem = templateFeature.cloneNode();
      featureItem.classList.add('feature--' + offerItem.offer.features[i]);
      offerFeaturesFragment.appendChild(featureItem);
    }

    return offerFeaturesFragment;
  };

  var getOfferPictures = function (offerItem) {
    var templatePicture = document.createElement('li');
    var offerPicturesFragment = document.createDocumentFragment();

    for (var i = 0; i < offerItem.offer.photos.length; i++) {
      var pictureItem = templatePicture.cloneNode();
      var imgInPicture = document.createElement('img');
      imgInPicture.src = offerItem.offer.photos[i];
      imgInPicture.width = PHOTO_WIDTH;
      pictureItem.appendChild(imgInPicture);
      offerPicturesFragment.appendChild(pictureItem);
    }

    return offerPicturesFragment;
  };

  var templateOfferCard = document.querySelector('template').content.querySelector('article');

  // заполнение данными карточки товара
  window.renderOfferCard = function (offerItem) {
    var filledOffer = templateOfferCard.cloneNode(true);

    var offerDetails = filledOffer.querySelectorAll('p');

    filledOffer.querySelector('h3').textContent = offerItem.offer.title;
    offerDetails[0].firstChild.textContent = offerItem.offer.address;
    offerDetails[1].textContent = offerItem.offer.price + ' \u20BD/ночь';
    filledOffer.querySelector('h4').textContent = OfferTypes[offerItem.offer.type];
    offerDetails[2].textContent = offerItem.offer.rooms + ' комнаты для ' + offerItem.offer.guests + ' гостей';
    offerDetails[3].textContent = 'Заезд после ' + offerItem.offer.checkin + ', выезд до ' + offerItem.offer.checkout;
    filledOffer.querySelector('.popup__avatar').src = offerItem.author.avatar;
    offerDetails[4].textContent = offerItem.offer.description;

    var offerFeaturesContainer = filledOffer.querySelector('.popup__features');
    offerFeaturesContainer.textContent = '';
    offerFeaturesContainer.appendChild(getOfferFeatures(offerItem));

    var offerPictureContainer = filledOffer.querySelector('.popup__pictures');
    offerPictureContainer.textContent = '';
    offerPictureContainer.style = 'display: flex; flex-wrap: wrap; justify-content: space-between;';
    offerPictureContainer.appendChild(getOfferPictures(offerItem));

    return filledOffer;
  };
})();
