var StockCollection = timber({

	domless: true,

	defaults: {
		items: []
	},

	init: function(options) {

		options = options || {};

		if (options.data)
			this.set(options.data);
	},

	set: function(data) {
		this.data = data;

		this.parse();
	},

	parse: function() {

		var len = this.data.length;

		for (var i = 0; i < len; i++) {

			this.items.push(new StockItemModel({ data: this.data[i] }));

		}

	},

	get: function(index) {
		return this.items[index];
	},

	size: function() {
		return this.data.length;
	}

});