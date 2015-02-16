'use strict';

/**
 * @ngdoc service
 * @name moneyGraphicsAppApp.user
 * @description
 * # user
 * Service in the moneyGraphicsAppApp.
 */
angular.module('moneyGraphicsAppApp')
  .service('UserService', function (WebApiService, $q, $http) {
    
	var autenticate = function(user)
    {
        var d = $q.defer();

        $http.post(WebApiService.getURLServer + 'login', user)
	        .success(function(data, status, headers){
				d.resolve(data, status, headers);
		    })
	        .error(function(data, status, headers){
            	d.reject(data, status, headers);
        	});

        return d.promise;
    };

    var logout = function()
    {
        var d = $q.defer();
        $http.delete(WebApiService.getURLServer + 'login')
        .success(function(data, status, headers){
          sessionStorage.setItem('userName', undefined);
          sessionStorage.setItem('role', undefined);
          sessionStorage.setItem('permissions', undefined);

          d.resolve(data, status, headers);
        })
        .error(function(data, status, headers){
            d.reject(data, status, headers);
          });

        return d.promise;
    };

    return {
      autenticate: autenticate,
      logout: logout
    };

  });
