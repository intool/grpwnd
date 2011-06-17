var mongo = require("node-mongodb-native"),
    sys = require('sys'),
    cfn = require('./crawl_fn'),
	util = require('util');

var host = process.env['MONGO_NODE_DRIVER_HOST'] != null ? process.env['MONGO_NODE_DRIVER_HOST'] : 'localhost';
var port = process.env['MONGO_NODE_DRIVER_PORT'] != null ? process.env['MONGO_NODE_DRIVER_PORT'] : mongo.Connection.DEFAULT_PORT;
var db   = new mongo.Db('mydb', new mongo.Server(host, port, {}), {});

var D = new Date(),
    t = cfn.minofday(D),
	d = cfn.dayofyear(D);

function get_deal(deal){
db.open(function(err, db){
  if(err) { 
    console.log(' ERROR! :: ' +err +' ' ); 
  } else { 
//     console.log('\n  DB Connected :: ' +db +' ' ); 
     db.collection('deals', function(err, collection){
	  country = 'UK'
          collection.find({'city_name':{'$in':[deal.city_name]} },{'limit':1, 'sort':{r:-1} }, function(err, cursor) {
            cursor.toArray(function(err, docs) {
              sys.puts("Returned #" + docs.length + " documents");
	      	  docs.forEach(function(doc) {
                console.log("\n Doc from Array \n" + sys.inspect(doc));
              });
            });          
          });
	  var country = 'UK';
	  collection.count({'country':country },function(err, count) {
            sys.puts("There are " + count + " records for " +country);
          });
     }); // end collection
  // console.log('count :: ' +count );
  } // end err check
// return size;

}); // end .open

setTimeout(function () {
      db.close();
    }, 2000);
}// end function :-)






util.log('---------------------------------> End of Play Time... :-(');