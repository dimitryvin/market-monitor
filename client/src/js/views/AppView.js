var AppView = timber({

    className: 'app-container',

    requires: [
        '~/templates/AppView.handlebars template',
        '~/js/views/SideView SideView',
        '~/js/views/HeaderView HeaderView',
        '~/js/views/sections/StockView StockView'
    ],

    init: function() {
        this.render();
    },

    render: function() {

        this.$el.html(template()); 

        var headerView = new HeaderView();
        var sideView = new SideView();

        this.$el.find('.parent-container').prepend(sideView.el);
        this.$el.prepend(headerView.el);


        //TEMP
        var stockView = new StockView();
        this.setView(stockView);

    },

    setView: function(view) {
        this.$el.find('.container').html(view.el);
    }

});