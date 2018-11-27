(function () {
    'use strict';
    
angular.module('DataApp')
.component('categories', {
    templateUrl: 'src/templates/categories.template.html',
    bindings: {
        categoriesList: '<'
    }
  });

})();