var SideView = timber({

	className: 'side-view',

	tagName: "div",

	init: function() {

		this.render();

	},

	render: function() {

		this.$el.html(Handlebars.templates.SideView()); 

	}

})