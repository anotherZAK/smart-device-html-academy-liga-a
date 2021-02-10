'use strict';

(function () {
  var modal = document.querySelector('.modal');
  var callButton = document.querySelector('.main-nav__link--callback');
  var writeUsClose = modal.querySelector('.write-us-form__field-button--close');
  var writeUsForm = modal.querySelector('.write-us-form--modal');
  var userName = modal.querySelector('input[type=text]');
  var userPhone = modal.querySelector('input[type=tel]');
  var userMessage = modal.querySelector('textarea');

  var isStorageSupport = true;
  var storageName = '';
  var storagePhone = '';


  try {
    storageName = localStorage.getItem('userName');
    storagePhone = localStorage.getItem('userPhone');
  } catch (err) {
    isStorageSupport = false;
  }

  callButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    modal.classList.add('modal--show');
    if (storageName) {
      userName.value = storageName;
      userPhone.focus();
    }
    if (storagePhone) {
      userPhone.value = storagePhone;
      userMessage.focus();
    }
  });

  writeUsClose.addEventListener('click', function (evt) {
    evt.preventDefault();
    modal.classList.remove('modal--show');
    modal.classList.remove('modal--error');
  });

  writeUsForm.addEventListener('submit', function (evt) {
    if (!userName.value || !userPhone.value || !userMessage.value) {
      evt.preventDefault();
      modal.classList.remove('modal--error');
      modal.classList.add('modal--error');
    } else {
      if (isStorageSupport) {
        localStorage.setItem('userName', userName.value);
        localStorage.setItem('userPhone', userPhone.value);
      }
    }
  });

  window.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      if (modal.classList.contains('modal--show')) {
        evt.preventDefault();
        modal.classList.remove('modal--show');
        modal.classList.remove('modal--error');
      }
    }
  });
})();
