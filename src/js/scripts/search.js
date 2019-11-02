'use strict';
(function () {
  const search = document.querySelector('.search');
  const searchForm = search.querySelector('.search__form');
  const searchInput = searchForm.querySelector('.search__input');
  const searchSubmit = searchForm.querySelector('button[type="submit"]');
  const searchBtn = search.querySelector('.search__btn');

  function searcFormSubmitHandler(evt) {
    if (!searchInput.value) {
      evt.preventDefault();
      searchSubmit.focus();// preventDefault does not let focus happen when while hovering a click does not open the popup
    }
  }

  searchForm.addEventListener('submit', searcFormSubmitHandler);

  searchBtn.addEventListener('click', function (evt) {
    searchInput.focus();
  });

})();
