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
    t = cfn.minofday(D),
    timestamp = Date.now(); 

var parser = new xml2js.Parser();

io.scrape(function() {	
   var country = process.argv[2]; // 'UK';
   if (process.argv[2] == undefined){
       var country = 'UK';
   }
   console.log('Country :: ' +country);
    
   this.get('http://api.groupon.de/api/v1/deals/oftheday/' +country +'/', function(err, text) {
    			if (err){ 
					console.log('OOps! Failed to get XML');
					throw err;
				}
		parser.parseString(text);
		// var timestamp = Date.now();
		var fd = '/root/node/grpwnd/tps/crawlie/cache/' +country +'_' +timestamp +'.xml';
	
		fs.writeFile(fd, text, function (err) {
			if (err){ 
				throw err;
                		console.log('OOps! Failed to Write File!');
			}
		
		});	
		this.emit('File saved : ' +fd);
	}); // end get

});

console.log('PARSER - should be object : ' +parser);
parser.addListener('end', function(r) {
    var n = cfn.objectsize(r['deal']);
    for (var key in r){
    	console.log('Key : ' +key );	
    }
	console.log('R :: ' +n);// +sys.inspect(r));
   // console.log(sys.inspect(r));
   var i = 0;
   while(i < 8) {
   
   	console.log('URL :: ' +r['deal'][i]['@']['url']); 
   	   	console.log('URL :: ' +r['deal'][i]['@']['url']); 
   i++
   }
   console.log('Done. WORK!! ' +url); //    
    
});




//fs.readFile(__dirname + '/deal.xml', function(err, data) {
//    parser.parseString(data);
//});
