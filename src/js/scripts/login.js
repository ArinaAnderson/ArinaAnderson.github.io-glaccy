'use strict';
(function () {
  const login = document.querySelector('.login');
  const loginForm = login.querySelector('.login__form');
  const loginEmail = loginForm.querySelector('.login__input--email');
  const loginLink = login.querySelector('.login__link');

  loginLink.addEventListener('click', function (evt) {
    loginEmail.focus();
  });

  /*const loginWrap = document.querySelector('.login__wrap');
  loginWrap.addEventListener('click', function (evt) {
  	if (!loginForm.contains(evt.target)) {
      
  	}
  });*/
})();
