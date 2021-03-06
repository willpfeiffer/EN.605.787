(function () {
"use strict";

angular.module('public')
.controller('InfoController', InfoController);

InfoController.$inject = ['UserService'];
function InfoController(UserService) {
  var info = this;
  info.user = UserService.getUser();
  if(info.user){
    info.user.favdishInfo =  UserService.getFavDishInfo();
  }
}

})();
