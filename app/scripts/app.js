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
    'd3'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/D3Graphics', {
        templateUrl: 'views/d3graphics.html',
        controller: 'D3graphicsCtrl'
      })
      .when('/D3RadialProgressGraphics', {
        templateUrl: 'views/d3radialprogressgraphics.html',
        controller: 'D3radialprogressgraphicsCtrl'
      })
      .when('/TestWebApi', {
        templateUrl: 'views/testwebapi.html',
        controller: 'TestWebApiCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
