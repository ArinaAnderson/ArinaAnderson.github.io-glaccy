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
          window.utils.defineTabIndex(it, true);// запрет tab-navigation  внутри выпадающих списков,  только arrow-key nav
        }
      });
    })
  });

  document.addEventListener('click', docClickHandler);
})();
