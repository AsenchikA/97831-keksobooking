'use strict';

(function () {

  var photoContainer = document.querySelector('.form__photo-container .upload');
  var draggedItem = null;
  var uploadedPhotos = [];
  var indexEvt = 0;
  var indexDraggedItem = 0;

  photoContainer.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
    }
  });


  photoContainer.addEventListener('dragover', function (evt) {
    evt.preventDefault();
  });
  photoContainer.addEventListener('drop', function (evt) {
    uploadedPhotos = [].slice.call(document.querySelectorAll('.uploaded-photo'));
    indexEvt = uploadedPhotos.indexOf(evt.target);
    indexDraggedItem = uploadedPhotos.indexOf(draggedItem);

    if (indexDraggedItem > indexEvt) {
      photoContainer.insertBefore(draggedItem, evt.target);
    } else {
      photoContainer.insertBefore(draggedItem, evt.target.nextSibling);
    }
    evt.preventDefault();
  });
  photoContainer.addEventListener('dragenter', function (evt) {
    evt.preventDefault();
  });

  photoContainer.addEventListener('dragleave', function (evt) {
    evt.preventDefault();
  });
})();
