'use strict';

(function () {
  var NOT_GUEST_ROOMS_VALUE = 100;
  var NOT_GUEST_CAPACITY_VALUE = 0;

  var form = document.querySelector('.notice__form');

  var fieldPrice = document.querySelector('#price');
  var typeSelect = document.querySelector('#type');
  var fieldTimeIn = document.querySelector('#timein');
  var fieldTimeOut = document.querySelector('#timeout');
  var roomsSelect = document.querySelector('#room_number');
  var capacitySelect = document.querySelector('#capacity');
  var optionsCapacitySelect = document.querySelectorAll('#capacity option');
  var resetButton = document.querySelector('.form__reset');

  var OfferMinPrice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  fieldPrice.min = OfferMinPrice[typeSelect.value];

  typeSelect.addEventListener('change', function (evt) {
    fieldPrice.min = OfferMinPrice[evt.target.value];
  });

  fieldTimeIn.addEventListener('change', function (evt) {
    fieldTimeOut.value = evt.target.value;
  });

  fieldTimeOut.addEventListener('change', function (evt) {
    fieldTimeIn.value = evt.target.value;
  });

  var getCapacitySelectValidity = function () {
    return capacitySelect.value <= roomsSelect.value && +capacitySelect.value !== NOT_GUEST_CAPACITY_VALUE;
  };

  var disableCapacityOptions = function (selectedRoom) {
    [].forEach.call(optionsCapacitySelect, function (option) {
      if (selectedRoom === NOT_GUEST_ROOMS_VALUE) {
        capacitySelect.value = NOT_GUEST_CAPACITY_VALUE;
        option.disabled = true;
        if (+option.value === NOT_GUEST_CAPACITY_VALUE) {
          option.disabled = false;
        }
      } else {
        option.disabled = false;
        if (+option.value === NOT_GUEST_CAPACITY_VALUE) {
          option.disabled = true;
        }
        if (+option.value > selectedRoom) {
          option.disabled = true;
        }
        if (!getCapacitySelectValidity()) {
          capacitySelect.setCustomValidity('Выберете доступное значение');
        } else {
          capacitySelect.setCustomValidity('');
        }
      }
    });
  };

  capacitySelect.addEventListener('change', function () {
    if (getCapacitySelectValidity()) {
      capacitySelect.setCustomValidity('');
    }
  });

  var selectedRoomValue = 0;

  roomsSelect.addEventListener('change', function (evt) {
    selectedRoomValue = evt.target.value;
    disableCapacityOptions(+selectedRoomValue);
  });

  var onSuccessSaveForm = function () {
    form.reset();
    window.pageState.setPassive();
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var formData = new FormData(form);
    window.getUploadedPhotos().forEach(function (pic) {
      formData.append('files', pic, pic.name);
    });
    window.backend.save(formData, onSuccessSaveForm, window.showErrorMessage);
  });

  resetButton.addEventListener('click', function () {
    window.pageState.setPassive();
  });

  resetButton.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.Constants.ENTER_KEYCODE) {
      window.pageState.setPassive();
    }
  });

  window.form = {
    disableCapacityOptions: disableCapacityOptions
  };

})();
