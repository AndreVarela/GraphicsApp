'use strict';

describe('Service: WebApiService', function () {

  // load the service's module
  beforeEach(module('moneyGraphicsAppApp'));

  // instantiate service
  var WebApiService;
  beforeEach(inject(function (_WebApiService_) {
    WebApiService = _WebApiService_;
  }));

  it('should do something', function () {
    expect(!!WebApiService).toBe(true);
  });

});
