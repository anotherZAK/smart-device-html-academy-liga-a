'use strict';

(function () {
  var body = document.querySelector('.page-body');
  var modal = document.querySelector('.modal');
  var callButton = document.querySelector('.link-modal--callback');
  var writeUsClose = modal.querySelector('.write-us-form__field-button--close');
  var writeUsForm = modal.querySelector('.write-us-form--modal');
  var userName = modal.querySelector('input[type=text]');
  var userPhone = modal.querySelector('input[type=tel]');
  var userMessage = modal.querySelector('textarea');

  var isStorageSupport = true;
  var storageName = '';
  var storagePhone = '';

  var overlayClickHandle = function (evt) {
    if (modal.classList.contains('modal--show') && !evt.target.classList.contains('link-modal--callback')) {
      modal.classList.remove('modal--show');
      modal.classList.remove('modal--error');
      body.classList.remove('page-body--block-modal');
    }

    modal.addEventListener('click', function (evtModal) {
      evtModal.stopPropagation();
    });
  };

  try {
    storageName = localStorage.getItem('userName');
    storagePhone = localStorage.getItem('userPhone');
  } catch (err) {
    isStorageSupport = false;
  }

  callButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    modal.classList.add('modal--show');
    body.classList.add('page-body--block-modal');

    if (storageName) {
      userName.value = storageName;
      userPhone.focus();
    } else if (storagePhone) {
      userPhone.value = storagePhone;
      userMessage.focus();
    } else {
      userName.focus();
    }

    document.addEventListener('click', overlayClickHandle);
  });

  writeUsClose.addEventListener('click', function (evt) {
    evt.preventDefault();
    modal.classList.remove('modal--show');
    modal.classList.remove('modal--error');
    body.classList.remove('page-body--block-modal');
    document.removeEventListener('click', overlayClickHandle);
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
        body.classList.remove('page-body--block-modal');
        document.removeEventListener('click', overlayClickHandle);
      }
    }
  });
})();
