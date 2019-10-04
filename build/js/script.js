'use strict';
(function () {
  const keyCodes = {
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    DOWN: 40,
  };
  //const {LEFT, RIGHT, UP, DOWN} = keyCodes;

  const directionsToArrowKeys = {
    horizontal: ['LEFT', 'RIGHT'],
    vertical: ['UP', 'DOWN']
  }
  const {horizontal, vertical} = directionsToArrowKeys;


  // Constructor of arrow keys parametres for different arrays of group elements (like ddHeaders, etc):
  function ArrKeysParams(activeElems) {
    this.range = [0, activeElems.length - 1];
    this.edgeIndexs37 = this.range.slice();
    this.edgeIndexs38 = this.range.slice();
    this.edgeIndexs39 = this.range.slice().reverse();
    this.edgeIndexs40 = this.range.slice().reverse();
  }

  ArrKeysParams.prototype.sign37 = -1;
  ArrKeysParams.prototype.sign39 = 1;
  ArrKeysParams.prototype.sign38 = -1;
  ArrKeysParams.prototype.sign40 = 1;


  function getArrKeyEvtNextIndx(evt, list, ddElemArrParams) {
    const nextElemIndx = list.indexOf(evt.target) === ddElemArrParams['edgeIndexs' + evt.keyCode][0] ?
      ddElemArrParams['edgeIndexs' + evt.keyCode][1] :
      list.indexOf(evt.target) + ddElemArrParams['sign' + evt.keyCode];
    return nextElemIndx;
  }

  window.arrowNav = {
    navigateByArrowKey: function (focusables, focusablesArray, {
      moveLeftRight = true,
      focusableParent = document} = {}
    ) {
      const direction = moveLeftRight ? horizontal : vertical;
      const focusablesArrKeysParams = new ArrKeysParams(focusablesArray);

      focusables.forEach(function (elem) {
        elem.addEventListener('keydown', function (evt) {
          if (evt.keyCode === keyCodes[direction[0]] ||
            evt.keyCode === keyCodes[direction[1]]) {
            let nextElemIndx;
            nextElemIndx = getArrKeyEvtNextIndx(evt, focusablesArray, focusablesArrKeysParams);
            evt.target.blur();
            focusablesArray[nextElemIndx].focus();
          }
        });
      });  
    },
  };

})();

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

'use strict';
(function () {
  const keyCodes = {
    ENTER: 13,
    SPACE: 32,
    TAB: 9,
    SHIFT: 16
  };
  const {ENTER, SPACE, TAB, SHIFT} = keyCodes;

  const ddParents = document.querySelectorAll('.dropdown');
  const ddHeaders = document.querySelectorAll('.dropdown__header');
  const ddOverlay = document.querySelector('.dropdown-overlay');
  let activeEl = null;
  let activeElToggle = false;
  let thisDdcloseBtn = null;

  function unloadingWebsite() {
    console.log(activeEl);
    const tt = document.querySelector('dropdown--focus');
    const uu = document.querySelector('dropdown--over');
    console.log(tt, uu);
    if (tt) {
      tt.classList.remove('dropdown--focus');
    }
    if (uu) {
      uu.classList.remove('dropdown--over');
    }
    //document.body.classList.add("unloaded");
   }


  // function removes/adds focus class on dropdown parent element:  --> UTILS.js
  function toggleDropdown(activity, parentElem) {
    parentElem.classList.toggle('dropdown--' + activity);
  }
  function addClass(activity, parentElem) {
    parentElem.classList.add('dropdown--' + activity);
  }
  function removeClass(activity, parentElem) {
    parentElem.classList.remove('dropdown--' + activity);
  }
  

  function docClickHandler(evt) {
    if (activeEl && !activeEl.contains(evt.target)) {
      closeDdMenu(activeEl);
    }
  }

  function docEscPressHandler(evt) {
    window.utils.isEscPressed(evt, function () {
      const activeElHeader = activeEl.querySelector('.dropdown__header');
      activeElHeader.focus();
      //activeEl.removeEventListener('blur', ddItemBlurHandler, true);//moved to clseDdMenu
      closeDdMenu(activeEl);
    });
  }

  function ddCloseBtnClickHandler(evt) {
    const activeElHeader = activeEl.querySelector('.dropdown__header');
    closeDdMenu(activeEl);
  }

  function openDdMenu(elem) {
    activeElToggle = true;

    addClass('focus', elem);
    elem.addEventListener('blur', ddItemBlurHandler, true);
    activeEl = elem;

    //activeEl.classList.remove('dropdown--over');// last measure for SAFARI
    thisDdcloseBtn = activeEl.querySelector('.dropdown__close-btn');
    if (thisDdcloseBtn) {
      thisDdcloseBtn.classList.remove('dropdown__close-btn--none');
    }

    document.addEventListener('keydown', docEscPressHandler);
  }

  function closeDdMenu(elem) {
    activeElToggle = false;

    removeClass('focus', elem);
    elem.removeEventListener('blur', ddItemBlurHandler, true);
    activeEl = null;

    if (thisDdcloseBtn) {
      thisDdcloseBtn.classList.add('dropdown__close-btn--none');
    }

    document.removeEventListener('keydown', docEscPressHandler);
  }

  function ddItemFocusHandler(evt, btn) {
    if (!evt.currentTarget.classList.contains('dropdown--focus')) {
      openDdMenu(evt.currentTarget);
    }
  }

  function ddItemBlurHandler(evt) {
    console.log('BLUR');
    const blurElem = evt.currentTarget;
    function focusHandler(evtFocus) {
      if (!blurElem.classList.contains(evtFocus.target)) {
        closeDdMenu(blurElem);
      }
      document.removeEventListener('focus', focusHandler, true);
    }
    document.addEventListener('focus', focusHandler, true);
  }

  function ddHeaderEnterSpaceHandler(evt) {
    evt.preventDefault();
    if (!evt.currentTarget.classList.contains('dropdown--focus')) {
      openDdMenu(evt.currentTarget);
    }
  }

// replace toogle for add and remove ('dropdown--focus')

  ddParents.forEach(function (item, key) {
    const ddHeader = item.querySelector('.dropdown__header');
    const ddChild = item.querySelector('.dropdown__child');
    const ddCloseBtn = item.querySelector('.dropdown__close-btn');

    function ddParentMouseOverHadnler(evt) {
      toggleDropdown('over', item);
    }
    function ddParentMouseOutHadnler(evt) {
      toggleDropdown('over', item);
    }

    item.addEventListener('mouseover', ddParentMouseOverHadnler);
    item.addEventListener('mouseout', ddParentMouseOutHadnler);


    //item.addEventListener('blur', ddItemBlurHandler, true);
    item.addEventListener('focus', ddItemFocusHandler, true);

    
    ddHeader.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      //if (activeElToggle) {
        //closeDdMenu(activeEl);
        //ddHeader.blur();
      //} else {
        ddHeader.focus();
      //}//SAFARI FIX*/
    });

    if (ddCloseBtn) {
      ddCloseBtn.addEventListener('click', ddCloseBtnClickHandler);
    }


    ddHeader.addEventListener('keydown', function (evt) {
      window.utils.isEnterPressed(evt, function () {
        evt.preventDefault();
        if (!item.classList.contains('dropdown--focus')) {
          openDdMenu(item);
        }
      });      
    });
    ddHeader.addEventListener('keydown', function (evt) {
      window.utils.isSpacePressed(evt, function () {
        evt.preventDefault();
        if (!item.classList.contains('dropdown--focus')) {
          openDdMenu(item);
        }
      });      
    });

    const ddFocusables = item.querySelectorAll('.dropdown__focusable');
    const ddFocusablesArray = Array.prototype.slice.call(ddFocusables);
    window.arrowNav.navigateByArrowKey(ddFocusables, ddFocusablesArray, {
      moveLeftRight: false,
      focusableParent: item
    });

    window.addEventListener('load', function () {
      console.log('LOAD!!!!');
      ddFocusablesArray.forEach(function (it) {
        if (ddChild.contains(it)) {
          window.utils.defineTabIndex(it, true);
        }
      });
    })
  });

/*window.addEventListener("pagehide", function() {
    unloadingWebsite();
});
window.addEventListener("pageshow", function() {
    // You can use the pageshow function if required to double ensure that everything is reset on the page load.
    // Most of the time the "pagehide" event will provide the solution.
    unloadingWebsite();
});
window.addEventListener("load", function() {
    // You can use the pageshow function if required to double ensure that everything is reset on the page load.
    // Most of the time the "pagehide" event will provide the solution.
    unloadingWebsite();
});*/
  document.addEventListener('click', docClickHandler);
})();

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

'use strict';
(function () {
  var mainNavBtn = document.querySelector('.page-header__btn');
  mainNavBtn.classList.remove('page-header__btn--no-js');


  var breakPoints = [0, 600];
  var devWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;//calculation + addEventL... window.addEventListener('resize', function() {calculation});
  var devWidthBreakpoint = defineDevWidthBreakpoint();//defineDevWidthBreakpoint();//<-- defineDevWidthBreakpoint()
  function defineDevWidthBreakpoint() {
    return devWidth < 600 ? 0 : 600;
  }
  function windowResizeHandler() {
    devWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    devWidthBreakpoint = defineDevWidthBreakpoint();
  }

  var navLists = [];

  function NavList(listClass) {
    this.list = document.querySelector('.' + listClass);
    this.listCloseClass = listClass + '--closed';
  }

  NavList.prototype.openCloseNavList = function () {
    this.list.classList.toggle(this.listCloseClass);
  }

  navLists.push(new NavList('site-list'));
  navLists.push(new NavList('user-list'));
  
  window.addEventListener('resize', function () {
    windowResizeHandler();
  });

  mainNavBtn.addEventListener('click', function () {
    for (var i = 0; i < navLists.length; i++) {
      navLists[i].openCloseNavList();
    }
    mainNavBtn.classList.toggle('page-header__btn--open');
    mainNavBtn.classList.toggle('page-header__btn--close');
    console.log(devWidthBreakpoint);
  });
})();

'use strict';
(function () {
  const keyCodes = {
    ENTER: 13,
    SPACE: 32,
    TAB: 9,
    SHIFT: 16
  };
  const {ENTER, SPACE, TAB, SHIFT} = keyCodes;

  const ppParents = document.querySelectorAll('.popup');
  const ppOverlay = document.querySelector('.dropdown-overlay');
  let activeEl = null;
  let activeElToggle = false;

  function togglePopup(activity, parentElem) {
    parentElem.classList.toggle('popup--' + activity);
  }
  function addClass(activity, parentElem) {
    parentElem.classList.add('popup--' + activity);
  }
  function removeClass(activity, parentElem) {
    parentElem.classList.remove('popup--' + activity);
  }
  

  function docClickHandler(evt) {
    if (activeEl && !activeEl.contains(evt.target)) {
      closePpMenu(activeEl);
    }
  }

  function docEscPressHandler(evt) {
    window.utils.isEscPressed(evt, function () {
      const activeElHeader = activeEl.querySelector('.popup__header');
      activeElHeader.focus();
      closePpMenu(activeEl);
    });
  }

  function ppCloseBtnClickHandler(evt) {
    const activeElHeader = activeEl.querySelector('.popup__header');
    closePpMenu(activeEl);
  }

  function openPpMenu(elem) {
    activeElToggle = true;

    addClass('focus', elem);
    elem.addEventListener('blur', ppItemBlurHandler, true);
    activeEl = elem;

    document.addEventListener('keydown', docEscPressHandler);
  }

  function closePpMenu(elem) {
    activeElToggle = false;

    removeClass('focus', elem);
    elem.removeEventListener('blur', ppItemBlurHandler, true);
    activeEl = null;

    document.removeEventListener('keydown', docEscPressHandler);
  }

  function ppItemFocusHandler(evt, btn) {
    if (!evt.currentTarget.classList.contains('popup--focus')) {
      openPpMenu(evt.currentTarget);
    }
  }

  function ppItemBlurHandler(evt) {
    console.log('BLUR');
    const blurElem = evt.currentTarget;
    function focusHandler(evtFocus) {
      if (!blurElem.classList.contains(evtFocus.target)) {
        closePpMenu(blurElem);
      }
      document.removeEventListener('focus', focusHandler, true);
    }
    document.addEventListener('focus', focusHandler, true);
  }

  ppParents.forEach(function (item, key) {
    item.querySelector('.popup__box').classList.remove('popup__box--no-js');

    const ppHeader = item.querySelector('.popup__header');
    const ppChild = item.querySelector('.popup__child');

    function ppParentMouseOverHadnler(evt) {
      togglePopup('over', item);
    }
    function ppParentMouseOutHadnler(evt) {
      togglePopup('over', item);
    }

    item.addEventListener('mouseover', ppParentMouseOverHadnler);
    item.addEventListener('mouseout', ppParentMouseOutHadnler);


    //item.addEventListener('blur', ddItemBlurHandler, true);
    item.addEventListener('focus', ppItemFocusHandler, true);

    ppHeader.addEventListener('click', function (evt) {//'mousedown'
      if (evt.currentTarget.tagName != 'BUTTON' || evt.target.tagName != 'BUTTON') {
        evt.preventDefault();
      }
      ppHeader.focus();//SAFARI FIX*/
    });

    ppHeader.addEventListener('keydown', function (evt) {
      window.utils.isEnterPressed(evt, function () {
        if (evt.currentTarget.tagName !== 'BUTTON' || evt.target.tagName !== 'BUTTON') {
          evt.preventDefault();
        }
        if (!item.classList.contains('popup--focus')) {
          openPpMenu(item);
        }
      });      
    });
    ppHeader.addEventListener('keydown', function (evt) {
      window.utils.isSpacePressed(evt, function () {
        if (evt.currentTarget.tagName !== 'BUTTON' || evt.target.tagName !== 'BUTTON') {
          evt.preventDefault();
        }
        if (!item.classList.contains('popup--focus')) {
          openPpMenu(item);
        }
      });      
    });
  });
  document.addEventListener('click', docClickHandler);
})();

'use strict';
(function () {
  const searchForm = document.querySelector('.search');
  const searchInput = searchForm.querySelector('.search__input');
  const searchSubmit = searchForm.querySelector('button[type="submit"]'); 

  /*function searchInputChangeHandler(evt) {
    if (searchInput.value.trim()) {
      searchSubmit.disabled = false;
    } else {
      searchSubmit.disabled = true;
    }
  }
  searchInput.addEventListener('change', searchInputChangeHandler);*/
  function searcBtnPressHandler(evt) {
    if (!searchInput.value) {
      evt.preventDefault();
    }
  }

  searchSubmit.addEventListener('click', searcBtnPressHandler);
  
})();

'use strict';
(function () {
  const siteList = document.querySelector('.site-list');
  const siteListLinks = document.querySelectorAll('.site-list__link');
  const siteListLinksArray = Array.prototype.slice.call(siteListLinks);
  window.arrowNav.navigateByArrowKey(siteListLinks, siteListLinksArray, {focusableParent: siteList});
})();

'use strict';
(function () {
  const userList = document.querySelector('.user-list');
  const userListLinks = document.querySelectorAll('.user-list__link');
  const userListLinksArray = Array.prototype.slice.call(userListLinks);
  window.arrowNav.navigateByArrowKey(userListLinks, userListLinksArray, {focusableParent: userList});
})();

'use strict';
(function () {
  const keyCodes = {
    ESC: 27,
    ENTER: 13,
    SPACE: 32,
    TAB: 9,
    SHIFT: 16
  };
  const {ESC, ENTER, SPACE, TAB, SHIFT} = keyCodes;


  window.utils = {
    defineTabIndex: function (elem, disable) {
      elem.tabIndex = disable ? -1 : 0;
    },
    isEscPressed: function (evt, action) {
      if (evt.keyCode === ESC) {
        action();
      }
    },
    isEnterPressed: function (evt, action) {
      if (evt.keyCode === ENTER) {
        action();
      }
    },
    isSpacePressed: function (evt, action) {
      if (evt.keyCode === SPACE) {
        action();
      }
    }
  };

})();
