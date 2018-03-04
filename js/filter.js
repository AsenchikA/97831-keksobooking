'use strict';

(function () {
  var filtersContainer = document.querySelector('.map__filters-container');
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var housingRooms = document.querySelector('#housing-rooms');
  var housingQuests = document.querySelector('#housing-guests');
  var housingFeatures = document.querySelector('#housing-features');

  var PriceRanges = {
    low: {min: 0, max: 9999},
    middle: {min: 10000, max: 49999},
    high: {min: 50000, max: Infinity},
    any: {min: 0, max: Infinity}
  };

  var filteredOffers = [];

  var getConditionResult = function (filterValue, offerValue, isNeedNumberValue) {
    if (filterValue === 'any') {
      return true;
    } else if (isNeedNumberValue) {
      return +filterValue === offerValue;
    } else {
      return filterValue === offerValue;
    }
  };

  var filterByHousingType = function (pin) {
    return getConditionResult(housingType.value, pin.offer.type, false);
  };

  var filterByHousingPrice = function (pin) {
    var range = PriceRanges[housingPrice.value];
    return pin.offer.price >= range.min && pin.offer.price <= range.max;
  };

  var filterByHousingRooms = function (pin) {
    return getConditionResult(housingRooms.value, pin.offer.rooms, true);
  };

  var filterByHousingQuests = function (pin) {
    return getConditionResult(housingQuests.value, pin.offer.guests, true);
  };

  var filterByHousingFeatures = function (pin) {
    var chosenFeatures = housingFeatures.querySelectorAll('input[type=checkbox]:checked');
    if (chosenFeatures.length !== 0) {
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
    return true;
  };

  var onChangeSelect = function () {
    window.pageState.hideOfferCard();
    filteredOffers = window.offers
        .filter(filterByHousingType)
        .filter(filterByHousingPrice)
        .filter(filterByHousingRooms)
        .filter(filterByHousingQuests)
        .filter(filterByHousingFeatures);
    window.onDebounce(window.updatePins(filteredOffers));
  };

  filtersContainer.addEventListener('change', onChangeSelect);
})();
