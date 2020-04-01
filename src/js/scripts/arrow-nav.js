'use strict';
(function () {
  const keyCodes = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
  };

  const directionsToArrKeys = {
    horizontal: ['LEFT', 'RIGHT'],
    vertical: ['UP', 'DOWN']
  }
  const {horizontal, vertical} = directionsToArrKeys;

  // Constructor of arrow-keys parametres for different arrays of active elements (like ddHeaders, ppHeaders, etc):
  function ArrKeysParams(activeElems) {
    this.range = [0, activeElems.length - 1];
    this.edgeIndexs37 = this.range.slice();
    this.edgeIndexs38 = this.range.slice();
    this.edgeIndexs39 = this.range.slice().reverse();
    this.edgeIndexs40 = this.range.slice().reverse();
  }

  // moving UP and LEFT: the index of the next element is getting smaller
  // moving DOWN and RIGHT: the index of the next element is getting bigger
  ArrKeysParams.prototype.sign37 = -1;
  ArrKeysParams.prototype.sign38 = -1;
  ArrKeysParams.prototype.sign39 = 1;
  ArrKeysParams.prototype.sign40 = 1;


  function getNextIndx(evt, focusablesList, arrKeysParams) {
    const nextElemIndx = focusablesList.indexOf(evt.target) === arrKeysParams['edgeIndexs' + evt.keyCode][0] ?
      arrKeysParams['edgeIndexs' + evt.keyCode][1] :
      focusablesList.indexOf(evt.target) + arrKeysParams['sign' + evt.keyCode];
    return nextElemIndx;
  }

  window.arrowNav = {
    navigateByArrowKey: function (focusables, focusablesArray, {
      moveLeftRight = true, // this parametre defines if the navigation is horizontal or vertical
      focusableParent = document} = {}
    ) {
      const direction = moveLeftRight ? horizontal : vertical;
      const arrKeysParams = new ArrKeysParams(focusablesArray);

      focusables.forEach(function (elem) {
        elem.addEventListener('keydown', function (evt) {
          //
          if (evt.keyCode === keyCodes[direction[0]] ||
            evt.keyCode === keyCodes[direction[1]]) {
            evt.preventDefault();
            let nextElemIndx;
            nextElemIndx = getNextIndx(evt, focusablesArray, arrKeysParams);
            evt.target.blur();
            focusablesArray[nextElemIndx].focus();
          }
        });
      });  
    },
  };

})();
