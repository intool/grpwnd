var mongo = require("node-mongodb-native"),
    sys = require('sys'),
    cfn = require('./crawl_fn');

var host = process.env['MONGO_NODE_DRIVER_HOST'] != null ? process.env['MONGO_NODE_DRIVER_HOST'] : 'localhost';
var port = process.env['MONGO_NODE_DRIVER_PORT'] != null ? process.env['MONGO_NODE_DRIVER_PORT'] : mongo.Connection.DEFAULT_PORT;
var db   = new mongo.Db('mydb', new mongo.Server(host, port, {}), {});

var D = new Date(),
    t = cfn.minofday(D); 

var deal_id = 439904; // D.getTime(); // 426970;
var deal = {"id": deal_id, 
              "sales" : 10, 
              "time"  : t};

var sales_array = {"id": deal_id, 
              "sales" : 10, 
              "time"  : t};	     
	      

insert_deal(deal);

function insert_deal(deal){
db.open(function(err, db){
  if(err) { 
    console.log(' ERROR! :: ' +err +' ' ); 
  } 
  else { 
//     console.log('\n  DB Connected :: ' +db +' ' ); 
     db.collection('deals', function(err, collection){

     }); // end collection
  } // end err check
// return size;
}); // end .open
}
