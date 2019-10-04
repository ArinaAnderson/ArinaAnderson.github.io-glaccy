'use strict';
(function () {/*
  var ENTER_KEYCODE = 13;
  var SPACE_KEYCODE = 32;
  var ESC_KEYCODE = 27;
  var TAB_KEYCODE = 9;
  var SHIFT_KEYCODE = 16;

  var login = document.querySelector('.login');
  var loginLink = login.querySelector('a');
  var loginPopup = document.querySelector('.login__popup');
  var loginSubmit = loginPopup.querySelector('button');
  var loginInput = loginPopup.querySelectorAll('input[type="text"]');

  var elemsToClasses = {
    loginParent: 'login--opened',
    loginPopupOpened: 'login__popup--opened',
    loginPopupClosed: 'login__popup--closed'
  };

  function toggleLoginPopup(loginParent, loginPopup) {
    loginParent.classList.toggle(elemsToClasses.loginParent);
    loginPopup.classList.toggle(elemsToClasses.loginPopupClosed);
    loginPopup.classList.toggle(elemsToClasses.loginPopupOpened);
  }

  loginLink.addEventListener('click', function (evt) {
    evt.preventDefault();
    toggleLoginPopup(login, loginPopup);
  });

  loginLink.addEventListener('keypress', function (evt) {
    if (evt.keyCode == SPACE_KEYCODE) {
      evt.preventDefault();
      toggleLoginPopup(login, loginPopup);
    }
  });

  loginSubmit.addEventListener('click', function (evt) {
    if (!loginInput.value) {
      evt.preventDefault();
      toggleLoginPopup(login, loginPopup);
      return;
    }
    toggleLoginPopup(login, loginPopup);
  });

  loginSubmit.addEventListener('keydown', function (evt) {
    if (evt.keyCode == SPACE_KEYCODE) {
      if (!loginInput.value) {
        evt.preventDefault();
        toggleLoginPopup(login, loginPopup);
        return;
      }
      toggleLoginPopup(login, loginPopup);
    }
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode == ESC_KEYCODE && login.classList.contains('login--opened')) {
      toggleLoginPopup(login, loginPopup);
    }
  });

  document.addEventListener('mousedown', function (evt) {
    if (!login.contains(evt.target) && !loginPopup.contains(evt.target) && evt.target !== login && evt.target !== loginPopup && login.classList.contains('login--opened')) {
      toggleLoginPopup(login, loginPopup);
    }
  });
*/
})();
