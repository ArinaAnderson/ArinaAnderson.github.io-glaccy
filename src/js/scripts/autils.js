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
  const page = document.querySelector('.page');

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
    },
    checkDevWidth: function (callback) {
      let devWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      callback(devWidth);
    },// DELETE
    stopPageScroll: function () {
      page.classList.add('page--noscroll');
    },
    letPageScroll: function () {
      page.classList.remove('page--noscroll');
    },
    getWindWidth: function () {
      return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    },
    breakpointHandler: function (breakpoint) {
      return function (smallerWidthHandler, biggerWidthHandler, exactWidthHandler) {
        const width = window.utils.getWindWidth();
        if (smallerWidthHandler && width < breakpoint) {
          smallerWidthHandler();
        }
        if (biggerWidthHandler && width > breakpoint) {
          biggerWidthHandler();
        }
        if (exactWidthHandler && width === breakpoint) {
          exactWidthHandler();
        }
      }
    }
  };

})();
