(function () {
    'use strict';
    
    angular.module('LunchCheck', [])
    
    .controller('LunchCheckController', function($scope){

    $scope.message = "";
    $scope.messageNumber = "";
    $scope.food = [];
    $scope.borderStyle = "";

    $scope.checkFood = function(){

        //Remove empty items
        while (this.food.includes(',,')) {
            this.food = this.food.replace(",,",",");
        }

        //Check if last character is a comma
        if(this.food.slice(-1) ==","){
            this.food = this.food.substring(0, this.food.length - 1);
        }

        //Remove whitespace items , ,
        var foodItems = this.food.split(',').filter(function(item) { return item.trim() != ''; });
        
        var numItems = 0;

        if(foodItems.length >= 1 && foodItems[0] != ""){
            var numItems = foodItems.length;
        }

        if(numItems <= 0){
            this.message = "Please enter food items separated by commas.";
            this.messageNumber = 1;
        }
        else if(numItems > 0 && numItems <= 3){
            this.message =  "Enjoy your meal!";
            this.messageNumber = 2;
        }
        else{
            this.message = "Too many items have been selected (3 maximum).";
            this.messageNumber = 3;
        }
    };

    $scope.getTextColor = function(){
        switch(this.messageNumber){
            case 1:
                return {'color':'red'};
            case 2:
            case 3:
            default:
                return {'color':'green'};
        }
    };

    $scope.getBorderColor = function(){
        switch(this.messageNumber){
            case 1:
                return {'border-color':'red'};
            case 2:
            case 3:
                return {'border-color':'green'};
            default:
                return {'border-color':'black'};
        }
    };

    });
})();