'use strict';

/**
 * @ngdoc directive
 * @name moneyGraphicsAppApp.directive:input
 * @description
 * # input
 */
 angular.module('moneyGraphicsAppApp')
 
 .directive('checkbox', function () {
  return {
    restrict: 'E',
    scope: {
      label: '@',
      model: '=',
      ngDisabled: '='
    },
    template:
    '<label>'+
    ' {{label}} <input ng-disabled={{ngDisabled}} type="checkbox" ng-model="model"/>'+
    '</label>'
  };
})
.directive('textbox', function () {
	return {
		restrict: 'E',
		scope: {
			label: '@',
			placeholder: '@',
			model: '=',
			controlId: '@',
			ngDisabled: '='
		},
		template:
		'<div class="form-group">' +
		'<label>{{label}}</label>' +
		'<input ng-disabled={{ngDisabled}} type="text" id="{{controlId}}" class="form-control input-sm" ng-model="model" placeholder="{{placeholder}}"/>' +
		'</div>'
	};
})
.directive('emailbox', function () {
	return {
		restrict: 'E',
		scope: {
			label: '@',
			placeholder: '@',
			model: '=',
			controlId: '@',
			ngDisabled: '='
		},
		template:
		'<div class="form-group">' +
		'<label>{{label}}</label>' +
		'<input ng-disabled={{ngDisabled}} type="email" id="{{controlId}}" class="form-control input-sm" ng-model="model" placeholder="{{placeholder}}"/>' +
		'</div>'
	};
})
.directive('datebox', function () {
	return {
		restrict: 'E',
		scope: {
			label: '@',
			placeholder: '@',
			model: '='
			},
		link: function(scope, element, attrs) {
			scope.dateOptions = {
		        changeYear: true,
		        changeMonth: true,
		        dateFormat: 'yy-mm-dd'
	    	};
    	},
		template:
		'<div class="form-group">' +
		'<label>{{label}}</label>' +
		'<input placeholder={{placeholder}} class="form-control input-sm" ui-date="dateOptions" ng-model="model"' +
		' ui-date-format="yy-mm-dd"/>' +
		'</div>'
	};
})
.directive('moneybox', function () {
	return {
		restrict: 'E',
		scope: {
			label: '@',
			placeholder: '@',
			model: '=',
			controlId: '@',
			ngDisabled: '='
		},
		template:
		'<div class="form-group">' +
		'<label>{{label}}</label>' +
		'<input ng-disabled={{ngDisabled}} type="text" id="{{controlId}}" class="form-control input-sm" ng-model="model" placeholder="{{placeholder}}" valid-number />' +
		'</div>'
	};
})
.directive('validNumber', function() {
      return {
        require: '?ngModel',
        link: function(scope, element, attrs, ngModelCtrl) {
          if(!ngModelCtrl) {
            return; 
          }

          ngModelCtrl.$parsers.push(function(val) {
            if (angular.isUndefined(val)) {
                var val = '';
            }
            var clean = val.replace(/[^0-9\.]/g, '');
            var decimalCheck = clean.split('.');

            if(!angular.isUndefined(decimalCheck[1])) {
                decimalCheck[1] = decimalCheck[1].slice(0,2);
                clean =decimalCheck[0] + '.' + decimalCheck[1];
            }

            if (val !== clean) {
              ngModelCtrl.$setViewValue(clean);
              ngModelCtrl.$render();
            }
            return clean;
          });

          element.bind('keypress', function(event) {
            if(event.keyCode === 32) {
              event.preventDefault();
            }
          });
        }
      };
})
.directive('dropdown', function () {
  return {
    restrict: 'E',
    scope: {
      label:'@',
      placeholder: '@',
      model: '=',
      items:'=',
    },
    template:
    '<div class="form-group">' +
	  '<label style="color:#333">{{label}}</label>' +
    '<select ng-model="model" style="width: 100%;" class="form-control input-sm"' +
    ' ng-options="c.code as c.shortDescription for c in items ">' +
    '<option value="" style="color: #999;" class="clickable">{{placeholder}}</option>' +
    '</select>'+
    '</div>',
    link: function(scope, elm, attrs) {
      scope.$watch('model', function(nVal) {
       var current = elm.val();
       if (current !== '') {
         elm.css('color','black');
       } else {
         elm.css('color','#999 !important;');
       }

     });
    },
  replace: true
};
})

