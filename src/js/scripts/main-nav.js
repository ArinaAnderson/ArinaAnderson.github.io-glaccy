'use strict';
(function () {
  var mainNavBtn = document.querySelector('.page-header__btn');
  mainNavBtn.classList.remove('page-header__btn--no-js');

  /*var siteList = document.querySelector('.site-list');
  var userList = document.querySelector('.user-list');*/
  var breakPoints = [0, 600];//[600, 900, 1200];
  var devWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;//calculation + addEventL... window.addEventListener('resize', function() {calculation});
  
  var devWidthBreakpoint = defineDevWidthBreakpoint();//<-- defineDevWidthBreakpoint()
  
  function defineDevWidthBreakpoint() {
    devWidthBreakpoint = devWidth < 600 ? 0 : 600;
  }
  function windowResizeHandler() {
    devWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    devWidthBreakpoint = defineDevWidthBreakpoint();
  }
  var navLists = [];
  /*var siteListParams = {
    breakPoints[0]: true,
    breakPoints[1]: true,
    breakPoints[2]: false
  };
  var userListParams = {
    breakPoints[0]: true,
    breakPoints[1]: false,
    breakPoints[2]: false
  };*/


  /*function NavList(listClass, callback) {
    var listBreakpoints = callback();
    this.list = document.querySelector('.' + listClass);
    this.listCloseClass = listClass + '--closed';
    this.listBreakpoints = listBreakpoints;
    this.closeOpenNavList = function (devWidth) {
      if (mainNavBtn.classList.contains('page-header__btn--open') && this.listBreakpoints.devWidthBreakpoint) {
        this.list.classList.remove(this.listCloseClass);
        mainNavBtn.classList.remove('page-header__btn--open');
      }
      if (!mainNavBtn.classList.contains('page-header__btn--open') && this.listBreakpoints.devWidthBreakpoint) {
        this.list.classList.add(this.listCloseClass);
        mainNavBtn.classList.add('page-header__btn--open');
      }
    };
  }
  var siteList = new NavList('site-list', function () {
    var listBreakpnts = {};
    breakPoints.forEach(function (breakPnt) {
      listBreakpnts.breakPnt = true;
    });
    return listBreakpnts;
  });
  var userList = new NavList('user-list', function () {
    var listBreakpnts = {};
    breakPoints.forEach(function (breakPnt) {
      listBreakpnts.breakPnt = true;
    });
    return listBreakpnts;
  });*/


 /* function NavList(listClass, listBreakpoints) {
    this.list = document.querySelector('.' + listClass);
    this.listCloseClass = listClass + '--closed';
    this.listBreakpoints = listBreakpoints;
    this.closeOpenNavList = function (devWidth) {
      if (mainNavBtn.classList.contains('page-header__btn--open')) {//&& this.listBreakpoints.devWidthBreakpoint) {
        this.list.classList.remove(this.listCloseClass);
        mainNavBtn.classList.remove('page-header__btn--open');
      }
      if (!mainNavBtn.classList.contains('page-header__btn--open')) {//&& this.listBreakpoints.devWidthBreakpoint) {
        this.list.classList.add(this.listCloseClass);
        mainNavBtn.classList.add('page-header__btn--open');
      }
    };
  }*/

  function NavList(listClass, listBreakpoints) {
    this.list = document.querySelector('.' + listClass);
    this.listCloseClass = listClass + '--closed';
    this.listBreakpoints = listBreakpoints;
    this.openNavList = function () {
      this.list.classList.remove(this.listCloseClass);
    };
    this.closeNavList = function () {
      this.list.classList.add(this.listCloseClass);
    };
    this.openCloseNavList = function () {
      if (this.listBreakpoints[devWidthBreakpoint]) {
        this.list.classList.toggle(this.listCloseClass);
      }
    };
  }

  navLists.push(new NavList('site-list', {0: true, 600: true}));//{[breakPoints[0]]:true, [breakPoints[1]]: true, [breakPoints[2]]: false}))://{600: true, 900: true, 1200: false}));
  navLists.push(new NavList('user-list', {0: true, 600: false}));//{[breakPoints[0]]:true, [breakPoints[1]]: false, [breakPoints[2]]: false}));//{600: true, 900: false, 1200: false}));
    //devWidth < [i] - this range, break

    mainNavBtn.addEventListener('click', function () {
      for (var i = 0; i < navLists.length; i++) {
        navLists[i].openCloseNavList();
      }
      mainNavBtn.classList.toggle('page-header__btn--open');
      mainNavBtn.classList.toggle('page-header__btn--close');
    });

})();
