(function () {
    'use strict';
    
angular.module('public')
.constant('ApiBasePath', "https://wpfeiffer-course5.herokuapp.com")
.directive('menuDataDirective', ['$http', 'ApiBasePath', 
 function menuDataDirective($http, ApiBasePath) {
  return {
    restrict: 'AE',
    require: 'ngModel',
    scope: false,
    link: function (scope, element, attrs, ngModel) {

      ngModel.$validators.menuDataDirective = function(shortName){
        if(shortName===null){
          return false;
        }
        var response = $http({
          method: "GET",
          url: (ApiBasePath + "/menu_items/" + shortName + ".json"),
        });
    
        response.then(function (result) {
          // process result and only keep items that match
          var item = result.data;

          // return processed items
          ngModel.$invalid = false;
          return true;
        }, function(err) {
          // your error function
          if (err.status == 404 || err.status == 500) {
            ngModel.$invalid = true;
            return false;
          }
        }
        );
    }
  }
  };
}]); 
})();