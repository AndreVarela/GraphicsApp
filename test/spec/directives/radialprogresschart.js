'use strict';

describe('Directive: radialProgressChart', function () {

  // load the directive's module
  beforeEach(module('moneyGraphicsAppApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<radial-progress-chart></radial-progress-chart>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the radialProgressChart directive');
  }));
});
