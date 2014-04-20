timber({

	className: 'stock-container',

	tagName: "div",

	requires: [
		'~/templates/sections/StockView.handlebars template',
		'~/js/utilities/YahooAPI YahooAPI',
		'~/lib/js/spinner.min.js a',
		'~/js/utilities/Utils Utils',
		'~/lib/js/nv.d3.min.js b'
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
				nv.addGraph(function() {
					this.chart = nv.models.lineWithFocusChart()				
						.x(function(d) { return d.date; })
						.y(function(d) { return d.price; });

					this.chart.xAxis
						.tickFormat(function(d) {
							return d3.time.format('%x')(new Date(d))
						});


					this.chart.x2Axis
						.tickFormat(function(d) {
							return d3.time.format('%x')(new Date(d))
						});

					this.chart.yAxis
						.tickFormat(d3.format(',.2f'));

					this.chart.y2Axis
						.tickFormat(d3.format(',.2f'));

					d3.select('#chart svg')
						.datum(this.stockData.histData)
						.transition().duration(500)
						.call(this.chart);

					nv.utils.windowResize(this.chart.update);

					return chart;
				}.bind(this));

			}

		}.bind(this));

		


	}

});