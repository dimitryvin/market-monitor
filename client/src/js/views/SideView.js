var SideView = timber({

	requires: [
		'../../templates/SideView.handlebars template'
	],

	className: 'side-view',

	tagName: "div",

	init: function() {

		this.render();

	},

	render: function() {

		this.$el.html(template()); 

	}

})