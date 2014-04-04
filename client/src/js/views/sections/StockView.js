var StockView = timber({

	className: 'stock-container',

	tagName: "div",

	init: function() {

		YahooAPI().getStocks();

		this.render();

	},

	render: function() {

		/*this.$el.html(Handlebars.templates['sections/StockView']({
			securities: secs
		})); */

	}

});