'use strict';

(function () {

  var SUCCESS_CODE = 200;
  var XHR_TIMEOUT = 10000;
  var LOADING_DATA_URL = 'https://js.dump.academy/keksobooking/data';
  var SAVE_FORM_URL = 'https://js.dump.academy/keksobooking';

  var sendRequest = function (url, type, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = XHR_TIMEOUT;

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onLoad(xhr.response);
      } else {
        onError('статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open(type, url);
    if (data) {
      xhr.send(data);
    } else {
      xhr.send();
    }
  };
  window.backend = {
    load: function (onLoad, onError) {
      sendRequest(LOADING_DATA_URL, 'GET', onLoad, onError);
    },
    save: function (data, onLoad, onError) {
      sendRequest(SAVE_FORM_URL, 'POST', onLoad, onError, data);
    }
  };
})();
