'use strict';

/**
 * @ngdoc function
 * @name moneyGraphicsAppApp.controller:GraphicsCtrl
 * @description
 * # GraphicsCtrl
 * Controller of the moneyGraphicsAppApp
 */
angular.module('moneyGraphicsAppApp')
  .controller('GraphicsCtrl', function ($scope, WebApiService, $interval, Restangular, $timeout, $rootScope) {
    
    $scope.startProcess = function startProcess(data)
	{
		$scope.start(data.radialProgress.counterBNA, data.radialProgress.counterEMIS); 
		
		$scope.UpdateDonutBNA(data.donutBNA);	
		$scope.UpdateDonutEMIS(data.donutEMIS);		
		$scope.UpdateGroupBar(data.barBNA, data.barEMIS);

		
		$('#ValorTotalDia').text('Plafond: ' + data.radialProgress.totalMoneyBNA + " AOA");
		$('#ValorSobraDia').text('Resta: ' + data.radialProgress.sobraMoneyBNA + " AOA");
		$('#ValorTotalDia2').text('Plafond: ' + data.radialProgress.totalMoneyEMIS + " AOA");
		$('#ValorSobraDia2').text('Resta: ' + data.radialProgress.sobraMoneyEMIS + " AOA");
	}

 	$scope.MakeGraphics = function MakeGraphics(data)
 	{
		/* Dados para os graficos - JSON do servidor */
		var jsonRadialProgress = data.radialProgress;
		var salesDataBNA =  data.donutBNA;
		var salesDataEMIS = data.donutEMIS;
		var datasetBNA =  data.barBNA;
		var datasetEMIS = data.barEMIS;

		$scope.totalAmountBNA = jsonRadialProgress.totalMoneyBNA;
		$scope.sobraAmountBNA = jsonRadialProgress.sobraMoneyBNA;
		$scope.totalAmountEMIS = jsonRadialProgress.totalMoneyEMIS;
		$scope.sobraAmountEMIS = jsonRadialProgress.sobraMoneyEMIS;
		/* Fim dos dados para os graficos */

		/* Inicialização Dados */
		var maginSalesDonut = 20;
		var tamanhoParaasImages = 100, heightBNA = 262, heightEMIS = 192;
		var _className = ""; 
		var _beginDonut1 = 0, _beginDonut2 = 0;
		/* Fim da Inicialização dos dados */

		/* CSS DIVS dos GRAFICOS*/
		var originalWidth = eval(window.innerWidth) - 2 - 5 - 200;
		var originalHeight = eval(window.innerHeight) - 5 - 80 - 15 - 20;

		var rowDivWidth = originalWidth;
		var rowDivHeight = originalHeight/2;

		var insideDivWidth = ((rowDivWidth-tamanhoParaasImages)/3);
		var insideDivHeight = rowDivHeight;
		var insideDivHeightDiv1 = insideDivHeight - 40;

		var diameterSalesDonut = Math.min(insideDivWidth, insideDivHeightDiv1) - maginSalesDonut;

		$('#row1').width(rowDivWidth).height(rowDivHeight);
		$('#row2').width(rowDivWidth).height(rowDivHeight);
		
		$('#bnaImage').width(100).height(insideDivHeight);
		$('#bnaImageImg').css('margin-top', ((insideDivHeight/2) - (heightBNA/2)));
		$('#div01').width(insideDivWidth).height(insideDivHeight);
		$('#div1').width(insideDivWidth).height(insideDivHeightDiv1);
		$('#ValorTotalDia').width(insideDivWidth).height(20);
		$('#ValorSobraDia').width(insideDivWidth).height(20);
		$('#div2').width(insideDivWidth).height(insideDivHeight);
		$('#div3').width(insideDivWidth).height(insideDivHeight);

		$('#emisImage').width(100).height(insideDivHeight);
		$('#emisImageImg').css('margin-top', ((insideDivHeight/2) - (heightEMIS/2)));
		$('#div02').width(insideDivWidth).height(insideDivHeight);
		$('#div4').width(insideDivWidth).height(insideDivHeightDiv1);
		$('#ValorTotalDia2').width(insideDivWidth).height(20);
		$('#ValorSobraDia2').width(insideDivWidth).height(20);
		$('#div5').width(insideDivWidth).height(insideDivHeight);
		$('#div6').width(insideDivWidth).height(insideDivHeight);

		/* Fim das CSS DIVS dos GRAFICOS*/

		/*Codigo do Radial Progress*/

		var svg = d3.select(document.getElementById('div1')).append("svg").attr("width",diameterSalesDonut).attr("height",diameterSalesDonut).attr("id","salesDonut");
		var svg2 = d3.select(document.getElementById('div4')).append("svg").attr("width",diameterSalesDonut).attr("height",diameterSalesDonut).attr("id","salesDonut2");

		function UpdateValue(value)
		{
			if(value <41) 
			{
				if(value>30 && value <41) {	_className = "arcyellow40";	}
				else if(value>20 && value <31) {_className = "arcorange30";	}
				else if(value>10 && value <21) {_className = "arcred20";}
				else if(value >= 0 && value < 10) { _className = "arcred0";}
				else { _className = "arcred10";	}
			}
			else if (value > 40 && value < 61) {
				if (value > 40 && value < 51) { _className = "arcorange50";	}
				else if (value > 50 && value <= 60)	{_className = "arcyellow60";}
			}
			else 
			{	
				if (value >=61 && value < 71){_className = "arcgreen70";} 
				else if (value > 70 && value < 81){	_className = "arcgreen80";}	
				else if (value > 80 && value <=90){_className = "arcgreen90";}
				else if (value >= 91 && value <= 95){_className = "arcgreen95";}
				else { _className = "arcgreen100"; }
			}
		}

		function UpdateRadial(id, value, className)
		{
			_className = className;

			if(id == "div1")
			{
				var rp1 = radialProgress(document.getElementById(id), diameterSalesDonut, diameterSalesDonut, className)
				.diameter(diameterSalesDonut)
				.value((100-value)*-1)			
				.render();							
			}
			else
			{
				var rp1 = radialProgress(document.getElementById(id), diameterSalesDonut, diameterSalesDonut, className)
				.diameter(diameterSalesDonut)
				.value((100-value)*-1)					
				.render();							
			}
		}

		function Clean(id)
		{
			document.getElementById(id).innerHTML = "";			
		}

		$scope.applyCssStyles = function applyCssStyles()
		{
			$(".radial-svg").css('margin-top', maginSalesDonut/2);
			$(".radial-svg").css('margin-bottom', maginSalesDonut/2);
		}

		$scope.start = function start(value,value2) {

			if(value >= 0)
			{
				Clean("div1");
				UpdateValue(value);
				UpdateRadial('div1', value, _className);
			}

			if(value2 >= 0)
			{
				Clean("div4");
				UpdateValue(value2);
				UpdateRadial('div4', value2, _className);
			}

			$scope.applyCssStyles();
		}

		/* FIM Codigo do Radial Progress*/

		/* Inicio Codigo Donut3D */

		$scope.UpdateDonutBNA = function UpdateDonutBNA(salesData)
		{
			Clean('div2');
			var svg3 = d3.select(document.getElementById('div2')).append("svg").attr("width",insideDivWidth).attr("height",insideDivHeight);
			svg3.append("g").attr("id", "salesDonut");
			Donut3D.draw("salesDonut", salesData, insideDivWidth/2, insideDivHeight/2, insideDivWidth/3, insideDivHeight/3, insideDivHeight/10, 0.3);
		}

		$scope.UpdateDonutEMIS = function UpdateDonutEMIS(salesData)
		{
			Clean('div5');
			var svg4 = d3.select(document.getElementById('div5')).append("svg").attr("width",insideDivWidth).attr("height",insideDivHeight);
			svg4.append("g").attr("id", "salesDonut2");
			Donut3D.draw("salesDonut2", salesData, insideDivWidth/2, insideDivHeight/2, insideDivWidth/3, insideDivHeight/3, insideDivHeight/10, 0.3);
		}

		/* Fim Codigo Donut3D */


		/* Início Código Bar Chart */
		var insideDivHeightBy = insideDivHeight/7;

		var margin = {
			top: insideDivHeightBy,
			bottom: insideDivHeightBy,
			right: insideDivWidth/9,
			left: insideDivWidth/4.6
		},
		w = insideDivWidth - margin.left - margin.right,
		h = insideDivHeight - margin.top - margin.bottom;
		var padding = 10;

		var colors = [["Bna",  "#20B3D2"]];
		var colors2 = [["Emi", "#706248"]];

		var xScaleBNA = d3.scale.ordinal().domain(d3.range(datasetBNA.length)).rangeRoundBands([0, w], 0.05);
		var yScaleBNA = d3.scale.linear().domain([0, d3.max(datasetBNA, function (d) {	return (d.value); })]).range([h, 0]);
		
		var xAxisBNA = d3.svg.axis().scale(xScaleBNA).tickFormat(function (d) {	return datasetBNA[d].day;}).orient("bottom");
		var yAxisBNA = d3.svg.axis().scale(yScaleBNA).orient("left").ticks(5);
		var xScaleEMIS = d3.scale.ordinal().domain(d3.range(datasetEMIS.length)).rangeRoundBands([0, w], 0.05);
		var yScaleEMIS = d3.scale.linear().domain([0, d3.max(datasetEMIS, function (d) { return (d.value); })]).range([h, 0]);
		
		var xAxisEMIS = d3.svg.axis().scale(xScaleEMIS).tickFormat(function (d) {	return datasetEMIS[d].day;}).orient("bottom");
		var yAxisEMIS = d3.svg.axis().scale(yScaleEMIS).orient("left").ticks(5);
		var commaFormat = d3.format(',');

		function RenderGroupedGraphicBNA(dataset)
		{
			var svg = d3.select("#div3")
			.append("svg")
			.attr("width", w + margin.left + margin.right)
			.attr("height", h + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			var sets = svg.selectAll(".set")
			.data(dataset)
			.enter()
			.append("g")
			.attr("class", "set")
			.attr("transform", function (d, i) {
				return "translate(" + xScaleBNA(i) + ",0)";
			});

			sets.append("rect")
			.attr("class", "local")
			.attr("width", xScaleBNA.rangeBand() / 2)
			.attr("y", function (d) {
				return yScaleBNA(d.value);
			})
			.attr("x", xScaleBNA.rangeBand() / 2)
			.attr("height", function (d) {
				return h - yScaleBNA(d.value);
			})
			.attr("fill", colors[0][1])
			;

		    svg.append("g") // Add the X Axis
		    .attr("class", "x axis")
		    .attr("transform", "translate(0," + (h) + ")")
		    .call(xAxisBNA)
		    .selectAll("text")
		    .style("text-anchor", "end")
		    .attr("dx", "-.8em")
		    .attr("dy", ".15em")
		    .attr("transform", function (d) {
		    	return "rotate(-25)";
		    });

		    svg.append("g")
		    .attr("class", "y axis")
		    .attr("transform", "translate(0 ,0)")
		    .call(yAxisBNA);

		    svg.append("text")
		    .attr("transform", "rotate(0)")
		 	.attr("y", insideDivHeight-margin.bottom-margin.top+10)
            .attr("x", insideDivWidth-margin.left-margin.right+20)
		    .attr("dy", "1em")
		    .style("text-anchor", "middle")
		    .style("style", "fontred")
		    .style("position", "absolute")
		    .text("(Dias)");

			svg.append("text")
			.attr("transform", "rotate(0)")
			.attr("y", -margin.top/2-10)
			.attr("x", -20)
			.attr("dy", "1em")
			.style("text-anchor", "middle")
			.style("style", "fontred")
			.style("position", "absolute")
			.text("(AOA)");
		}

		function RenderGroupedGraphicEMIS(dataset)
		{
			var svg = d3.select("#div6")
			.append("svg")
			.attr("width", w + margin.left + margin.right)
			.attr("height", h + margin.top + margin.bottom)
			.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			var sets = svg.selectAll(".set")
			.data(dataset)
			.enter()
			.append("g")
			.attr("class", "set")
			.attr("transform", function (d, i) {
				return "translate(" + xScaleEMIS(i) + ",0)";
			});

			sets.append("rect")
			.attr("class", "local")
			.attr("width", xScaleEMIS.rangeBand() / 2)
			.attr("y", function (d) {
				return yScaleEMIS(d.value);
			})
			.attr("x", xScaleEMIS.rangeBand() / 2)
			.attr("height", function (d) {
				return h - yScaleEMIS(d.value);
			})
			.attr("fill", colors2[0][1])
			;

			svg.append("g") // Add the X Axis
		    .attr("class", "x axis")
		    .attr("transform", "translate(0," + (h) + ")")
		    .call(xAxisEMIS)
		    .selectAll("text")
		    .style("text-anchor", "end")
		    .attr("dx", "-.8em")
		    .attr("dy", ".15em")
		    .attr("transform", function (d) {
		    	return "rotate(-25)";
		    });

		    svg.append("g")
		    .attr("class", "y axis")
		    .attr("transform", "translate(0 ,0)")
		    .call(yAxisEMIS);

		    svg.append("text")
		    .attr("transform", "rotate(0)")
		    .attr("y", insideDivHeight-margin.bottom-margin.top+10)
            .attr("x", insideDivWidth-margin.left-margin.right+20)
		    .attr("dy", "1em")
		    .style("text-anchor", "middle")
		    .style("style", "fontred")
		    .style("position", "absolute")
		    .text("(Dias)");

			svg.append("text")
			.attr("transform", "rotate(0)")
			.attr("y", -margin.top/2-10)
			.attr("x", -20)
			.attr("dy", "1em")
			.style("text-anchor", "middle")
			.style("style", "fontred")
			.style("position", "absolute")
			.text("(AOA)");	

		}

		$scope.UpdateGroupBar = function UpdateGroupBar(datasetBNA, datasetEMIS)		
		{
			document.getElementById("div3").innerHTML = "";	
			document.getElementById("div6").innerHTML = "";	
			
			RenderGroupedGraphicBNA(datasetBNA);
			RenderGroupedGraphicEMIS(datasetEMIS);
		}

		/* Fim Código Bar Chart */

		/*Start App*/
		$scope.startProcess(data);
	};

	$scope.refreshGraphicValues = $interval(
		function(){ 
			return Restangular.one('values').get().then(function (data) {
                $scope.startProcess(data);
             });
	}, WebApiService.getTimeRefresh);

});
