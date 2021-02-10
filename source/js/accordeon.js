'use strict';

(function () {
  var nameLength = 13;
  var btnAccordeonContainer = document.querySelector('.page-footer-grid');
  var accordeons = btnAccordeonContainer.querySelectorAll('.accordeon');
  var accordeonLists = btnAccordeonContainer.querySelectorAll('.accordeon__list');

  for (var i = 0; i < accordeons.length; i++) {
    accordeons[i].classList.remove('accordeon--open');
    accordeonLists[i].classList.add('accordeon__list--hide');
  }

  btnAccordeonContainer.addEventListener('click', function (evt) {

    if (evt.target.classList.contains('accordeon')) {

      var accordeonList = document.querySelector('.' + evt.target.classList.value.slice(0, nameLength) + ' + ul');
      evt.target.classList.toggle('accordeon--open');
      accordeonList.classList.toggle('accordeon__list--hide');
    }
  });
})();
