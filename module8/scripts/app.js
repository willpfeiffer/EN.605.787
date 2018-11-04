(function () {
    'use strict';
    
angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      found: '<',
      myTitle: '@title',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'narrowIt',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
  var narrowIt = this;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrowIt = this;
  narrowIt.title = "Found Item(s)";
  narrowIt.found = [];
  narrowIt.searchTerm = "";

  narrowIt.getMatchedMenuItems = function (){
    return MenuSearchService.getMatchedMenuItems(narrowIt.searchTerm).then(function (response) {
      narrowIt.found = response;
    });
  };

  narrowIt.removeItem = function (index) {
    narrowIt.found.splice(index, 1);
  };

  narrowIt.getMatchedMenuItems();
}

  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function  MenuSearchService($http, ApiBasePath) {
    var service = this;
    service.searchTerm = ""; 

    service.getMatchedMenuItems = function (searchTerm) {
      service.searchTerm = searchTerm;
      var response = $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json"),
      });
  
      return response.then(function (result) {
        // process result and only keep items that match
        var foundItems = [];
        result.data.menu_items.forEach(element => {
          if(element.description.includes(service.searchTerm)){
            foundItems.push(element);
          }
        });

        // return processed items
        return foundItems;
    });
    };
  
  }

})();