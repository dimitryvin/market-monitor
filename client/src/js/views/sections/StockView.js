timber({

	className: 'stock-container',

	tagName: "div",

	requires: [
		'~/templates/sections/StockView.handlebars template',
		'~/js/utilities/YahooAPI YahooAPI'
	],

	init: function() {

		YahooAPI().getStock("AAPL", function(stock) {

			this.stockData = stock;

			this.render();

		}.bind(this));

		this.render();

	},

	render: function() {

		this.$el.html(template({ stock: this.stockData }));

	}

});