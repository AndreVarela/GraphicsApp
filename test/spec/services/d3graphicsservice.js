'use strict';

describe('Service: d3GraphicsService', function () {

  // load the service's module
  beforeEach(module('moneyGraphicsAppApp'));

  // instantiate service
  var d3GraphicsService;
  beforeEach(inject(function (_d3GraphicsService_) {
    d3GraphicsService = _d3GraphicsService_;
  }));

  it('should do something', function () {
    expect(!!d3GraphicsService).toBe(true);
  });

});
