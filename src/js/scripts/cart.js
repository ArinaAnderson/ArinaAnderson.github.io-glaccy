'use strict';
(function () {/*
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

  var cartLinkBackMove = false; // false - no Shift pressed
  var cartBackMove = false;

  //to redo later with constructor all these toggleParams objects:
  //*classes cart and cart__popup +  '--opened', '--closed'
  var cartToggleParams = {
    toggleParent: 'cart--opened',
    toggleChildOpened: 'cart__popup--opened',
    toggleChildClosed: 'cart__popup--closed',
  };
  
  var backMoves = {
    'cart': false,
    'cart__popup': false
  };

  var elemsToClasses = {
    cartParent: 'cart--opened',
    cartPopupOpened: 'cart__popup--opened',
    cartPopupClosed: 'cart__popup--closed'
  };

  //closure to create different togglers:
  function defineToggler(toggleParent, toggleChild, toggleParams) {
    return function() {
      toggleParent.classList.toggle(toggleParams.toggleParent);
      toggleChild.classList.toggle(toggleParams.toggleChildClosed);
      toggleChild.classList.toggle(toggleParams.toggleChildOpened);
    }
  }

  var toggleCart = defineToggler(cart, cartPopup, cartToggleParams);
function doTest() {
  alert('ddddd');
}
  // toggleElemClass is either 'cart' (toggleParent class)  or  'cart__popup' (toggleChild class):
  function itemTabPressHandler(toggleElemClass, callback) {
    // pressing Tab on the last link of dropdwon list closes the dropdown in case the focus moves forward, out of the dropdown list:
    if (!backMoves[toggleElemClass]) {
      callback();
    }
  }

  function itemShiftPressHandler(toggleElemClass) {
    backMoves[toggleElemClass] = true;
   
    function itemTabShiftPressHandler() {
      //when Shift is held down, pressing Tab does not close the dropdwon list anymore:
      document.removeEventListener('keyup', itemTabPressHandler);
      backMoves[toggleElemClass] = false;
    }
    document.addEventListener('keyup', itemTabShiftPressHandler);
  }

  cartLastItem.addEventListener('keydown', function (evt) {
    //this is a handler cartLastItemTabHandler(evt): OR  even for both the same
    if (evt.keyCode === TAB_KEYCODE) {
      itemTabPressHandler('cart__popup', toggleCart);
    }
    if (evt.keyCode === SHIFT_KEYCODE) {
      itemShiftPressHandler('cart__popup');
    }
  });

  cartLink.addEventListener('keydown', function (evt) {
    if (evt.keyCode === TAB_KEYCODE) {
      itemTabPressHandler('cart', toggleCart);
    }
    if (evt.keyCode === SHIFT_KEYCODE) {
      itemShiftPressHandler('cart');
      
    }
  });



  cart.addEventListener('mouseover', function (evt) {
    cartPopup.classList.add(elemsToClasses.cartPopupOpened);
    cartPopup.classList.remove(elemsToClasses.cartPopupClosed);
  });

  cart.addEventListener('mouseout', function (evt) {
    cartPopup.classList.remove(elemsToClasses.cartPopupOpened);
    cartPopup.classList.add(elemsToClasses.cartPopupClosed);
  });

 

  cartSubmit.addEventListener('click', function (evt) {
    if (!cartList.children.length) {
      evt.preventDefault();
      toggleCart();
      return;
    }
    toggleCart();
  });

  cartSubmit.addEventListener('keydown', function (evt) {
    if (evt.keyCode == SPACE_KEYCODE || evt.keyCode == ENTER_KEYCODE) {
      evt.preventDefault();
      if (!cartList.children.length) {
        toggleCart();
        return;
      }
      toggleCart();
    }
  });*/

/*it is not needed since cart popup gets activated by hovering
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode == ESC_KEYCODE && cart.classList.contains('cart--opened')) {
      toggleCartPopup(cart, cartPopup);
    }
  });*/

  /*cart popup works on hover:
  document.addEventListener('mousedown', function (evt) {
    if (!cart.contains(evt.target) && !cartPopup.contains(evt.target) && evt.target !== cart && evt.target !== cartPopup && cart.classList.contains('cart--opened')) {
      toggleCartPopup(cart, cartPopup);
    }
  });*/


})();
