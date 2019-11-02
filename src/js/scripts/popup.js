'use strict';
(function () {
  const keyCodes = {
    ENTER: 13,
    SPACE: 32,
    TAB: 9,
    SHIFT: 16
  };
  const {ENTER, SPACE, TAB, SHIFT} = keyCodes;
  const TABLET_WIDTH = 768;
  // pu - abbreviation for popup;
  const puParents = document.querySelectorAll('.popup');
  const puOverlay = document.querySelector('.popup-overlay');
  let activeEl = null;
  let activeElToggle = false;

  function docClickHandler(evt) {
    if (activeEl && !activeEl.contains(evt.target)) {
      closePuMenu(activeEl);
    }
  }

  function docEscPressHandler(evt) {
    window.utils.isEscPressed(evt, function () {
      const activeElHeader = activeEl.querySelector('.popup__header');
      activeElHeader.focus();
      closePuMenu(activeEl);
    });
  }

  function puCloseBtnClickHandler(evt) {
    closePuMenu(activeEl);
  }

  function openPuMenu(elem) {
    activeElToggle = true;
    window.utils.addClassModifier(elem, 'popup', 'focus');
    elem.addEventListener('blur', puItemBlurHandler, true);
    activeEl = elem;

    document.addEventListener('keydown', docEscPressHandler);
  }

  function closePuMenu(elem) {
    activeElToggle = false;
    window.utils.removeClassModifier(elem, 'popup', 'focus');
    elem.removeEventListener('blur', puItemBlurHandler, true);
    activeEl = null;

    document.removeEventListener('keydown', docEscPressHandler);
  }

  function puItemFocusHandler(evt, btn) {
    if (!evt.currentTarget.classList.contains('popup--focus')) {
      openPuMenu(evt.currentTarget);
    }
  }

  function puItemBlurHandler(evt) {
    const blurElem = evt.currentTarget;
    function focusHandler(evtFocus) {
      if (!blurElem.classList.contains(evtFocus.target)) {
        closePuMenu(blurElem);
      }
      document.removeEventListener('focus', focusHandler, true);
    }
    document.addEventListener('focus', focusHandler, true);
  }

  puParents.forEach(function (item, key) {
    item.querySelector('.popup__box').classList.remove('popup__box--no-js');

    const puHeader = item.querySelector('.popup__header');
    const puChild = item.querySelector('.popup__child');
    const puCloseBtn = item.querySelector('.popup__close-btn');
    const puBox = item.querySelector('.popup__box');

    function puParentMouseOverHadnler(evt) {
      window.utils.toggleElem(item, 'popup', 'over');
    }
    function puParentMouseOutHadnler(evt) {
      window.utils.toggleElem(item, 'popup', 'over');
    }

    function windowWidthHandler(width) {
      if (width > TABLET_WIDTH) {
        item.addEventListener('mouseover', puParentMouseOverHadnler);
        item.addEventListener('mouseout', puParentMouseOutHadnler);
      } else {
        item.removeEventListener('mouseover', puParentMouseOverHadnler);
        item.removeEventListener('mouseout', puParentMouseOutHadnler);
      }
    }

    window.addEventListener('resize', function (evt) {
      window.utils.windowWidthHandler(windowWidthHandler);
    });
    window.addEventListener('load', function (evt) {
      window.utils.windowWidthHandler(windowWidthHandler);
    });



    //item.addEventListener('blur', ddItemBlurHandler, true);
    item.addEventListener('focus', puItemFocusHandler, true);

    // specific feature of popup, not dropdown (overlay on mobiles):
    puBox.addEventListener('click', function (evt) {
      if (!puChild.contains(evt.target) && !puCloseBtn.contains(evt.target) && evt.target !== puCloseBtn) {
        closePuMenu(activeEl);
      }
    });

    item.addEventListener('touchstart', function () {
      item.removeEventListener('mouseover', puParentMouseOverHadnler);
      item.removeEventListener('mouseout', puParentMouseOutHadnler);
      if (puCloseBtn) {
        puCloseBtn.classList.remove('popup__close-btn--none');
      }
    });
    if (puCloseBtn) {
      puCloseBtn.addEventListener('click', puCloseBtnClickHandler);
    }

    puHeader.addEventListener('click', function (evt) {//'mousedown'
      if (evt.currentTarget.tagName != 'BUTTON' || evt.target.tagName != 'BUTTON') {
        evt.preventDefault();
      }
      puHeader.focus();//SAFARI FIX*/
    });

    puHeader.addEventListener('keydown', function (evt) {
      window.utils.isEnterPressed(evt, function () {
        if (evt.currentTarget.tagName !== 'BUTTON' || evt.target.tagName !== 'BUTTON') {
          evt.preventDefault();
        }
        if (!item.classList.contains('popup--focus')) {
          openPuMenu(item);
        }
      });      
    });
    puHeader.addEventListener('keydown', function (evt) {
      window.utils.isSpacePressed(evt, function () {
        if (evt.currentTarget.tagName !== 'BUTTON' || evt.target.tagName !== 'BUTTON') {
          evt.preventDefault();
        }
        if (!item.classList.contains('popup--focus')) {
          openPuMenu(item);
        }
      });      
    });
  });

  document.addEventListener('click', docClickHandler);
})();
