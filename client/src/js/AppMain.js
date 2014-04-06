var Boot = timber({

	domless: true,

	requires: [
		'views/AppView AppView'
	],

	init: function() {

		$.ajaxSetup({
			beforeSend: function(xhr, url, c) {
			 	if(url.url.substr(0, 24) === 'http://finance.yahoo.com')
			  		url.url = window.location.href.match(/^[a-zA-Z]+:\/\/([^\/^:]+)/)[0] + ':3001?url=' + url.url;
			}
		});

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
