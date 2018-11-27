(function () {
    'use strict';
    
angular.module('DataApp')
.controller('ItemsController', ItemsController);


ItemsController.$inject = ['itemsList'];
function ItemsController(itemsList) {
  var items = this;
  items.itemsList = itemsList;
}

})();