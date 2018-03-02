'use strict';

(function () {
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingQuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelector('#housing-features');
  var housingFeaturesInputs = housingFeatures.querySelectorAll('input');

  var PriceRanges = {
    low: {min: 0, max: 9999},
    middle: {min: 10000, max: 49999},
    high: {min: 50000, max: Infinity},
    any: {min: 0, max: Infinity}
  };

  var filteredOffers = [];

  var filterByHousingType = function (pin) {
    return housingType.value === 'any' ? true : housingType.value === pin.offer.type;
  };

  var filterByHousingPrice = function (pin) {
    var range = PriceRanges[housingPrice.value];
    return pin.offer.price >= range.min && pin.offer.price <= range.max;
  };

  var filterByHousingRooms = function (pin) {
    return housingRooms.value === 'any' ? true : +housingRooms.value === pin.offer.rooms;
  };

  var filterByHousingQuests = function (pin) {
    return housingQuests.value === 'any' ? true : +housingQuests.value === pin.offer.guests;
  };

  var filterByHousingFeatures = function (pin) {
    var chosenFeatures = [].filter.call(housingFeaturesInputs, function (elem) {
      return elem.checked;
    });
    if (chosenFeatures.length === 0) {
      return true;
    } else {
      var existenceChosenFeatures = 0;
      [].forEach.call(chosenFeatures, function (chosenFeature) {
        pin.offer.features.forEach(function (offerFeature) {
          if (chosenFeature.value === offerFeature) {
            existenceChosenFeatures++;
          }
        });
      });
      return existenceChosenFeatures === chosenFeatures.length;
    }
  };

  var onChangeSelect = function () {
    window.pageState.hideOfferCard();
    filteredOffers = window.offers
        .filter(filterByHousingType)
        .filter(filterByHousingPrice)
        .filter(filterByHousingRooms)
        .filter(filterByHousingQuests)
        .filter(filterByHousingFeatures);
    window.debounce(window.updatePins(filteredOffers));
  };

  housingType.addEventListener('change', onChangeSelect);
  housingPrice.addEventListener('change', onChangeSelect);
  housingRooms.addEventListener('change', onChangeSelect);
  housingQuests.addEventListener('change', onChangeSelect);
  housingFeatures.addEventListener('change', onChangeSelect);
})();
