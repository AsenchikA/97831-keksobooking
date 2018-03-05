'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var lastTimeOut = 0;

  window.debounce = function (callback) {
    if (lastTimeOut) {
      window.clearTimeout(lastTimeOut);
    }
    lastTimeOut = window.setTimeout(callback, DEBOUNCE_INTERVAL);
  };
})();
