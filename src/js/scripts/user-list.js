'use strict';
(function () {
  const userList = document.querySelector('.user-list');
  const userListLinks = document.querySelectorAll('.user-list__link');
  const userListLinksArray = Array.prototype.slice.call(userListLinks);
  window.arrowNav.navigateByArrowKey(userListLinks, userListLinksArray, {focusableParent: userList});
})();
