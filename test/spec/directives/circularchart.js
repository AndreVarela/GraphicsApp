'use strict';

describe('Directive: CircularChart', function () {

  // load the directive's module
  beforeEach(module('moneyGraphicsAppApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<-circular-chart></-circular-chart>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the CircularChart directive');
  }));
});
