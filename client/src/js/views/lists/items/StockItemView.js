var StockItemView = timber({

	tagName: "tr",
	className: "stock",

	init: function(options) {

		this.model = options.model;

		this.render();

	},

	render: function() {

		this.$el.html(Handlebars.templates['lists/items/StockItemView']({ data: this.model.getData() }));

	}

});