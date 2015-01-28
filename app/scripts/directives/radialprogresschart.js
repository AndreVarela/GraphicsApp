'use strict';

/**
 * @ngdoc directive
 * @name moneyGraphicsAppApp.directive:radialProgressChart
 * @description
 * # radialProgressChart
 */
angular.module('moneyGraphicsAppApp')
  .directive('radialProgressChart', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the radialProgressChart directive');
      }
    };
  });
