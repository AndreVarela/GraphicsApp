'use strict';

/**
 * @ngdoc function
 * @name moneyGraphicsAppApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the moneyGraphicsAppApp
 */
angular.module('moneyGraphicsAppApp')
  .controller('LoginCtrl', function ($scope, UserService, $location) {
 	$scope.user = { Username : '', Password : ''};

    $scope.authenticate = function(username, password){

    	$scope.error = '';
		$scope.user.Username = username;
		$scope.user.Password = password;

		UserService.autenticate($scope.user).then(
			function(data){

				if(data == null)
			    {
			    	$scope.error = 'Utilizador/palavra-passe inválidos.';
			    }
			    else
			    {
			    	sessionStorage.setItem('userName', data.userName);
					sessionStorage.setItem('role', data.role);
					sessionStorage.setItem('permissions', JSON.stringify(data.permissions));
			    	$location.path('/Homepage');
			    }
		  	}
		);
    };

    $scope.hasError = function(){
      return $scope.error;
    };
 });
