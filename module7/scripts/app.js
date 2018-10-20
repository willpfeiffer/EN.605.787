(function () {
    'use strict';
    
angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService)
.filter('AngularDollarsFilter', AngularDollarsFilter);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;
  
    toBuy.Name = "";
    toBuy.Price = "";
    toBuy.Quantity = "";
    toBuy.Items = ShoppingListCheckOffService.getCart();
  
    toBuy.addToCart = function () {
        ShoppingListCheckOffService.addToCart(toBuy.Name, toBuy.Price, toBuy.Quantity);
    }

    toBuy.purchaseItem = function (name, price, quantity) {
        ShoppingListCheckOffService.addToPurchased(name, price, quantity);
    }
  }

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
    var alreadyBought = this;
  
    alreadyBought.Name = "";
    alreadyBought.Price = "";
    alreadyBought.Quantity = "";
    alreadyBought.Items = ShoppingListCheckOffService.getPurchased();

    alreadyBought.getTotalPrice = function (item) {
        return ShoppingListCheckOffService.getTotalPrice(item);
    }
  }

function ShoppingListCheckOffService() {
    var service = this;
    var initialCartItems = [];
    var cartItems = [];
    var purchasedItems = [];

    service.buildInitialCart = function(){
        for (var i = 0; i < 5; i++){
            var itemNumber = i + 1;
            service.addItem('Item'+ itemNumber, itemNumber, itemNumber, initialCartItems);
        }
    };

    service.addToCart = function(name, price, quantity){
        service.addItem(name, price, quantity, cartItems);
    };

    service.addToPurchased = function(name, price, quantity){
        service.removeItem(name, cartItems);
        service.addItem(name, price, quantity, purchasedItems);
    };

    service.removeItemByIndex = function (index, items) {
        items.splice(index, 1);
      };

    service.removeItem = function (name, items) {
        var index = items.findIndex(item => item.Name == name);
        if (index !== -1) items.splice(index, 1);
    };

    service.addItem = function (name,  price, quantity, items) {
      var item = {
        Name: name,
        Price: price,
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

      service.getTotalPrice = function (item) {
        var totalPrice = 0;
        totalPrice = item.Price * item.Quantity;
        return totalPrice;
      };
  }
  function AngularDollarsFilter(){
    return function(input){
        return '$$$' + input;
    }
  };
})();