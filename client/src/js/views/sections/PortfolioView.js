var PortfolioView = timber({

	className: 'portfolio-container',

	tagName: "div",

	init: function() {

		this.render();

	},

	render: function() {

		var secs = [
		    {
		        "ticker": "AAPL",
		        "price": 26,
		        "quantity": 10,
		        "low": 26,
		        "high": 26,
		        "beta": -4
		    },
		    {
		        "ticker": "F",
		        "price": 27,
		        "quantity": 91,
		        "low": 25,
		        "high": 21,
		        "beta": 3
		    },
		    {
		        "ticker": "TSLA",
		        "price": 25,
		        "quantity": 47,
		        "low": 30,
		        "high": 28,
		        "beta": 1
		    },
		    {
		        "ticker": "VHT",
		        "price": 23,
		        "quantity": 61,
		        "low": 20,
		        "high": 24,
		        "beta": -1
		    },
		    {
		        "ticker": "VGLT",
		        "price": 40,
		        "quantity": 33,
		        "low": 29,
		        "high": 36,
		        "beta": 4
		    }, {
		        "ticker": "AAPL",
		        "price": 26,
		        "quantity": 10,
		        "low": 26,
		        "high": 26,
		        "beta": -4
		    },
		    {
		        "ticker": "F",
		        "price": 27,
		        "quantity": 91,
		        "low": 25,
		        "high": 21,
		        "beta": 3
		    },
		    {
		        "ticker": "TSLA",
		        "price": 25,
		        "quantity": 47,
		        "low": 30,
		        "high": 28,
		        "beta": 1
		    },
		    {
		        "ticker": "VHT",
		        "price": 23,
		        "quantity": 61,
		        "low": 20,
		        "high": 24,
		        "beta": -1
		    },
		    {
		        "ticker": "VGLT",
		        "price": 40,
		        "quantity": 33,
		        "low": 29,
		        "high": 36,
		        "beta": 4
		    }, {
		        "ticker": "AAPL",
		        "price": 26,
		        "quantity": 10,
		        "low": 26,
		        "high": 26,
		        "beta": -4
		    },
		    {
		        "ticker": "F",
		        "price": 27,
		        "quantity": 91,
		        "low": 25,
		        "high": 21,
		        "beta": 3
		    },
		    {
		        "ticker": "TSLA",
		        "price": 25,
		        "quantity": 47,
		        "low": 30,
		        "high": 28,
		        "beta": 1
		    },
		    {
		        "ticker": "VHT",
		        "price": 23,
		        "quantity": 61,
		        "low": 20,
		        "high": 24,
		        "beta": -1
		    },
		    {
		        "ticker": "VGLT",
		        "price": 40,
		        "quantity": 33,
		        "low": 29,
		        "high": 36,
		        "beta": 4
		    }, {
		        "ticker": "AAPL",
		        "price": 26,
		        "quantity": 10,
		        "low": 26,
		        "high": 26,
		        "beta": -4
		    },
		    {
		        "ticker": "F",
		        "price": 27,
		        "quantity": 91,
		        "low": 25,
		        "high": 21,
		        "beta": 3
		    },
		    {
		        "ticker": "TSLA",
		        "price": 25,
		        "quantity": 47,
		        "low": 30,
		        "high": 28,
		        "beta": 1
		    },
		    {
		        "ticker": "VHT",
		        "price": 23,
		        "quantity": 61,
		        "low": 20,
		        "high": 24,
		        "beta": -1
		    },
		    {
		        "ticker": "VGLT",
		        "price": 40,
		        "quantity": 33,
		        "low": 29,
		        "high": 36,
		        "beta": 4
		    }, {
		        "ticker": "AAPL",
		        "price": 26,
		        "quantity": 10,
		        "low": 26,
		        "high": 26,
		        "beta": -4
		    },
		    {
		        "ticker": "F",
		        "price": 27,
		        "quantity": 91,
		        "low": 25,
		        "high": 21,
		        "beta": 3
		    },
		    {
		        "ticker": "TSLA",
		        "price": 25,
		        "quantity": 47,
		        "low": 30,
		        "high": 28,
		        "beta": 1
		    },
		    {
		        "ticker": "VHT",
		        "price": 23,
		        "quantity": 61,
		        "low": 20,
		        "high": 24,
		        "beta": -1
		    },
		    {
		        "ticker": "VGLT",
		        "price": 40,
		        "quantity": 33,
		        "low": 29,
		        "high": 36,
		        "beta": 4
		    }
		];

		this.$el.html(Handlebars.templates['sections/PortfolioView']({
			securities: secs
		})); 

	}

});