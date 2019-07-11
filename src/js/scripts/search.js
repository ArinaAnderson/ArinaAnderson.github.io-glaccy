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
