'use strict';

/**
 * @ngdoc function
 * @name moneyGraphicsAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the moneyGraphicsAppApp
 */
 angular.module('moneyGraphicsAppApp')
 .constant('settings', {
  categoryMoney: 'Tipo Moeda',
  categoryMessage: 'Tipo Mensagem',
})
 .controller('MainCtrl', function ($scope, UserService, WebApiService, $controller, $timeout, $location, graphics, emails, plafound,$sce, codeDecodes, settings) {
 	$scope.userName = sessionStorage.getItem('userName');
 	$scope.role = sessionStorage.getItem('role');

 	/* Graphics */
 	
	$timeout(function() {
		var scopeGraphicsCtrl = $scope.$new();
 		$controller('GraphicsCtrl',{$scope : scopeGraphicsCtrl });
	 	scopeGraphicsCtrl.MakeGraphics(graphics);

	 	$scope.totalAmountBNA = graphics.radialProgress.totalMoneyBNA;
		$scope.sobraAmountBNA = graphics.radialProgress.sobraMoneyBNA;
		$scope.totalAmountEMIS = graphics.radialProgress.totalMoneyBNA;
		$scope.sobraAmountEMIS = graphics.radialProgress.sobraMoneyEMIS;
	 });

 	/* Fim de Graphics */

 	/* Administração */
 	$scope.emails = emails;

 	$scope.addEmail = function(email){

 		if(email !== undefined && email.email !== null)
 		{
 			$scope.emails.push({email: email.email, active: true});
 			email.email = null;
 			email.active = null;
 		}

 		$timeout(function() {
 			$('#EmailAdmin').focus();
 		});
 	};

 	$scope.removeFromEmailList = function(item, list){
 		var index = list.indexOf(item);
 		if (index > -1) {
 			list.splice(index, 1);
 		}
 	};

 	$scope.saveEmails = function(){
 		WebApiService.updateEmails($scope.emails).then(function(){
	    	alert('Emails gravados com sucesso.');
	  	});
 	};


 	$scope.cancel = function(){
 		window.history.back();
 	};

 	$scope.plafound = {bna : 0, emis: 0}
 	if(plafound !== undefined && plafound !== null){
 		$scope.plafound.bna = plafound.bNA;
 		$scope.plafound.emis = plafound.eMIS;
 	}

 	$scope.addPlafounds = function(plafound){

 		if(plafound !== undefined && plafound.bna !== null && plafound.bna !== undefined && plafound.emis !== null && plafound.emis !== undefined)
 		{
			WebApiService.addPlafounds(plafound).then(function(){
		    	alert('Plafounds alterados com sucesso.');
		  	});
		}
		else
		{
			alert('Introduza apenas valores numéricos.')			
		}
 	}

 	/* Fim de Administração */

 	/* Reports */

 	$scope.report = {dates:{},money:{}};
 	$scope.codeDecodes = {messageType:{}, moneyType:{}}

 	$scope.mapCodeDecodes = function()
 	{
 		$scope.codeDecodes.messageType = _.filter(codeDecodes, function(code){
 		 	if(code.category === settings.categoryMessage)
 		 	{
 		 		return code; 
 		 	}
 		});

 		$scope.codeDecodes.messageType = _.map($scope.codeDecodes.messageType, function(code){
 			return {code: code.code, shortDescription: code.code}
 		});
 		
 		$scope.codeDecodes.moneyType = _.filter(codeDecodes, function(code){
 		 	if(code.category === settings.categoryMoney)
 		 	{
 		 		return code; 
 		 	}
 		});

 		$scope.codeDecodes.moneyType = _.map($scope.codeDecodes.moneyType, function(code){
 			return {code: code.code, shortDescription: code.code}
 		});
 	}

 	$scope.DownloadFile = function(typeFile, extensionFile)
 	{
 		$scope.report.typeFile = typeFile;
 		$scope.report.extensionFile = extensionFile;

		WebApiService.getReport($scope.report).then(function(data){
			if(data.byteLength === 0)
			{
				alert('Não foram retornados resultados.');
			}
			else
			{
				var file = new Blob([data], { type: 'text/plain;charset=utf-8' });
            	saveAs(file, 'relatorioMovimentos_'+ $scope.actualDateAndTime() + '.'+ $scope.report.extensionFile);
        	}
		});
 	};

 	$scope.mapCodeDecodes();

 	/* Fim dos Reports */

 	/* Logout */

 	$scope.logout = function()
	{
	  UserService.logout().then(function(){
	    $location.path('/login');
	  });
	};

 	/* Fim de Logout */

 	/*Funcoes Auxiliares*/

 	$scope.actualDate = function() {
 	 	var d = new Date();
   		var yyyy = d.getFullYear().toString();
   		var mm = (d.getMonth()+1).toString(); // getMonth() is zero-based
   		var dd  = d.getDate().toString();
   		return yyyy + '-' + (mm[1]?mm:"0"+mm[0]) + '-' + (dd[1]?dd:"0"+dd[0]); // padding
  	};

  	$scope.actualDateAndTime = function() {
 	 	var d = new Date();
   		var yyyy = d.getFullYear().toString();
   		var mm = (d.getMonth()+1).toString(); // getMonth() is zero-based
   		var dd  = d.getDate().toString();
   		var seconds = d.getSeconds().toString();
		var minutes = d.getMinutes().toString();
		var hour = d.getHours().toString();
   		return yyyy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0]) + '_' + (hour[1]?hour:"0"+hour[0]) + (minutes[1]?minutes:"0"+minutes[0]) + 
			(seconds[1]?seconds:"0"+seconds[0]);
  	};

 	/* Fim das funcoes auxiliares */
 });
