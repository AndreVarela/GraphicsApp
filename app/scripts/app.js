'use strict';

/**
 * @ngdoc overview
 * @name moneyGraphicsAppApp
 * @description
 * # moneyGraphicsAppApp
 *
 * Main module of the application.
 */
angular
  .module('moneyGraphicsAppApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'restangular',
    'ui.date'
  ])

  .factory('myHttpInterceptor', function($rootScope, $location) {
    return {
      'request': function(config) {
        $rootScope.loading = true;
        return config || $q.when(config);
      },

      'response': function(response) {
        $rootScope.loading = false;
        return response || $q.when(response);
      },

      'responseError': function(rejection) {
        $rootScope.loading = false;

        if(rejection.status === 500 || rejection.status === 406)
        {
          console.log(rejection);
          alert(rejection.data);
          return $q.reject(rejection);
        }

        if(rejection.status === 401 || rejection.status === 0)      
        {
          console.log(rejection);
          $location.path('/login');
          return $q.reject(rejection);
        }

        console.log(rejection);
        return $q.reject(rejection);
      }
    };
})
  .config(function ($routeProvider, $httpProvider,RestangularProvider) {
    RestangularProvider.setBaseUrl('http://localhost:30954/');
    
    $httpProvider.interceptors.push('myHttpInterceptor');
    $routeProvider
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })

      .when('/Homepage', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        resolve: {
            graphics: function(Restangular){
                return Restangular.one('values').get().then(function (data) {
                    return data;
                }, function (data, status, headers, config, statusText) {
                    return data;
                });
            },
            emails: function(Restangular){
              return Restangular.one('email').get().then(function (data) {
                    return data;
                }, function (data, status, headers, config, statusText) {
                    return data;
                });
            },
            users: function(Restangular){
              return Restangular.one('user').get().then(function (data) {
                                  return data;
                              }, function (data, status, headers, config, statusText) {
                                  return data;
                              });
            },
            plafound: function(Restangular){
              return Restangular.one('plafound').get().then(function (data) {
                    return data;
                }, function (data, status, headers, config, statusText) {
                    return data;
                });
            },
            codeDecodes: function(Restangular){
              return Restangular.one('codedecode').get().then(function (data) {
                    return data;
                }, function (data, status, headers, config, statusText) {
                    return data;
                });
            }
        },
      })
      .otherwise({
        redirectTo: '/login'
      });
  })
  
  