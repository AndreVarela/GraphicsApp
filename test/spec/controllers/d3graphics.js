'use strict';

describe('Controller: D3graphicsCtrl', function () {

  // load the controller's module
  beforeEach(module('moneyGraphicsAppApp'));

  var D3graphicsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    D3graphicsCtrl = $controller('D3graphicsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
