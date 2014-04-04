var StockListView = timber({

	className: 'stock-list',

	tagName: "table",

	init: function(options) {

		options = options || {};

		if (options.collection)
			this.collection = options.collection;

		this.render();

	},

	events: {
		'click tr': 'showStock'
	},

	showStock: function() {

		new StockView();

	},

	render: function() {

		this.$el.html(Handlebars.templates['lists/StockListView']({ 
			empty: this.collection.size()  
		}));

		if (this.collection.size() > 0)
			this.populate();
	},
 
	populate: function() {
		var len = this.collection.size();

		for (var i = 0; i < len; i++) {
			this.$el.append(new StockItemView({ model: this.collection.get(i) }).el);
		}
	}

});