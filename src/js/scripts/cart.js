'use strict';
(function () {
  const cart = document.querySelector('.cart');
  const cartForm = cart.querySelector('.cart__form');
  const cartSubmit = cartForm.querySelector('button[type="submit"]');
  const cartLink = cart.querySelector('.cart__link');

  cartLink.addEventListener('click', function (evt) {
    cartSubmit.focus();
  });
})();
