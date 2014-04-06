var HeaderView = timber({

	className: 'main-header',

	tagName: "header",

	requires: [
		'../../templates/HeaderView.handlebars template'
	],

	defaults: {
		navitems: [
			{
				title: "Portfolios",
				icon: "fa-folder-open"
			},
			{
				title: "Trends",
				icon: "fa-flask"
			},
			{
				title: "Settings",
				icon: "fa-cog"
			}
		]
	},

	init: function() {

		this.render();

	},

	render: function() {

		this.$el.html(template({
			navitems: this.navitems
		})); 

	}

})