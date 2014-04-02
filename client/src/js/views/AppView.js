var AppView = timber({

	className: 'app-container',

	init: function() {
		this.render();
	},

	render: function() {

		this.$el.html(Handlebars.templates.AppView()); 

		var headerView = new HeaderView();
		var sideView = new SideView();

		this.$el.prepend(sideView.el);
		this.$el.prepend(headerView.el);

	}

})