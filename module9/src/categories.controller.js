(function () {
    'use strict';
    
angular.module('DataApp')
.controller('CategoriesController', CategoriesController);


CategoriesController.$inject = ['categoriesList'];
function CategoriesController(categoriesList) {
  var categories = this;
  categories.categoriesList = categoriesList;
}

})();