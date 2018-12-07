(function () {
"use strict";

angular.module('public')
.controller('RegistrationController', RegistrationController);

RegistrationController.$inject = ['UserService'];
function RegistrationController(UserService) {
  var reg = this;

  reg.submit = function () {
    UserService.setUser(reg.user);
    reg.completed = true;
  };
}

})();
