'use strict';

(function () {
  var nameLength = 13;
  var btnAccordionContainer = document.querySelector('.page-footer-grid');
  var accordions = btnAccordionContainer.querySelectorAll('.accordion');
  var accordionLists = btnAccordionContainer.querySelectorAll('.accordion-list');

  for (var i = 0; i < accordions.length; i++) {
    accordions[i].classList.remove('accordion--open');
    accordionLists[i].classList.add('accordion-list--close');
  }

  btnAccordionContainer.addEventListener('click', function (evt) {

    if (evt.target.classList.contains('accordion')) {
      var accordionsOpen = document.querySelectorAll('.accordion--open');

      var accordionList = document.querySelector('.' + evt.target.classList.value.slice(0, nameLength) + ' + ul');
      evt.target.classList.toggle('accordion--open');
      accordionList.classList.toggle('accordion-list--close');

      for (var j = 0; j < accordionsOpen.length; j++) {
        if (accordionsOpen[j].classList.value !== 'accordion--02 accordion' && accordionsOpen[j].classList.value !== 'accordion--01 accordion') {
          accordionsOpen[j].classList.toggle('accordion--open');
        }

        var accordionLists01 = btnAccordionContainer.querySelector('.accordion-list--01');
        var accordionLists02 = btnAccordionContainer.querySelector('.accordion-list--02');

        if (evt.target.classList.contains('accordion--01')) {
          accordionLists02.classList.add('accordion-list--close');
        }

        if (evt.target.classList.contains('accordion--02')) {
          accordionLists01.classList.add('accordion-list--close');
        }
      }
    }
  });
})();
