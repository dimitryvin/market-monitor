timber({

	className: 'stock-container',

	tagName: "div",

	requires: [
		'~/templates/sections/StockView.handlebars template',
		'~/js/utilities/YahooAPI YahooAPI',
		'~/lib/js/spinner.min.js a',
		'~/js/utilities/Utils Utils'

	],

	init: function() {

		YahooAPI().getStock(Utils().getVar('stock'), function(stock) {

			this.stockData = stock;

			this.render();

		}.bind(this));

		this.render();

	},

	render: function() {

		this.$el.animate({ opacity: 0 }, 100, function() {

			this.$el.html(template({ empty: !this.stockData, stock: this.stockData })).animate({ opacity: 1 }, 100);

			if (!this.stockData) {
				setTimeout(function() { 
					var opts = {
						lines: 13, // The number of lines to draw
						length: 20, // The length of each line
						width: 10, // The line thickness
						radius: 30, // The radius of the inner circle
						corners: 1, // Corner roundness (0..1)
						rotate: 0, // The rotation offset
						direction: 1, // 1: clockwise, -1: counterclockwise
						color: '#000', // #rgb or #rrggbb or array of colors
						speed: 1, // Rounds per second
						trail: 60, // Afterglow percentage
						shadow: false, // Whether to render a shadow
						hwaccel: false, // Whether to use hardware acceleration
						className: 'spinner', // The CSS class to assign to the spinner
						zIndex: 2e9, // The z-index (defaults to 2000000000)
						top: this.$el.height() / 2 + 'px', // Top position relative to parent in px
						left: this.$el.width() / 2 + 'px' // Left position relative to parent in px
					}; 

					var target = this.el;
					var spinner = new Spinner(opts).spin(target);
				}.bind(this), 0);
			} else {

				chart = new AmCharts.AmSerialChart();
                chart.pathToImages = "compiled/images/";
				chart.dataProvider = this.stockData.histData[0].values;
                chart.categoryField = "date";
                chart.dataDateFormat = "YYYY-MM-DD";

                // AXES
                // category
                var categoryAxis = chart.categoryAxis;
                categoryAxis.parseDates = true; // as our data is date-based, we set parseDates to true
                categoryAxis.minPeriod = "DD"; // our data is daily, so we set minPeriod to DD
                categoryAxis.dashLength = 1;
                categoryAxis.gridAlpha = 0.15;
                categoryAxis.minorGridEnabled = true;
                categoryAxis.axisColor = "#DADADA";

                // value
                var valueAxis = new AmCharts.ValueAxis();
                valueAxis.axisAlpha = 0.2;
                valueAxis.dashLength = 1;
                chart.addValueAxis(valueAxis);
 				
 				// GRAPH
                var graph = new AmCharts.AmGraph();
                graph.title = "red line";
                graph.valueField = "price";
                graph.bullet = "round";
                graph.bulletBorderColor = "#FFFFFF";
                graph.bulletBorderThickness = 2;
                graph.bulletBorderAlpha = 1;
                graph.fillAlphas = 0.5;
                graph.lineThickness = 2;
                graph.lineColor = "#9eaec6";
                graph.negativeLineColor = "#9eaec6";
                graph.balloonText = "[[category]]<br><b><span style='font-size:14px;'>value: [[value]]</span></b>";
                graph.hideBulletsCount = 50; // this makes the chart to hide bullets when there are more than 50 series in selection
                chart.addGraph(graph);

                // CURSOR
                chartCursor = new AmCharts.ChartCursor();
                chartCursor.cursorPosition = "mouse";
                chartCursor.categoryBalloonColor = "#9eaec6";
                chartCursor.cursorColor = "#9eaec6";
                chart.addChartCursor(chartCursor);

                // SCROLLBAR
                var chartScrollbar = new AmCharts.ChartScrollbar();
                chartScrollbar.graph = graph;
                chartScrollbar.scrollbarHeight = 40;
                chartScrollbar.color = "#FFFFFF";
                chartScrollbar.autoGridCount = true;
                chart.addChartScrollbar(chartScrollbar);

				chart.write('chart');

			}

		}.bind(this));

		


	}

});