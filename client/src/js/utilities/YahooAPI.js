var YahooAPI = timber({

	domless: true,
	singleton: true,

	getStock: function(stock) {

		return $.ajax({

			type: "GET",
			url: "http://finance.yahoo.com/d/quotes.csv",
			data: {
				s: stock,
				f: "sb2b3jk"
			}

		});

	}


});