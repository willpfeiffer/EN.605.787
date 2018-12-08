(function () {
"use strict";

angular.module('public')
.service('UserService', UserService);

UserService.$inject = ['$http', 'ApiBasePath'];
function UserService($http, ApiBasePath) {
  var service = this;

  service.user = undefined;

  this.setUser = function (myUser) {
    service.user = myUser;
  }

  this.getUser = function () {
      return service.user;
  }

  this.setFavDishInfo = function (shortName) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items/" + shortName + ".json"),
    });

    response.then(function (result) {
      // process result and only keep items that match
      var item = result.data;
      service.user.favdishInfo = item;
    });
  }

  this.getFavDishInfo = function () {
    return service.user.favdishInfo;
  }

}

})();
