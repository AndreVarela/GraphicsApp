'use strict';

/**
 * @ngdoc service
 * @name moneyGraphicsAppApp.WebApiService
 * @description
 * # WebApiService
 * Service in the moneyGraphicsAppApp.
 */
 angular.module('moneyGraphicsAppApp')
 .service('WebApiService', function ($http, $q) {

 	return {
 		getData: function() { 

 			var deferred = $q.defer();
 			
 			// -> /api/values em produção
 			// -> http://localhost:30954/values em dev
 			$http.get('http://localhost:30954/values')
			.success(function(data, status, config, headers){
 				deferred.resolve(data);;
 			})
	        .error(function(data, status, headers, config, statusText){ //handler errors here
	      	    deferred.reject('Rejected');
	        });

	        return deferred.promise;
	  }
	};
});


