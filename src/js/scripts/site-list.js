'use strict';
(function () {
  const siteList = document.querySelector('.site-list');
  const siteListLinks = document.querySelectorAll('.site-list__link');
  const siteListLinksArray = Array.prototype.slice.call(siteListLinks);
  window.arrowNav.navigateByArrowKey(siteListLinks, siteListLinksArray, {focusableParent: siteList});
})();
