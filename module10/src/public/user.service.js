(function () {
"use strict";

angular.module('public')
.service('UserService', UserService);

function UserService() {
  var service = this;

  service.user = undefined;

  this.setUser = function (myUser) {
    service.user = myUser;
  }

  this.getUser = function () {
      return service.user;
  }

}

})();
