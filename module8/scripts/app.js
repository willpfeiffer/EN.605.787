(function () {
    'use strict';
    
angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'NarrowItDown.html',
      scope: {
        items: '<',
        myTitle: '@title',
        onRemove: '&'
      },
      controller: ShoppingListDirectiveController,
      controllerAs: 'list',
      bindToController: true
    };
  
    return ddo;
  }

})();