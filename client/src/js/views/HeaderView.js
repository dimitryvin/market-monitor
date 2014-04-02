var HeaderView = timber({

	className: 'main-header',

	tagName: "header",

	init: function() {

		this.render();

	},

	render: function() {

		this.$el.html(Handlebars.templates.HeaderView()); 

	}

})