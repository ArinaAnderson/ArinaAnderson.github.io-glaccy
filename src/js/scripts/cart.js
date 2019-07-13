'use strict';
(function () {
  var ENTER_KEYCODE = 13;
  var SPACE_KEYCODE = 32;
  var ESC_KEYCODE = 27;
  var TAB_KEYCODE = 9;
  var SHIFT_KEYCODE = 16;
  var cart = document.querySelector('.cart');
  var cartLink = cart.querySelector('a');
  var cartPopup = document.querySelector('.cart__popup');
  var cartSubmit = cartPopup.querySelector('button');
  var cartList = cartPopup.querySelector('ul');
  var cartForm = cartPopup.querySelector('form');
  var cartLastItem = cartForm.lastElementChild;

  var backMove = false; // false - no Shift pressed

  var elemsToClasses = {
    cartParent: 'cart--opened',
    cartPopupOpened: 'cart__popup--opened',
    cartPopupClosed: 'cart__popup--closed'
  };

  function cartItemTabPressHandler(evt, cartParent, cartPopup) {
    // pressing Tab on the last link of dropdwon list closes the dropdown in case the focus moves forward, out of the dropdown list:
    if (!backMove) {
      toggleCartPopup(cartParent, cartPopup)
    }
  }

  function cartItemShiftPressHandler(evt) {
    backMove = true;
   
    function cartItemTabShiftPressHandler(evtTab) {
      //when Shift is held down, pressing Tab does not close the dropdwon list anymore:
      document.removeEventListener('keyup', cartItemTabPressHandler);
      backMove = false;
    }

    document.addEventListener('keyup', cartItemTabShiftPressHandler);
  }

  function toggleCartPopup(cartParent, cartPopup) {
    cartParent.classList.toggle(elemsToClasses.cartParent);
    cartPopup.classList.toggle(elemsToClasses.cartPopupClosed);
    cartPopup.classList.toggle(elemsToClasses.cartPopupOpened);
  }

  cart.addEventListener('mouseover', function (evt) {
    cartPopup.classList.add(elemsToClasses.cartPopupOpened);
    cartPopup.classList.remove(elemsToClasses.cartPopupClosed);
  });

  cart.addEventListener('mouseout', function (evt) {
    cartPopup.classList.remove(elemsToClasses.cartPopupOpened);
    cartPopup.classList.add(elemsToClasses.cartPopupClosed);
  }); 

  cartLink.addEventListener('keypress', function (evt) {
    if (evt.keyCode == SPACE_KEYCODE) {
      evt.preventDefault();
      toggleCartPopup(cart, cartPopup);
    }
  });

  cartSubmit.addEventListener('click', function (evt) {
    if (!cartList.children.length) {
      evt.preventDefault();
      toggleCartPopup(cart, cartPopup);
      /*search.classList.toggle('search--opened');
      searchPopup.classList.toggle('search__popup--opened');
      searchPopup.classList.toggle('search__popup--closed');*/
      return;
    }
    toggleCartPopup(cart, cartPopup);
  });

  cartSubmit.addEventListener('keydown', function (evt) {
    if (evt.keyCode == SPACE_KEYCODE) {
      if (!cartList.children.length) {
        evt.preventDefault();
        toggleCartPopup(cart, cartPopup);
        return;
      }
      toggleCartPopup(cart, cartPopup);
    }
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode == ESC_KEYCODE && cart.classList.contains('cart--opened')) {
      toggleCartPopup(cart, cartPopup);
    }
  });

  document.addEventListener('mousedown', function (evt) {
    if (!cart.contains(evt.target) && !cartPopup.contains(evt.target) && evt.target !== cart && evt.target !== cartPopup && cart.classList.contains('cart--opened')) {
      toggleCartPopup(cart, cartPopup);
    }
  });

  cartLastItem.addEventListener('keydown', function (evt) {
    if (evt.keyCode === TAB_KEYCODE) {
      cartItemTabPressHandler(evt);
    }
    if (evt.keyCode === SHIFT_KEYCODE) {
      cartItemShiftPressHandler(evt);
    }
  });

})();
