'use strict';

(function () {
  var anchorsContainer = document.querySelector('.company-info__description');

  var handleAnchorClick = function (evt) {
    if (evt.target.classList.value.includes('company-info__link') || evt.target.parentElement.classList.value.includes('company-info__link')) {

      evt.preventDefault();
      if (evt.target.hash) {
        var blockId = evt.target.hash;
      } else if (evt.target.parentElement.hash) {
        blockId = evt.target.parentElement.hash;
      }

      document.querySelector(blockId).scrollIntoView({
        block: 'start',
        behavior: 'smooth'
      });
    }
  };

  anchorsContainer.addEventListener('click', handleAnchorClick);
})();
