'use strict';

(function () {

  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var mainPin = document.querySelector('.map__pin--main');
  var noticeForm = document.querySelector('.notice__form');
  var fieldsForm = document.querySelectorAll('fieldset');
  var fieldAddress = document.querySelector('#address');
  var roomsSelect = document.querySelector('#room_number');
  var photoContainer = document.querySelector('.form__photo-container .upload');
  var avatar = document.querySelector('.notice__preview img');
  var defaultAvatarSrc = document.querySelector('.notice__preview img').src;
  var uploadedPhotos = [];
  var mapCard;

  var renderedPins = [];

  var disableFields = function (isDisable) {
    for (var i = 0; i < fieldsForm.length; i++) {
      fieldsForm[i].disabled = isDisable;
    }
  };

  window.pageState = {
    setActive: function () {
      map.classList.remove('map--faded');
      noticeForm.classList.remove('notice__form--disabled');
      disableFields(false);
    },
    setPassive: function () {
      uploadedPhotos = document.querySelectorAll('.uploaded-photo');

      mainPin.style = '';
      mainPin.style.transform = 'translate(0,0)';

      this.hideOfferCard();

      if (uploadedPhotos) {
        [].forEach.call(uploadedPhotos, function (photo) {
          photoContainer.removeChild(photo);
        });
      }

      avatar.src = defaultAvatarSrc;

      window.form.disableCapacityOptions(+roomsSelect.value);

      renderedPins = mapPins.querySelectorAll('.map__pin');
      [].forEach.call(renderedPins, function (pin) {
        if (!pin.classList.contains('map__pin--main')) {
          mapPins.removeChild(pin);
        }
      });

      map.classList.add('map--faded');
      noticeForm.classList.add('notice__form--disabled');

      var pinLocationX = mainPin.offsetLeft + mainPin.offsetWidth / 2;
      var pinLocationY = mainPin.offsetTop + mainPin.offsetHeight / 2;
      fieldAddress.value = pinLocationX + ', ' + pinLocationY;

      disableFields(true);
    },
    hideOfferCard: function () {
      mapCard = document.querySelector('.map__card');
      if (mapCard) {
        map.removeChild(mapCard);
      }
    }
  };

  window.pageState.setPassive();

})();
