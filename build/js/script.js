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
    this.openCloseNavList = function () {
      this.list.classList.toggle(this.listCloseClass);
    };
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
  var ENTER_KEYCODE = 13;
  var SPACE_KEYCODE = 32;
  var TAB_KEYCODE = 9;
  var SHIFT_KEYCODE = 16;

  var dropdownList = document.querySelector('.dropdown__list');;//document.querySelector('.site-list__dropdown');
  var dropdownWrap = dropdownList.parentNode; // dropdownHeader
  var dropdownHeaderLink = dropdownWrap.firstElementChild;//dropdownHeader.querySelector('.site-list__link');
  var dropdownLastLink = dropdownList.lastElementChild.firstElementChild;
  var dropdownWrap = dropdownList.parentNode; // dropdownHeader

  //indicator of using Shift on the last link of dropdwon menu:
  var backMove = false; // false - no Shift pressed

  //mouse move over drop dropdown menu (item that contains dropdown list and dropdownlist itself) handlers
  //classList.toggle does not work here, so function closeDropdownMenu can't be used..  
  function dropdownMouseOverHandler() {
    dropdownList.classList.add('dropdown__list--opened');
    dropdownList.classList.remove('dropdown__list--closed');
    //dropdownList.classList.toggle('site-list__dropdown--opened');
    //dropdownList.classList.toggle('site-list__dropdown--closed');
  }
  function dropdownMouseOutHandler() {
    dropdownList.classList.remove('dropdown__list--opened');
    dropdownList.classList.add('dropdown__list--closed');
    //dropdownList.classList.toggle('site-list__dropdown--opened');
    //dropdownList.classList.toggle('site-list__dropdown--closed');
  }

  function closeDropdownMenu() {
    dropdownList.classList.toggle('dropdown__list--opened');
    dropdownList.classList.toggle('dropdown__list--closed');
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

'use strict';
(function () {
  var ENTER_KEYCODE = 13;
  var SPACE_KEYCODE = 32;
  var ESC_KEYCODE = 27;
  var search = document.querySelector('.search');
  var searchLink = search.querySelector('a');
  var searchPopup = document.querySelector('.search__popup');
  var searchSubmit = searchPopup.querySelector('button');
  var searchInput = searchPopup.querySelector('input');

  var elemsToClasses = {
    searchParent: 'search--opened',
    searchPopupOpened: 'search__popup--opened',
    searchPopupClosed: 'search__popup--closed'
  };

  function toggleSearchPopup(searchParent, searchPopup) {
    searchParent.classList.toggle(elemsToClasses.searchParent);
    searchPopup.classList.toggle(elemsToClasses.searchPopupClosed);
    searchPopup.classList.toggle(elemsToClasses.searchPopupOpened);
  }

  searchLink.addEventListener('click', function (evt) {
    evt.preventDefault();
    toggleSearchPopup(search, searchPopup);
  });

  searchLink.addEventListener('keypress', function (evt) {
    if (evt.keyCode == SPACE_KEYCODE) {
      evt.preventDefault();
      toggleSearchPopup(search, searchPopup);
    }
  });

  /*search.addEventListener('mouseover', function (evt) {
    search.classList.add('search--opened');
    searchPopup.classList.add('search__popup--opened');
    searchPopup.classList.remove('search__popup--closed');
  });

  search.addEventListener('mouseout', function (evt) {
    search.classList.remove('search--opened');
    searchPopup.classList.remove('search__popup--opened');
    searchPopup.classList.add('search__popup--closed');
  });*/


  searchSubmit.addEventListener('click', function (evt) {
    if (!searchInput.value) {
      evt.preventDefault();
      toggleSearchPopup(search, searchPopup);
      /*search.classList.toggle('search--opened');
      searchPopup.classList.toggle('search__popup--opened');
      searchPopup.classList.toggle('search__popup--closed');*/
      return;
    }
    toggleSearchPopup(search, searchPopup);
  });

  searchSubmit.addEventListener('keydown', function (evt) {
    if (evt.keyCode == SPACE_KEYCODE) {
      if (!searchInput.value) {
        evt.preventDefault();
        toggleSearchPopup(search, searchPopup);
        return;
      }
      toggleSearchPopup(search, searchPopup);
    }
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode == ESC_KEYCODE && search.classList.contains('search--opened')) {
      toggleSearchPopup(search, searchPopup);
    }
  });

  document.addEventListener('mousedown', function (evt) {
    if (!search.contains(evt.target) && !searchPopup.contains(evt.target) && evt.target !== search && evt.target !== searchPopup && search.classList.contains('search--opened')) {
      toggleSearchPopup(search, searchPopup);
    }
  });

 



})();
