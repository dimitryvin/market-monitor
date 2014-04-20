timber({

	domless: true,
	singleton: true,

	requires: [		
		'~/js/utilities/Utils Utils'
	],

	defaults: {

		//https://code.google.com/p/yahoo-finance-managed/wiki/enumQuoteProperty
		lookup: {
			AfterHoursChangeRealtime: "c8",
			AnnualizedGain: "g3",
			Ask: "a0",
			AskRealtime: "b2",
			AskSize: "a5",
			AverageDailyVolume: "a2",
			Bid: "b0",
			BidRealtime: "b3",
			BidSize: "b6",
			BookValuePerShare: "b4",
			Change: "c1",
			ChangeFromFiftydayMovingAverage: "m7",
			ChangeFromTwoHundreddayMovingAverage: "m5",
			ChangeFromYearHigh: "k4",
			ChangeFromYearLow: "j5",
			ChangeInPercent: "p2",
			ChangeInPercentFromYearHigh: "k5",
			ChangeInPercentRealtime: "k2",
			ChangeRealtime: "c6",
			Change_ChangeInPercent: "c0",
			Commission: "c3",
			Currency: "c4",
			DaysHigh: "h0",
			DaysLow: "g0",
			DaysRange: "m0",
			DaysRangeRealtime: "m2",
			DaysValueChange: "w1",
			DaysValueChangeRealtime: "w4",
			DilutedEPS: "e0",
			DividendPayDate: "r1",
			EBITDA: "j4",
			EPSEstimateCurrentYear: "e7",
			EPSEstimateNextQuarter: "e9",
			EPSEstimateNextYear: "e8",
			ExDividendDate: "q0",
			FiftydayMovingAverage: "m3",
			HighLimit: "l2",
			HoldingsGain: "g4",
			HoldingsGainPercent: "g1",
			HoldingsGainPercentRealtime: "g5",
			HoldingsGainRealtime: "g6",
			HoldingsValue: "v1",
			HoldingsValueRealtime: "v7",
			LastTradeDate: "d1",
			LastTradePriceOnly: "l1",
			LastTradeRealtimeWithTime: "k1",
			LastTradeSize: "k3",
			LastTradeTime: "t1",
			LastTradeWithTime: "l0",
			LowLimit: "l3",
			MarketCapRealtime: "j3",
			MarketCapitalization: "j1",
			MoreInfo: "i0",
			Name: "n0",
			Notes: "n4",
			OneyrTargetPrice: "t8",
			Open: "o0",
			OrderBookRealtime: "i5",
			PEGRatio: "r5",
			PERatio: "r0",
			PERatioRealtime: "r2",
			PercentChangeFromFiftydayMovingAverage: "m8",
			PercentChangeFromTwoHundreddayMovingAverage: "m6",
			PercentChangeFromYearLow: "j6",
			PreviousClose: "p0",
			PriceBook: "p6",
			PriceEPSEstimateCurrentYear: "r6",
			PriceEPSEstimateNextYear: "r7",
			PricePaid: "p1",
			PriceSales: "p5",
			Revenue: "s6",
			SharesFloat: "f6",
			SharesOutstanding: "j2",
			SharesOwned: "s1",
			ShortRatio: "s7",
			StockExchange: "x0",
			Symbol: "s0",
			TickerTrend: "t7",
			TradeDate: "d2",
			TradeLinks: "t6",
			TradeLinksAdditional: "f0",
			TrailingAnnualDividendYield: "d0",
			TrailingAnnualDividendYieldInPercent: "y0",
			TwoHundreddayMovingAverage: "m4",
			Volume: "v0",
			YearHigh: "k0",
			YearLow: "j0",
			YearRange: "w0",
			a0: "Ask",
			a2: "AverageDailyVolume",
			a5: "AskSize",
			b0: "Bid",
			b2: "AskRealtime",
			b3: "BidRealtime",
			b4: "BookValuePerShare",
			b6: "BidSize",
			c0: "Change_ChangeInPercent",
			c1: "Change",
			c3: "Commission",
			c4: "Currency",
			c6: "ChangeRealtime",
			c8: "AfterHoursChangeRealtime",
			d0: "TrailingAnnualDividendYield",
			d1: "LastTradeDate",
			d2: "TradeDate",
			e0: "DilutedEPS",
			e7: "EPSEstimateCurrentYear",
			e8: "EPSEstimateNextYear",
			e9: "EPSEstimateNextQuarter",
			f0: "TradeLinksAdditional",
			f6: "SharesFloat",
			g0: "DaysLow",
			g1: "HoldingsGainPercent",
			g3: "AnnualizedGain",
			g4: "HoldingsGain",
			g5: "HoldingsGainPercentRealtime",
			g6: "HoldingsGainRealtime",
			h0: "DaysHigh",
			i0: "MoreInfo",
			i5: "OrderBookRealtime",
			j0: "YearLow",
			j1: "MarketCapitalization",
			j2: "SharesOutstanding",
			j3: "MarketCapRealtime",
			j4: "EBITDA",
			j5: "ChangeFromYearLow",
			j6: "PercentChangeFromYearLow",
			k0: "YearHigh",
			k1: "LastTradeRealtimeWithTime",
			k2: "ChangeInPercentRealtime",
			k3: "LastTradeSize",
			k4: "ChangeFromYearHigh",
			k5: "ChangeInPercentFromYearHigh",
			l0: "LastTradeWithTime",
			l1: "LastTradePriceOnly",
			l2: "HighLimit",
			l3: "LowLimit",
			m0: "DaysRange",
			m2: "DaysRangeRealtime",
			m3: "FiftydayMovingAverage",
			m4: "TwoHundreddayMovingAverage",
			m5: "ChangeFromTwoHundreddayMovingAverage",
			m6: "PercentChangeFromTwoHundreddayMovingAverage",
			m7: "ChangeFromFiftydayMovingAverage",
			m8: "PercentChangeFromFiftydayMovingAverage",
			n0: "Name",
			n4: "Notes",
			o0: "Open",
			p0: "PreviousClose",
			p1: "PricePaid",
			p2: "ChangeInPercent",
			p5: "PriceSales",
			p6: "PriceBook",
			q0: "ExDividendDate",
			r0: "PERatio",
			r1: "DividendPayDate",
			r2: "PERatioRealtime",
			r5: "PEGRatio",
			r6: "PriceEPSEstimateCurrentYear",
			r7: "PriceEPSEstimateNextYear",
			s0: "Symbol",
			s1: "SharesOwned",
			s6: "Revenue",
			s7: "ShortRatio",
			t1: "LastTradeTime",
			t6: "TradeLinks",
			t7: "TickerTrend",
			t8: "OneyrTargetPrice",
			v0: "Volume",
			v1: "HoldingsValue",
			v7: "HoldingsValueRealtime",
			w0: "YearRange",
			w1: "DaysValueChange",
			w4: "DaysValueChangeRealtime",
			x0: "StockExchange",
			y0: "TrailingAnnualDividendYieldInPercent"
		}
	},

	//builds the yahoo request params for their csv with the above lookup table
	buildF: function(params) {

		var len = params.length;

		var query = [];
		for (var i = 0; i < params.length; i++) {
			query.push(this.lookup[params[i]]);
		}

		return query.join('');

	},

	getStock: function(stock, callback) {

		var requestsRunning = 0;

		var fields = [
			"Name",
			"PreviousClose",
			"DaysLow",
			"DaysHigh",
			"YearLow",
			"YearHigh",
			"Open",
			"Volume",
			"AverageDailyVolume",
			"MarketCapRealtime",
			"MarketCapitalization",
			"PERatioRealtime",
			"PERatio",
			"DilutedEPS",

			//make sure this is last
			"SharesOutstanding"
		];

		//holder
		var parsed = {};

		requestsRunning++;
		$.ajax({

			type: "GET",
			url: "http://finance.yahoo.com/d/quotes.csv",
			data: {
				s: stock,
				f: this.buildF(fields)
			},
			success: function(data) {
				var preParsed = Utils().CSVToArray(data)[0];

				// -1 to parse S/O
				var len = fields.length - 1;
				for (var i = 0; i < len; i++) {
					parsed[fields[i]] = preParsed[0];
					preParsed.shift();
				}

				parsed[fields[fields.length-1]] = preParsed.join('').trim();
				parsed.ticker = stock;

				requestsRunning--;

				runCallback();
			}

		});

		requestsRunning++;
		$.ajax({
			url: "http://www.reuters.com/finance/stocks/companyProfile",
			data: { symbol: stock },
			success: function(data) {
				requestsRunning--;
				
				parsed.Description = /<div class="moduleBody">[^<]*<p>([\s\S]*?)<\/p>/mi.exec(data)[1];

				runCallback();
			}

		});

		requestsRunning++;
		$.ajax({

			url: "http://ichart.yahoo.com/table.csv",
			type: "GET",
			data: { 
				s: stock,
				a: 3, //#month - 1 | start
				b: 15, //day | start
				c: 2000, //year | start
				d: 3, //#month - 1 | end
				e: 15, //day | end
				f: 2010, //year | end
				g: "w", //trade period d w m
				ignore: ".csv"
			},
			success: function(data) {
				var preParsed = Utils().CSVToArray(data);

				var histData = [ { key: stock, values: [] } ];

				var len = preParsed.length;
				for (var i = 2; i < len; i++) {
					histData[0].values.push({ date: new Date(preParsed[i][0]).getTime(), price: preParsed[i][6] });
				}

				parsed.histData = histData;

				requestsRunning--;
				runCallback();
			}

		});

		function runCallback() {
			if (requestsRunning == 0)
				callback(parsed);
		}
 
	}

});