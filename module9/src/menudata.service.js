(function () {
    'use strict';
    
angular.module('DataApp')
.service('MenuDataService', MenuDataService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

MenuDataService.$inject = ['$http', 'ApiBasePath'];
function MenuDataService($http, ApiBasePath) {
    var service = this;
    service.searchTerm = ""; 

    service.getAllCategories = function (searchTerm) {
        service.searchTerm = searchTerm;
        var response = $http({
          method: "GET",
          url: (ApiBasePath + "/categories.json"),
        });
    
        return response.then(function (result) {
          // Add all items
         var categoriesList =  result.data;
  
          // return processed items
          return categoriesList;
      });
      };


    service.getItemsForCategory = function (categoryShortName) {
      var response = $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json?category=" + categoryShortName),
      });
  
      return response.then(function (result) {
        // process result and only keep items that match
        var itemsList = result.data.menu_items;

        // return processed items
        return itemsList;
    });
    };
  
  }
})();