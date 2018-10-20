(function () {
    'use strict';
    
angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;
  
    toBuy.Name = "";
    toBuy.Quantity = "";
    toBuy.Items = ShoppingListCheckOffService.getCart();
  
    toBuy.addToCart = function () {
        ShoppingListCheckOffService.addToCart(toBuy.Name, toBuy.Quantity);
    }

    toBuy.purchaseItem = function (name, quantity) {
        ShoppingListCheckOffService.addToPurchased(name, quantity);
    }
  }

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
    var alreadyBought = this;
  
    alreadyBought.Name = "";
    alreadyBought.Quantity = "";
    alreadyBought.Items = ShoppingListCheckOffService.getPurchased();
  }

function ShoppingListCheckOffService() {
    var service = this;
    var initialCartItems = [];
    var cartItems = [];
    var purchasedItems = [];

    service.buildInitialCart = function(){
        for (var i = 0; i < 5; i++){
            var itemNumber = i + 1;
            service.addItem('Item'+ itemNumber, itemNumber, initialCartItems);
        }
    };

    service.addToCart = function(name, quantity){
        service.addItem(name, quantity, cartItems);
    };

    service.addToPurchased = function(name, quantity){
        service.removeItem(name, cartItems);
        service.addItem(name, quantity, purchasedItems);
    };

    service.removeItemByIndex = function (index, items) {
        items.splice(index, 1);
      };

    service.removeItem = function (name, items) {
        var index = items.findIndex(item => item.Name == name);
        if (index !== -1) items.splice(index, 1);
    };

    service.addItem = function (name, quantity, items) {
      var item = {
        Name: name,
        Quantity: quantity
      };
      items.push(item);
    };
  
    service.getCart = function () {
    if(initialCartItems.length === 0){
        service.buildInitialCart();
        cartItems = initialCartItems;
    }
      return cartItems;
    };

    service.getPurchased = function () {
        return purchasedItems;
      };
  }

})();