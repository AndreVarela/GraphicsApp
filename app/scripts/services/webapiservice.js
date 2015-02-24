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

    // -> /api/ em produção
 	// -> http://localhost:30954/ em dev
 	//Actualizar no restangular tambem -> app.js
 	var getURLServer = '/api/'

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
	  	getReport: function(report)
	  	{
	  		var deferred = $q.defer();
 			
 			$http.post(getURLServer +'report', report, { responseType: 'arraybuffer' })
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


