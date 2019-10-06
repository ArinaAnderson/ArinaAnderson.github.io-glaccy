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
    //const activeElHeader = activeEl.querySelector('.dropdown__header');
    closeDdMenu(activeEl);
  }

  function openDdMenu(elem) {
    activeElToggle = true;

    addClass('focus', elem);
    elem.addEventListener('blur', ddItemBlurHandler, true);
    activeEl = elem;

    //activeEl.classList.remove('dropdown--over');// last measure for SAFARI
    /*thisDdcloseBtn = activeEl.querySelector('.dropdown__close-btn');
    if (thisDdcloseBtn) {
      thisDdcloseBtn.classList.remove('dropdown__close-btn--none');
    }*/

    document.addEventListener('keydown', docEscPressHandler);
  }

  function closeDdMenu(elem) {
    activeElToggle = false;

    removeClass('focus', elem);
    elem.removeEventListener('blur', ddItemBlurHandler, true);
    activeEl = null;

    /*if (thisDdcloseBtn) {
      thisDdcloseBtn.classList.add('dropdown__close-btn--none');
    }*/

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
      //if (activeElToggle) {
        //closeDdMenu(activeEl);
        //ddHeader.blur();
      //} else {
        ddHeader.focus();
      //}//SAFARI FIX*/
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
