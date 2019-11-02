'use strict';
(function () {
  const keyCodes = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
  };

  const directionsToArrKeys = {
    horizontal: ['LEFT', 'RIGHT'],
    vertical: ['UP', 'DOWN']
  }
  const {horizontal, vertical} = directionsToArrKeys;

  // Constructor of arrow-keys parametres for different arrays of active elements (like ddHeaders, ppHeaders, etc):
  function ArrKeysParams(activeElems) {
    this.range = [0, activeElems.length - 1];
    this.edgeIndexs37 = this.range.slice();
    this.edgeIndexs38 = this.range.slice();
    this.edgeIndexs39 = this.range.slice().reverse();
    this.edgeIndexs40 = this.range.slice().reverse();
  }

  // moving UP and LEFT: the index of the next element is getting smaller
  // moving DOWN and RIGHT: the index of the next element is getting bigger
  ArrKeysParams.prototype.sign37 = -1;
  ArrKeysParams.prototype.sign38 = -1;
  ArrKeysParams.prototype.sign39 = 1;
  ArrKeysParams.prototype.sign40 = 1;


  function getNextIndx(evt, focusablesList, arrKeysParams) {
    const nextElemIndx = focusablesList.indexOf(evt.target) === arrKeysParams['edgeIndexs' + evt.keyCode][0] ?
      arrKeysParams['edgeIndexs' + evt.keyCode][1] :
      focusablesList.indexOf(evt.target) + arrKeysParams['sign' + evt.keyCode];
    return nextElemIndx;
  }

  window.arrowNav = {
    navigateByArrowKey: function (focusables, focusablesArray, {
      moveLeftRight = true, // this parametre defines if the navigation is horizontal or vertical
      focusableParent = document} = {}
    ) {
      const direction = moveLeftRight ? horizontal : vertical;
      const arrKeysParams = new ArrKeysParams(focusablesArray);

      focusables.forEach(function (elem) {
        elem.addEventListener('keydown', function (evt) {
          if (evt.keyCode === keyCodes[direction[0]] ||
            evt.keyCode === keyCodes[direction[1]]) {
            let nextElemIndx;
            nextElemIndx = getNextIndx(evt, focusablesArray, arrKeysParams);
            evt.target.blur();
            focusablesArray[nextElemIndx].focus();
          }
        });
      });  
    },
  };

})();

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

  function docClickHandler(evt) {
    if (activeEl && !activeEl.contains(evt.target)) {
      closeDdMenu(activeEl);
    }
  }

  function docEscPressHandler(evt) {
    window.utils.isEscPressed(evt, function () {
      const activeElHeader = activeEl.querySelector('.dropdown__header');
      activeElHeader.focus();
      closeDdMenu(activeEl);
    });
  }

  function ddCloseBtnClickHandler(evt) {
    closeDdMenu(activeEl);
  }

  function openDdMenu(elem) {
    activeElToggle = true;
    //addClass('focus', elem);
    window.utils.addClassModifier(elem, 'dropdown', 'focus');
    elem.addEventListener('blur', ddItemBlurHandler, true);
    activeEl = elem;
    document.addEventListener('keydown', docEscPressHandler);
  }

  function closeDdMenu(elem) {
    activeElToggle = false;

    //removeClass('focus', elem);
    window.utils.removeClassModifier(elem, 'dropdown', 'focus');
    elem.removeEventListener('blur', ddItemBlurHandler, true);
    activeEl = null;
    document.removeEventListener('keydown', docEscPressHandler);
  }

  function ddItemFocusHandler(evt, btn) {
    if (!evt.currentTarget.classList.contains('dropdown--focus')) {
      openDdMenu(evt.currentTarget);
    }
  }

  function ddItemBlurHandler(evt) {
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

  ddParents.forEach(function (item, key) {
    const ddHeader = item.querySelector('.dropdown__header');
    const ddChild = item.querySelector('.dropdown__child');
    const ddCloseBtn = item.querySelector('.dropdown__close-btn');

    function ddParentMouseOverHadnler(evt) {
      window.utils.toggleElem(item, 'dropdown', 'over');
    }
    function ddParentMouseOutHadnler(evt) {
      window.utils.toggleElem(item, 'dropdown', 'over');
    }

    item.addEventListener('mouseover', ddParentMouseOverHadnler);
    item.addEventListener('mouseout', ddParentMouseOutHadnler);
    


    //item.addEventListener('blur', ddItemBlurHandler, true);
    item.addEventListener('focus', ddItemFocusHandler, true);

    item.addEventListener('touchstart', function () {
      item.removeEventListener('mouseover', ddParentMouseOverHadnler);
      item.removeEventListener('mouseout', ddParentMouseOutHadnler);
      if (ddCloseBtn) {
        ddCloseBtn.classList.remove('dropdown__close-btn--none');
      }
    });

    if (ddCloseBtn) {
      ddCloseBtn.addEventListener('click', ddCloseBtnClickHandler);
    }

    
    ddHeader.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      ddHeader.focus();
    });

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
      ddFocusablesArray.forEach(function (it) {
        if (ddChild.contains(it)) {
          window.utils.defineTabIndex(it, true);
        }
      });
    })
  });

  document.addEventListener('click', docClickHandler);
})();

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

'use strict';
(function () {
  // no-js backup
  const mainNavBtn = document.querySelector('.page-header__btn');
  mainNavBtn.classList.remove('page-header__btn--no-js');
  const userList = document.querySelector('.user-list').classList.add('user-list--closed');
  const siteList = document.querySelector('.site-list').classList.add('site-list--closed');

  let devWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;


  function windowResizeHandler() {
    devWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  }

  let navLists = [];

  function NavList(listClass) {
    this.list = document.querySelector('.' + listClass);
    this.listCloseClass = listClass + '--closed';
  }

  NavList.prototype.openCloseNavList = function () {
    this.list.classList.toggle(this.listCloseClass);
  }

  navLists.push(new NavList('site-list'));
  navLists.push(new NavList('user-list'));

  mainNavBtn.addEventListener('click', function () {
    for (let i = 0; i < navLists.length; i++) {
      navLists[i].openCloseNavList();
    }
    mainNavBtn.classList.toggle('page-header__btn--open');
    mainNavBtn.classList.toggle('page-header__btn--close');
  });

  window.addEventListener('resize', function () {
    windowResizeHandler();
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

  // pp - abbreviation for popup;

  const ppParents = document.querySelectorAll('.popup');
  const ppOverlay = document.querySelector('.popup-overlay');
  let activeEl = null;
  let activeElToggle = false;
  let thisPpcloseBtn = null;  

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
    closePpMenu(activeEl);
  }

  function openPpMenu(elem) {
    activeElToggle = true;
    window.utils.addClassModifier(elem, 'popup', 'focus');
    elem.addEventListener('blur', ppItemBlurHandler, true);
    activeEl = elem;

    document.addEventListener('keydown', docEscPressHandler);
  }

  function closePpMenu(elem) {
    activeElToggle = false;
    window.utils.removeClassModifier(elem, 'popup', 'focus');
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
    const ppCloseBtn = item.querySelector('.popup__close-btn');
    const ppBox = item.querySelector('.popup__box');

    function ppParentMouseOverHadnler(evt) {
      window.utils.toggleElem(item, 'popup', 'over');
    }
    function ppParentMouseOutHadnler(evt) {
      window.utils.toggleElem(item, 'popup', 'over');
    }

    item.addEventListener('mouseover', ppParentMouseOverHadnler);
    item.addEventListener('mouseout', ppParentMouseOutHadnler);


    //item.addEventListener('blur', ddItemBlurHandler, true);
    item.addEventListener('focus', ppItemFocusHandler, true);

    // specific feature of popup, not dropdown (overlay on mobiles):
    ppBox.addEventListener('click', function (evt) {
      if (!ppChild.contains(evt.target) && !ppCloseBtn.contains(evt.target) && evt.target !== ppCloseBtn) {
        closePpMenu(activeEl);
      }
    });

    item.addEventListener('touchstart', function () {
      item.removeEventListener('mouseover', ppParentMouseOverHadnler);
      item.removeEventListener('mouseout', ppParentMouseOutHadnler);
      if (ppCloseBtn) {
        ppCloseBtn.classList.remove('popup__close-btn--none');
      }
    });
    if (ppCloseBtn) {
      ppCloseBtn.addEventListener('click', ppCloseBtnClickHandler);
    }

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
  const search = document.querySelector('.search');
  const searchForm = search.querySelector('.search__form');
  const searchInput = searchForm.querySelector('.search__input');
  const searchSubmit = searchForm.querySelector('button[type="submit"]');
  const searchBtn = search.querySelector('.search__btn');

  function searcFormSubmitHandler(evt) {
    if (!searchInput.value) {
      evt.preventDefault();
      searchSubmit.focus();// preventDefault does not let focus happen when while hovering a click does not open the popup
    }
  }

  searchForm.addEventListener('submit', searcFormSubmitHandler);

  searchBtn.addEventListener('click', function (evt) {
    searchInput.focus();
  });

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
    },
    toggleElem: function (parentElem, elemClass, modifier) {
      parentElem.classList.toggle(elemClass + '--' + modifier);
    },
    addClassModifier: function (parentElem, elemClass, modifier) {
      parentElem.classList.add(elemClass + '--' + modifier);
    },
    removeClassModifier: function (parentElem, elemClass, modifier) {
      parentElem.classList.remove(elemClass + '--' + modifier);
    }
  };

})();
