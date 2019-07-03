'use strict';
(function () {
  var ENTER_KEYCODE = 13;
  var SPACE_KEYCODE = 32;
  var TAB_KEYCODE = 9;
  var SHIFT_KEYCODE = 16;

  var dropdownList = document.querySelector('.site-list__dropdown ');
  var dropdownWrap = dropdownList.parentNode; // dropdownHeader
  var dropdownHeaderLink = dropdownWrap.firstElementChild;//dropdownHeader.querySelector('.site-list__link');
  var dropdownLastLink = dropdownList.lastElementChild.firstElementChild;
  var dropdownWrap = dropdownList.parentNode; // dropdownHeader

  //indicator of using Shift on the last link of dropdwon menu:
  var backMove = false; // false - no Shift pressed

  //mouse move over drop dropdown menu (item that contains dropdown list and dropdownlist itself) handlers
  //classList.toggle does not work here, so function closeDropdownMenu can't be used..  
  function dropdownMouseOverHandler() {
    dropdownList.classList.add('site-list__dropdown--opened');
    dropdownList.classList.remove('site-list__dropdown--closed');
    //dropdownList.classList.toggle('site-list__dropdown--opened');
    //dropdownList.classList.toggle('site-list__dropdown--closed');
  }
  function dropdownMouseOutHandler() {
    dropdownList.classList.remove('site-list__dropdown--opened');
    dropdownList.classList.add('site-list__dropdown--closed');
    //dropdownList.classList.toggle('site-list__dropdown--opened');
    //dropdownList.classList.toggle('site-list__dropdown--closed');
  }

  function closeDropdownMenu() {
    dropdownList.classList.toggle('site-list__dropdown--opened');
    dropdownList.classList.toggle('site-list__dropdown--closed');
  }

  //tab press on the last link of dropdown list handler:
  function dropdownTabPressHandler(evt) {
    // pressing Tab on the last link of dropdwon list closes the dropdown in case the focus moves forward, out of the dropdown list:
    if (!backMove) {
      closeDropdownMenu();
    }
  }

  //shift press on the last link of dropdwon list handler:
  function dropdownlShiftPressHandler(evt) {
    backMove = true;
   
    function dropdownTabShiftPressHandler(evtTab) {
      //when Shift is held down, pressing Tab does not close the dropdwon list anymore:
      document.removeEventListener('keyup', dropdownTabPressHandler);
      backMove = false;
    }

    document.addEventListener('keyup', dropdownTabShiftPressHandler);
  }

  dropdownWrap.addEventListener('mouseover', dropdownMouseOverHandler);
  dropdownWrap.addEventListener('mouseout', dropdownMouseOutHandler);

  //when dropdown list is opened (by focus/clicking), a chance mouse move over it should not close it:
  /*dropdownWrap.addEventListener('focus', function () {
    if (dropdownList.classList.contains('site-list__dropdown--opened')) {
      dropdownWrap.removeEventListener('mouseover', dropdownMouseOverHandler);
      dropdownWrap.removeEventListener('mouseout', dropdownMouseOutHandler);
    } 
    if (!dropdownList.classList.contains('site-list__dropdown--opened')) {
      dropdownWrap.addEventListener('mouseover', dropdownMouseOverHandler);
      dropdownWrap.addEventListener('mouseout', dropdownMouseOutHandler);
    }
  }, true);

  // return of listeners of mouse move when focus is away from dropdown menu:
  dropdownWrap.addEventListener('blur', function () {
    dropdownWrap.addEventListener('mouseover', dropdownMouseOverHandler);
    dropdownWrap.addEventListener('mouseout', dropdownMouseOutHandler);
  }, true);*/

  document.addEventListener('click', function (evt) {
    if ((evt.currentTarget != dropdownWrap || evt.target != dropdownWrap) && dropdownList.classList.contains('site-list__dropdown--opened')) {
      closeDropdownMenu();
    }
  }, true);


  dropdownLastLink.addEventListener('keydown', function (evt) {
    if (evt.keyCode === TAB_KEYCODE) {
      dropdownTabPressHandler(evt);
    }
    if (evt.keyCode === SHIFT_KEYCODE) {
      dropdownlShiftPressHandler(evt);
    }
  });


  // navigation menu is made of links, not buttons to be no-js friendly:
  dropdownHeaderLink.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE || evt.keyCode === SPACE_KEYCODE) {
      evt.preventDefault();//if js is available, links work like buttons
      closeDropdownMenu();
    }
  });


  /*dropdownHeaderLink.addEventListener('click', function (evt) {
      evt.preventDefault();
      closeDropdownMenu();
  });*/
})();
