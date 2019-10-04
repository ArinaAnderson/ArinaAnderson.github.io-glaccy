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
