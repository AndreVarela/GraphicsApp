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

    // -> /api/values em produção
 	// -> http://localhost:30954/values em dev
 	//Actualizar no restangular tambem -> app.js
 	var getURLServer = 'http://localhost:30954/'

 	return {
 		getURLServer : getURLServer,
 		
	  	updateEmails: function(emails)
	  	{
	  		var deferred = $q.defer();
 			
 			$http.post(getURLServer+'email', emails)
				.success(function(data, status, config, headers){
 					deferred.resolve(data);
 				})
	        	.error(function(data, status, headers, config, statusText){
	      	    	deferred.reject(data, status, headers);
	        	});

	        return deferred.promise;
	  	},
	  	addPlafounds: function(plafound)
	  	{
	  		var deferred = $q.defer();
 			
 			$http.post(getURLServer+'plafound', plafound)
				.success(function(data, status, config, headers){
 					deferred.resolve(data);
 				})
	        	.error(function(data, status, headers, config, statusText){
	      	    	deferred.reject(data, status, headers);
	        	});

	        return deferred.promise;
	  	},
	  	getReport: function()
	  	{
	  		var deferred = $q.defer();
 			
 			$http.get(getURLServer+'getReport', null, { responseType: 'arraybuffer' })
				.success(function(data, status, config, headers){
 					deferred.resolve(data);
 				})
	        	.error(function(data, status, headers, config, statusText){
	      	    	deferred.reject(data, status, headers);
	        	});

	        return deferred.promise;
	  	}
	};
});


