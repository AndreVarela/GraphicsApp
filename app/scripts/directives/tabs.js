'use strict';

/**
 * @ngdoc directive
 * @name moneyGraphicsAppApp.directive:Tabs
 * @description
 * # Tabs
 */
 angular.module('moneyGraphicsAppApp')
 .directive('tabs', function () {
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    controller: function($scope) {
      var panes = $scope.panes = [];

      $scope.select = function(pane) {
        angular.forEach(panes, function(pane) {
          pane.selected = false;
        });
        pane.selected = true;
      };

      this.addPane = function(pane) {
        if (panes.length === 0) {$scope.select(pane);}
        if(pane.show !== false)
        {
          panes.push(pane);
        }
      };
    },
    template:
    '<div class="tabbable">' +
    '<ul class="nav nav-justified">' +
    '<li ng-repeat="pane in panes" ng-class="{active:pane.selected}" style="width: 50px;">'+
    '<a href="" ng-click="select(pane)">{{pane.title}}</a>' +
    '</li>' +
    '</ul>' +
    '<div class="tab-content" ng-transclude></div>' +
    '</div>',
    replace: true
  };
})
 
 .directive('pane', function() {
  return {
    require: '^tabs',
    restrict: 'E',
    transclude: true,
    scope: { title: '@', show:'=', permission: '@' },
    link: function(scope, element, attrs, tabsCtrl) {
      var permission = attrs.permission || '';
      var hasPermission = function(permission){
        var permissions = JSON.parse(sessionStorage.getItem('permissions'));

        console.log(permission,permissions);
        return _.contains(permissions, permission);
      };
      if(permission === '' || hasPermission(permission)){
        tabsCtrl.addPane(scope);
      }
    },
    template:
    '<div class="tab-pane" ng-class="{active: selected}" ng-transclude style="margin-top:20px;">' +
    '</div>',
    replace: true
  };
});