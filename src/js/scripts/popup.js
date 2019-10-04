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
