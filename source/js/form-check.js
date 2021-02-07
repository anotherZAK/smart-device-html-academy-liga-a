'use strict';

(function () {
  var iMask = require(`imask`)
  var userTel = document.querySelector('#write-us-form-user-tel-id');

  var maskOptions = {
    mask: '+{7}(000)000-00-00'
  };
  var mask = IMask(userTel, maskOptions);
})();
