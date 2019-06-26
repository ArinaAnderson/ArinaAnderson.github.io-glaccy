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

  function NavList(listClass, listBreakpoints) {
    this.list = document.querySelector('.' + listClass);
    this.listCloseClass = listClass + '--closed';
    this.listBreakpoints = listBreakpoints;
    this.openNavList = function () {
      if (this.listBreakpoints[devWidthBreakpoint]) {
        this.list.classList.remove(this.listCloseClass);
      }
    };
    this.closeNavList = function () {
      if (this.listBreakpoints[devWidthBreakpoint] && !this.list.classList.contains(this.listCloseClass)) {
        this.list.classList.add(this.listCloseClass);
      }
    };

    this.openCloseNavList = function () {
      if (this.listBreakpoints[devWidthBreakpoint]) {
        this.list.classList.toggle(this.listCloseClass);
        window.console.log(this.listBreakpoints, devWidthBreakpoint, this.listBreakpoints[devWidthBreakpoint]);
      }
    };
  }

  navLists.push(new NavList('site-list', {0: true, 600: true}));//{[breakPoints[0]]:true, [breakPoints[1]]: true, [breakPoints[2]]: false})):
  navLists.push(new NavList('user-list', {0: true, 600: false}));//{[breakPoints[0]]:true, [breakPoints[1]]: false, [breakPoints[2]]: false}));
  
  window.addEventListener('resize', function () {
    windowResizeHandler();
    if (mainNavBtn.classList.contains('page-header__btn--close')) {
      for (var i = 0; i < navLists.length; i++) {
        navLists[i].openNavList();
      }
    }
    if (mainNavBtn.classList.contains('page-header__btn--open')) {
      for (var i = 0; i < navLists.length; i++) {
        navLists[i].closeNavList();
      }
    }
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
