var StockView = timber({

	className: 'stock-container',

	tagName: "div",

	requires: [
		'../../../templates/sections/StockView.handlebars this.template',
		'../../utilities/YahooAPI YahooAPI'
	],

	init: function() {

		YahooAPI().getStock("MSFT").done(function(data) {
			console.log(data);
		});

		this.render();

	},

	render: function() {

		this.$el.html(this.template({
			
		}));

	}

});