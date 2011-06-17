/******* Crawlie Function Library! ****/
 cfn = require('./crawl_fn');


 function is_string(input){
    return typeof(input)=='string' && isNaN(input);
  }

// Two basic Date 'Conversion' (simplification) functions:

module.exports.dayofyear = function(D) {   // D is a Date object  e.g: var D = new Date();
	if (D == undefined || D === false ){
	 var D = new Date;	
	}
	var yn = D.getFullYear();
	var mn = D.getMonth();
	var dn = D.getDate();
	var d1 = new Date(yn,0,1,12,0,0); // noon on Jan. 1
	var d2 = new Date(yn,mn,dn,12,0,0); // noon on input date
	var ddiff = Math.round((d2-d1)/864e5);
  return ddiff+1; 
}

module.exports.minofday = function(D) {
//	if (D === undefined || D === false ){
//	 var D = new Date;	
//	}
  	var h = D.getHours(),
      m = D.getMinutes();
  return (h-1)*60+m;
}

// Get size of object/array 
// usage var size = objectsize(obj);
module.exports.objectsize = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

module.exports.objectsize = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

var db = function (){
var mongo = require("node-mongodb-native");

var host = process.env['MONGO_NODE_DRIVER_HOST'] != null ? process.env['MONGO_NODE_DRIVER_HOST'] : 'localhost';
var port = process.env['MONGO_NODE_DRIVER_PORT'] != null ? process.env['MONGO_NODE_DRIVER_PORT'] : mongo.Connection.DEFAULT_PORT;
return db   = new mongo.Db('mydb', new mongo.Server(host, port, {}), {});
console.log('DB :: ' +db);
};

module.exports.topdeals = function (limit) {
  cfn = require('./crawl_fn');
   db = db();
   if (limit == undefined ) { limit = 10; }
   db.collection('deals', function(err, collection){
      if(err) { 
		console.log('\n ERROR! :: ' +err +' \n' ); 
      } else { // there was no error finding the collection so we can now .find
        collection.find().sort({s:-1}).limit(limit).toArray(function(err, items){
          size = cfn.objectsize(items);  
          console.log('                        '  +' :: ' +size ); 
	  	  	if (size == undefined || size < 1) {
	  	  		// collection.insert(deal);
            	return size; // deal is NOT in the db
	 	 	} else {
	 	 		console.log('The deal is already in the DB :-) just update sales... ');
				return true; // the deal is present in the DB
	 	 	} // end else  
		}); // end find
      }
     }); // end collection	
} // end function dealindb

module.exports.dealbycity = function (){ 
var mongo = require("node-mongodb-native");

var host = process.env['MONGO_NODE_DRIVER_HOST'] != null ? process.env['MONGO_NODE_DRIVER_HOST'] : 'localhost';
var port = process.env['MONGO_NODE_DRIVER_PORT'] != null ? process.env['MONGO_NODE_DRIVER_PORT'] : mongo.Connection.DEFAULT_PORT;
db   = new mongo.Db('mydb', new mongo.Server(host, port, {}), {});
console.log('DB :: ' +db);
   if (limit == undefined ) { limit = 10; }
   db.collection('deals', function(err, collection){
      if(err) { 
		console.log('\n ERROR! :: ' +err +' \n' ); 
      } else { // there was no error finding the collection so we can now .find
        collection.find().sort({s:-1}).limit(limit).toArray(function(err, items){
          size = cfn.objectsize(items);  
          console.log('                        '  +' :: ' +size ); 
	  	  	if (size == undefined || size < 1) {
	  	  		// collection.insert(deal);
            	return size; // deal is NOT in the db
	 	 	} else {
	 	 		console.log('The deal is already in the DB :-) just update sales... ');
				return true; // the deal is present in the DB
	 	 	} // end else  
		}); // end find
      }
     }); // end collection	
} // end fn dealbycity