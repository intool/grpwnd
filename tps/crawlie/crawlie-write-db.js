var io = require('/usr/local/lib/node_modules/node.io'),
    sys = require('sys'),
    fs = require('fs'),
    xml2js = require('xml2js'),
    cfn = require('./crawl_fn');

var mongo = require("node-mongodb-native");

var host = process.env['MONGO_NODE_DRIVER_HOST'] != null ? process.env['MONGO_NODE_DRIVER_HOST'] : 'localhost';
var port = process.env['MONGO_NODE_DRIVER_PORT'] != null ? process.env['MONGO_NODE_DRIVER_PORT'] : mongo.Connection.DEFAULT_PORT;
var db   = new mongo.Db('mydb', new mongo.Server(host, port, {}), {});

var D = new Date(),
    t = cfn.minofday(D); 

var period = 10000;
// var interval = setInterval(function() {

io.scrape(function() {
        var country = 'UK';
    	this.get('http://api.groupon.de/api/v1/deals/oftheday/' +country +'/', function(err, text) {
	var timestamp = Date.now();
	var fd = '/root/node/grpwnd/tps/crawlie/cache/' +country +'_' +timestamp +'.xml';
	this.emit(text);

	this.emit('File saved : ' +fd);
		fs.writeFile(fd, text, function (err) {
			if (err){ 
				throw err;
                		console.log('OOps! Failed to Write File!');
			}
		});	
	});

});
// }, period);
