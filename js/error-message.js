'use strict';

(function () {
  var notificationNode = document.querySelector('.error-message');
  var notificationText = notificationNode.querySelector('.error-message__message');
  var notificationCloseBtn = notificationNode.querySelector('.error-message__close');

  var onCloseNotification = function () {
    notificationNode.classList.add('hidden');
    notificationCloseBtn.removeEventListener('click', onCloseNotification);
  };

  window.showErrorMessage = function (errorMessage) {

    notificationNode.classList.remove('hidden');
    notificationText.textContent = errorMessage;
    notificationCloseBtn.addEventListener('click', onCloseNotification);
  };
})();
