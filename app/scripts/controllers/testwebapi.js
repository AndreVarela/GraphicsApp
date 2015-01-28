'use strict';

/**
 * @ngdoc function
 * @name moneyGraphicsAppApp.controller:TestwebapiCtrl
 * @description
 * # TestwebapiCtrl
 * Controller of the moneyGraphicsAppApp
 */
 angular.module('moneyGraphicsAppApp')
 .controller('TestWebApiCtrl', function ($scope, WebApiService) {

	WebApiService.getData().then(function(result){
    	$scope.searchResult = result;
	});


/* 	$scope.search = function() {
 		$scope.searchResult = WebApiService.getData();
 	};*/

 	/*http://stackoverflow.com/questions/18529777/best-way-to-invoke-rest-apis-from-angularjs*/

 });


