describe('menudata', function () {

  var menudata;
  var httpBackend;
  var ApiBasePath;
  var $scope;
  var form;
  var element;

  beforeEach(function () {module('public') });
  beforeEach(function () {
    inject(function ($compile, $rootScope) {

      $scope = $rootScope;
      $scope.user = {favdish: null};

      var element = angular.element(
        '<form name="form">' +
        '<input ng-model="user.favdish" ng-model-options="{ allowInvalid: true }" name="favdish" menu-data-directive />' +
        '</form>'
      );

      var element = $compile(element)($scope);
      form = $scope.form;
      $scope.$digest();
    })
  });
  beforeEach(function () {
    ApiBasePath = 'https://wpfeiffer-course5.herokuapp.com';
    inject(
    function ($injector) {
      httpBackend = $injector.get('$httpBackend');
    });
  });

  it('valid short name', function() {

    var validShortName = 'A2';
    var menuA2 = {
      id:	2,
      short_name:	"A2",
      name:	"Egg Drop Soup",
      description:	"chicken broth with egg drop",
      price_small:	2.25,
      price_large:	4.5,
      small_portion_name:	"pint",
      large_portion_name:	"quart",
      created_at:	"2018-12-08T19:11:11.186Z",
      updated_at:	"2018-12-08T19:11:11.186Z",
      category_short_name:	"A",
      image_present:	true
    };

    httpBackend.whenGET(ApiBasePath  + "/menu_items/" + validShortName + ".json").respond(menuA2);

    form.favdish.$setViewValue(validShortName);
    $scope.$digest();
    httpBackend.flush();

    expect($scope.user.favdish).toEqual(validShortName);
    expect(form.favdish.$invalid).toBe(false);
  });

  it('invalid short name', function() {

    var errorObj = {
      status:	"500",
      error:	"Internal Server Error"       
    }

    var invalidShortName = '11';
    httpBackend.whenGET(ApiBasePath  + "/menu_items/" + invalidShortName + ".json").respond(500, errorObj);


    form.favdish.$setViewValue(invalidShortName);
    $scope.$digest();
    httpBackend.flush();

    expect($scope.user.favdish).toEqual(invalidShortName);
    expect(form.favdish.$invalid).toBe(true);
  });

});
