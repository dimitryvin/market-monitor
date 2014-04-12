var YahooAPI = timber({

	domless: true,
	singleton: true,

	getStock: function(stock) {

		return $.ajax({

			type: "GET",
			url: "http://finance.yahoo.com/d/quotes.csv",
			data: {
				s: stock,
				f: ["g", //low
					"h", //high
					"j", //52 low
					"k", //52 high
					"o", //open
					"v", //volume
					"a2", //day avg vol
					"j1", //mkt cap
					"r", //p/e
					"d", //div
					"y", //div yield
					"e", //eps
					"j2" //s/o
					].join('')
			}

		});

	}


});