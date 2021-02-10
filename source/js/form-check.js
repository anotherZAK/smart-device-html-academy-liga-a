'use strict';

(function () {
  var iMask = require(`imask`);
  var userTel = document.querySelectorAll('input[type=tel]');

  var maskOptions = {
    mask: '+{7}(000)000-00-00'
  };

  for (var i = 0; i < userTel.length; i++) {
    var mask = IMask(userTel[i], maskOptions);
  }
})();
