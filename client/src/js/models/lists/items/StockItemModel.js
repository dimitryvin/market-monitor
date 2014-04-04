var StockItemModel = timber({

	domless: true,

	defaults: {
		data: {}
	},

	init: function(options) {

		options = options || {};

		this.data = options.data;

	},

	getData: function() {
		return this.data;		
	}

});