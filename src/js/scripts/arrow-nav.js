'use strict';
(function () {
  const keyCodes = {
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    DOWN: 40,
  };
  //const {LEFT, RIGHT, UP, DOWN} = keyCodes;

  const directionsToArrowKeys = {
    horizontal: ['LEFT', 'RIGHT'],
    vertical: ['UP', 'DOWN']
  }
  const {horizontal, vertical} = directionsToArrowKeys;


  // Constructor of arrow keys parametres for different arrays of group elements (like ddHeaders, etc):
  function ArrKeysParams(activeElems) {
    this.range = [0, activeElems.length - 1];
    this.edgeIndexs37 = this.range.slice();
    this.edgeIndexs38 = this.range.slice();
    this.edgeIndexs39 = this.range.slice().reverse();
    this.edgeIndexs40 = this.range.slice().reverse();
  }

  ArrKeysParams.prototype.sign37 = -1;
  ArrKeysParams.prototype.sign39 = 1;
  ArrKeysParams.prototype.sign38 = -1;
  ArrKeysParams.prototype.sign40 = 1;


  function getArrKeyEvtNextIndx(evt, list, ddElemArrParams) {
    const nextElemIndx = list.indexOf(evt.target) === ddElemArrParams['edgeIndexs' + evt.keyCode][0] ?
      ddElemArrParams['edgeIndexs' + evt.keyCode][1] :
      list.indexOf(evt.target) + ddElemArrParams['sign' + evt.keyCode];
    return nextElemIndx;
  }

  window.arrowNav = {
    navigateByArrowKey: function (focusables, focusablesArray, {
      moveLeftRight = true,
      focusableParent = document} = {}
    ) {
      const direction = moveLeftRight ? horizontal : vertical;
      const focusablesArrKeysParams = new ArrKeysParams(focusablesArray);

      focusables.forEach(function (elem) {
        elem.addEventListener('keydown', function (evt) {
          if (evt.keyCode === keyCodes[direction[0]] ||
            evt.keyCode === keyCodes[direction[1]]) {
            let nextElemIndx;
            nextElemIndx = getArrKeyEvtNextIndx(evt, focusablesArray, focusablesArrKeysParams);
            evt.target.blur();
            focusablesArray[nextElemIndx].focus();
          }
        });
      });  
    },
  };

})();
