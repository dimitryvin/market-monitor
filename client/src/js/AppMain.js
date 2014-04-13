var Boot = timber({

	domless: true,

	requires: [
		'views/AppView AppView'
	],

	init: function() {


		$.ajaxSetup({
			beforeSend: function(xhr, url, c) {
			 	if(this.toProxy(url.url))
			  		url.url = window.location.href.match(/^[a-zA-Z]+:\/\/([^\/^:]+)/)[0] + ':3001?url=' + url.url;
			}.bind(this)
		});

	},

	toProxy: function(url) {

		var proxyUrls = [
			'http://finance.yahoo.com',
			'http://www.reuters.com/finance/stocks/companyProfile'
		];

		var len = proxyUrls.length;
		for (var i = 0; i < len; i++) {
			if (url.indexOf(proxyUrls[i]) > -1)
				return true;
		}

		return false;

	},

	run: function() {

		var appView = new AppView();

		$('body').prepend(appView.el);

	}

});

$(function() {

	var boot = new Boot();
	boot.run();

});
