var StockView = timber({

	className: 'stock-container',

	tagName: "div",

	requires: [
		'../../../templates/sections/StockView.handlebars template',
		'../../utilities/YahooAPI YahooAPI',
		'../../../lib/js/jquery.csv.min $.csv'
	],

	init: function() {

		YahooAPI().getStock("MSFT").done(function(data) {
			console.log($.csv.toArrays(data));
		});

		this.render();

	},

	render: function() {

		this.$el.html(template({
			
		}));

	}

});