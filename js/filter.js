'use strict';

(function () {
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingQuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelector('#housing-features');
  var housingFeaturesInputs = housingFeatures.querySelectorAll('input');

  var priceBorders = {
    low: 10000,
    high: 50000
  };

  var offers = [];
  var filteredOffers = [];

  var byHousingType = function (pin) {
    return housingType.value === 'any' ? true : housingType.value === pin.offer.type;
  };

  var byHousingPrice = function (pin) {
    if (housingPrice.value === 'any') {
      return true;
    } else if (housingPrice.value === 'low' && pin.offer.price < priceBorders.low ||
    housingPrice.value === 'middle' && pin.offer.price >= priceBorders.low && pin.offer.price <= priceBorders.high ||
    housingPrice.value === 'high' && pin.offer.price > priceBorders.high) {
      return true;
    }
    return false;
  };

  var byHousingRooms = function (pin) {
    return housingRooms.value === 'any' ? true : +housingRooms.value === pin.offer.rooms;
  };

  var byHousingQuests = function (pin) {
    return housingQuests.value === 'any' ? true : +housingQuests.value === pin.offer.guests;
  };

  var byHousingFeatures = function (pin) {
    var choisenFeatures = [].filter.call(housingFeaturesInputs, function (elem) {
      return elem.checked;
    });
    if (choisenFeatures.length === 0) {
      return true;
    } else {
      var existenceChoisenFeatures = 0;
      [].forEach.call(choisenFeatures, function (choisenFeature) {
        pin.offer.features.forEach(function (offerFeature) {
          if (choisenFeature.value === offerFeature) {
            existenceChoisenFeatures++;
          }
        });
      });
      return existenceChoisenFeatures === choisenFeatures.length;
    }
  };

  var onChangeSelect = function () {
    window.pageState.hideOfferCard();
    offers = window.offers.slice();
    filteredOffers = offers
        .filter(byHousingType)
        .filter(byHousingPrice)
        .filter(byHousingRooms)
        .filter(byHousingQuests)
        .filter(byHousingFeatures);
    window.debounce(window.updatePins(filteredOffers));
  };

  housingType.addEventListener('change', onChangeSelect);
  housingPrice.addEventListener('change', onChangeSelect);
  housingRooms.addEventListener('change', onChangeSelect);
  housingQuests.addEventListener('change', onChangeSelect);
  housingFeatures.addEventListener('change', onChangeSelect);
})();
