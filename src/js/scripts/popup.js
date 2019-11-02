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
