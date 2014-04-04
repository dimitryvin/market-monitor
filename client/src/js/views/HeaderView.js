var HeaderView = timber({

	className: 'main-header',

	tagName: "header",

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

		this.$el.html(Handlebars.templates.HeaderView({
			navitems: this.navitems
		})); 

	}

})