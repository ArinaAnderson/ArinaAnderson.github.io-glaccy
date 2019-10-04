'use strict';
(function () {
  const searchForm = document.querySelector('.search');
  const searchInput = searchForm.querySelector('.search__input');
  const searchSubmit = searchForm.querySelector('button[type="submit"]'); 

  /*function searchInputChangeHandler(evt) {
    if (searchInput.value.trim()) {
      searchSubmit.disabled = false;
    } else {
      searchSubmit.disabled = true;
    }
  }
  searchInput.addEventListener('change', searchInputChangeHandler);*/
  function searcBtnPressHandler(evt) {
    if (!searchInput.value) {
      evt.preventDefault();
    }
  }

  searchSubmit.addEventListener('click', searcBtnPressHandler);
  
})();
