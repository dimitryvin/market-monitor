var http = require('http'),
    request = require('request');

var server = http.createServer(function(req, res) {
	res.setHeader("Access-Control-Allow-Headers", "X-Requested-With")
	res.setHeader('Access-Control-Allow-Methods', '*');
	res.setHeader('Access-Control-Allow-Origin', "*");
	try {
		var url = req.url.match(/\?url=(.*)/).pop();

		var x = request(url)
		//req.pipe(x);
		x.pipe(res);
		console.log(url);
	} catch(e) {

	}

});

console.log("listening on port 3001")
server.listen(3001);