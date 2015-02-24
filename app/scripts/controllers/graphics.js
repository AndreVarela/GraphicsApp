'use strict';

/**
 * @ngdoc function
 * @name moneyGraphicsAppApp.controller:GraphicsCtrl
 * @description
 * # GraphicsCtrl
 * Controller of the moneyGraphicsAppApp
 */
angular.module('moneyGraphicsAppApp')
  .controller('GraphicsCtrl', function ($scope, WebApiService, $interval, Restangular) {
    $scope.startProcess = function startProcess(data)
	{
		$scope.start(data.radialProgress.counterBNA, data.radialProgress.counterEMIS); 
		$scope.UpdateDonutBNA(data.donutBNA);	
		$scope.UpdateDonutEMIS(data.donutEMIS);		
		$scope.UpdateGroupBar(data.barBNA, data.barEMIS);
	}

 	$scope.MakeGraphics = function MakeGraphics(data)
 	{
		/* Dados para os graficos - JSON do servidor */
		var jsonRadialProgress = data.radialProgress;
		var salesDataBNA =  data.donutBNA;
		var salesDataEMIS = data.donutEMIS;
		var datasetBNA =  data.barBNA;
		var datasetEMIS = data.barEMIS;
		/* Fim dos dados para os graficos */

		/* Inicialização Dados */
		var maginSalesDonut = 20;
		var tamanhoParaasImages = 100, heightBNA = 262, heightEMIS = 192;

		var _counterBNA = jsonRadialProgress.counterBNA, _totalMoney = jsonRadialProgress.totalMoneyBNA,
		_counterEMIS = jsonRadialProgress.counterEMIS, _totalMoneyEMIS = jsonRadialProgress.totalMoneyEMIS, _className = ""; 

		$scope.totalAmountBNA = jsonRadialProgress.totalMoneyBNA;
		$scope.sobraAmountBNA = jsonRadialProgress.sobraMoneyBNA;
		$scope.totalAmountEMIS = jsonRadialProgress.totalMoneyBNA;
		$scope.sobraAmountEMIS = jsonRadialProgress.sobraMoneyEMIS;

		var _beginDonut1 = 0, _beginDonut2 = 0;
		var _BNAValue = 0, _EMISValue = 0;
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

		/*Codigo do Radial Progress*/
		var svg = d3.select(document.getElementById('div1')).append("svg").attr("width",diameterSalesDonut).attr("height",diameterSalesDonut).attr("id","salesDonut");
		var svg2 = d3.select(document.getElementById('div4')).append("svg").attr("width",diameterSalesDonut).attr("height",diameterSalesDonut).attr("id","salesDonut2");

		var div1=d3.select(document.getElementById('div1'));
		var div4=d3.select(document.getElementById('div4'));

		function UpdateMoney(last, money)
		{
			var newValue = Math.floor((Math.random() * 5000) + 1);		
			money = eval(money) - eval(newValue);

			if(last == 1)
			{	
				newValue = money;
				money = 50000;			
			}	
			return newValue;
		}

		function UpdateMoney2(last, money)
		{
			var newValue = Math.floor((Math.random() * 5000) + 1);		
			money = eval(money) - eval(newValue);

			if(last == 1)
			{	
				newValue = money;
				money = 50000;			
			}	
			return newValue;
		}

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

		function UpdateRadial(id, value, className, onClick)
		{
			_className = className;

			if(id == "div1")
			{
				var rp1 = radialProgress(document.getElementById(id), diameterSalesDonut, diameterSalesDonut, className)
				.onClick(onClick)
				.diameter(diameterSalesDonut)
				.value((100-value)*-1)			
				.render();							
			}
			else
			{
				var rp1 = radialProgress(document.getElementById(id), diameterSalesDonut, diameterSalesDonut, className)
				.onClick(onClick)
				.diameter(diameterSalesDonut)
				.value((100-value)*-1)					
				.render();							
			}
		}

		function onClick1() {
			_counterBNA = 100;
			_totalMoney = 1000000;		
			start(0,0);
		}

		function onClick2() {
			_counterEMIS = 100;
			_totalMoneyEMIS = 1000000;		
			start(0,0);
		}

		function labelFunction(val,min,max) {

		}

		function deselect() {
			div1.attr("class","radial");
			div4.attr("class","radial");
		}


		function Clean(id)
		{
			document.getElementById(id).innerHTML = "";			
		}

		/*CSS STYLES*/
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
				UpdateRadial('div1', value, _className, onClick1);
			}

			if(value2 >= 0)
			{
				Clean("div4");
				UpdateValue(value2);
				UpdateRadial('div4', value2, _className, onClick2);
			}

			$scope.applyCssStyles();
		}

		/* FIM Codigo do Radial Progress*/

		/* Inicio Codigo Donut3D */

		var svg3 = d3.select(document.getElementById('div2')).append("svg").attr("width",insideDivWidth).attr("height",insideDivHeight);
		svg3.append("g").attr("id", "salesDonut")

		var svg4 = d3.select(document.getElementById('div5')).append("svg").attr("width",insideDivWidth).attr("height",insideDivHeight);
		svg4.append("g").attr("id", "salesDonut2")

		var key = function(d){ return d.data.label; };
		var key2 = function(d){ return d.data.label; };

		var color = d3.scale.ordinal()
		.domain(["Basic", "Plus", "amet", "Lite", "Elite", "Delux", "Mega", "Turbo", "Gangsta", "Top", "Lux"])
		.range(["#3366CC", "#DC3912", "#FF9900", "#109618", "#990099", "#000000", "#A52A2A", "#FF8C00", "#8FBC8F", "#808000"]);

		var color2 = d3.scale.ordinal()
		.domain(["Basic", "Plus", "amet", "Lite", "Elite", "Delux", "Mega", "Turbo", "Gangsta", "Top", "Lux"])
		.range(["#3366CC", "#DC3912", "#FF9900", "#109618", "#990099", "#000000", "#A52A2A", "#FF8C00", "#8FBC8F", "#808000"]);

		$scope.UpdateDonutBNA = function UpdateDonutBNA(salesData)
		{
			if(_beginDonut1 == 0)
			{
				_beginDonut1 = 1;
				Donut3D.draw("salesDonut", salesData, insideDivWidth/2, insideDivHeight/2, insideDivWidth/3, insideDivHeight/3, insideDivHeight/10, 0.3);
			}
			else
			{	
				Donut3D.transition("salesDonut", salesData, insideDivWidth/3, insideDivHeight/3, insideDivHeight/10, 0.3);	
			}	
		}

		$scope.UpdateDonutEMIS = function UpdateDonutEMIS(salesData)
		{
			if(_beginDonut2 == 0)
			{
				_beginDonut2 = 1;		
				Donut3D.draw("salesDonut2", salesData, insideDivWidth/2, insideDivHeight/2, insideDivWidth/3, insideDivHeight/3, insideDivHeight/10, 0.3);
			}
			else
			{	
				Donut3D.transition("salesDonut2", salesData, insideDivWidth/3, insideDivHeight/3, insideDivHeight/10, 0.3);	
			}
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

		var colors = [
		["Bna",  "#20B3D2"]
		];

		var colors2 = [
		["Emi", "#706248"]
		];

		var xScaleBNA = d3.scale.ordinal()
		.domain(d3.range(datasetBNA.length))
		.rangeRoundBands([0, w], 0.05);

		var yScaleBNA = d3.scale.linear()
		.domain([0, d3.max(datasetBNA, function (d) {
			return (d.value);
		})])
		.range([h, 0]);
		
		var xAxisBNA = d3.svg.axis()
		.scale(xScaleBNA)
		.tickFormat(function (d) {
			return datasetBNA[d].day;
		})
		.orient("bottom");
		
		var yAxisBNA = d3.svg.axis()
		.scale(yScaleBNA)
		.orient("left")
		.ticks(5);

		var xScaleEMIS = d3.scale.ordinal()
		.domain(d3.range(datasetEMIS.length))
		.rangeRoundBands([0, w], 0.05);

		var yScaleEMIS = d3.scale.linear()
		.domain([0, d3.max(datasetEMIS, function (d) {
			return (d.value);
		})])
		.range([h, 0]);
		
		var xAxisEMIS = d3.svg.axis()
		.scale(xScaleEMIS)
		.tickFormat(function (d) {
			return datasetEMIS[d].day;
		})
		.orient("bottom");
		
		var yAxisEMIS = d3.svg.axis()
		.scale(yScaleEMIS)
		.orient("left")
		.ticks(5);

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
		    .attr("y", insideDivHeight-margin.bottom-margin.top+30)
		    .attr("x", insideDivWidth-margin.left-margin.right-10)
		    .attr("dy", "1em")
		    .style("text-anchor", "middle")
		    .style("style", "fontred")
		    .style("position", "absolute")
		    .text("(Últimos Dias)");

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
		    .attr("y", insideDivHeight-margin.bottom-margin.top+30)
		    .attr("x", insideDivWidth-margin.left-margin.right-10)
		    .attr("dy", "1em")
		    .style("text-anchor", "middle")
		    .style("style", "fontred")
		    .style("position", "absolute")
		    .text("(Últimos Dias)");

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

	$interval(
		function(){ 

			return Restangular.one('values').get().then(function (data) {
                $scope.startProcess(data);
            });
	}, 60000);

});
