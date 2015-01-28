'use strict';

describe('Controller: TestwebapiCtrl', function () {

  // load the controller's module
  beforeEach(module('moneyGraphicsAppApp'));

  var TestwebapiCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TestwebapiCtrl = $controller('TestwebapiCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
