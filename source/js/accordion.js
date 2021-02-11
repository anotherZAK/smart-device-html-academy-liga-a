'use strict';

(function () {
  var nameLength = 13;
  var btnAccordionContainer = document.querySelector('.page-footer-grid');
  var accordions = btnAccordionContainer.querySelectorAll('.accordion');
  var accordionLists = btnAccordionContainer.querySelectorAll('.accordion-list');

  for (var i = 0; i < accordions.length; i++) {
    accordions[i].classList.remove('accordion--open');
    accordionLists[i].classList.add('accordion-list--hide');
  }

  btnAccordionContainer.addEventListener('click', function (evt) {

    if (evt.target.classList.contains('accordion')) {

      var accordionList = document.querySelector('.' + evt.target.classList.value.slice(0, nameLength) + ' + ul');
      evt.target.classList.toggle('accordion--open');
      accordionList.classList.toggle('accordion-list--hide');
    }
  });
})();
