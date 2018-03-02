'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins');

  var offerId = 0;

  var getOfferId = function (evt) {
    if (evt.path) {
      return evt.path[1].id.substr(-1);
    } else {
      return evt.target.id.substr(-1);
    }
  };

  mapPins.addEventListener('click', function (evt) {
    offerId = getOfferId(evt);
    if (offerId) {
      showCardPopup(offerId);
    }
  });
  mapPins.addEventListener('keydown', function (evt) {
    offerId = getOfferId(evt);
    if (offerId && evt.keyCode === window.Constants.ENTER_KEYCODE) {
      showCardPopup(offerId);
    }
  });

  var onPressCloseCard = function (evt) {
    if (evt.keyCode === window.ESC_KEYCODE) {
      hideCardPopup();
    }
  };

  var hideCardPopup = function () {
    window.pageState.hideOfferCard();
    document.removeEventListener('keydown', onPressCloseCard);
  };


  // добавление карточки предложения
  var showCardPopup = function (numberOfOffer) {
    var offerCardsFragment = document.createDocumentFragment();
    offerCardsFragment.appendChild(window.renderOfferCard(window.offers[numberOfOffer]));
    if (document.querySelector('.map>.map__card')) {
      hideCardPopup();
    }
    document.querySelector('.map').insertBefore(offerCardsFragment, document.querySelector('.map__filters-container'));

    var popupCloseButton = document.querySelector('.popup__close');
    popupCloseButton.addEventListener('click', function () {
      hideCardPopup();
    });
    document.addEventListener('keydown', onPressCloseCard);
  };
})();

