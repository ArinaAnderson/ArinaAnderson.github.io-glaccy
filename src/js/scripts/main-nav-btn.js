'use strict';
(function () {
  // no-js backup
  const mainNavBtn = document.querySelector('.page-header__btn');
  mainNavBtn.classList.remove('page-header__btn--no-js');
  const userList = document.querySelector('.user-list').classList.add('user-list--closed');
  const siteList = document.querySelector('.site-list').classList.add('site-list--closed');

  let devWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;


  function windowResizeHandler() {
    devWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  }

  let navLists = [];

  function NavList(listClass) {
    this.list = document.querySelector('.' + listClass);
    this.listCloseClass = listClass + '--closed';
  }

  NavList.prototype.openCloseNavList = function () {
    this.list.classList.toggle(this.listCloseClass);
  }

  navLists.push(new NavList('site-list'));
  navLists.push(new NavList('user-list'));

  mainNavBtn.addEventListener('click', function () {
    for (let i = 0; i < navLists.length; i++) {
      navLists[i].openCloseNavList();
    }
    mainNavBtn.classList.toggle('page-header__btn--open');
    mainNavBtn.classList.toggle('page-header__btn--close');
  });

  window.addEventListener('resize', function () {
    windowResizeHandler();
  });
})();
