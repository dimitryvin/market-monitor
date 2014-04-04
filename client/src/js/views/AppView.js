var AppView = timber({

    className: 'app-container',

    init: function() {
        this.render();
    },

    render: function() {

        this.$el.html(Handlebars.templates.AppView()); 

        var headerView = new HeaderView();
        var sideView = new SideView();

        this.$el.find('.parent-container').prepend(sideView.el);
        this.$el.prepend(headerView.el);


        //TEMP
        var portView = new PortfolioView();
        this.setView(portView);

    },

    setView: function(view) {
        this.$el.find('.container').html(view.el);
    }

});