(function () {
    'use strict';
    
angular.module('DataApp')
.component('items', {
    templateUrl: 'src/templates/items.template.html',
    bindings: {
        itemsList: '<'
    }
  });

})();