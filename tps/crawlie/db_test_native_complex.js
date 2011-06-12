var mongo = require("node-mongodb-native"),
    sys = require('sys'),
    cfn = require('./crawl_fn');

var host = process.env['MONGO_NODE_DRIVER_HOST'] != null ? process.env['MONGO_NODE_DRIVER_HOST'] : 'localhost';
var port = process.env['MONGO_NODE_DRIVER_PORT'] != null ? process.env['MONGO_NODE_DRIVER_PORT'] : mongo.Connection.DEFAULT_PORT;
var db   = new mongo.Db('mydb', new mongo.Server(host, port, {}), {});

var D = new Date(),
    t = cfn.minofday(D); 

var deal_id = D.getTime(); // 426970;
var deal_array = {"id": deal_id, 
              "sales" : 10, 
              "time"  : t};

var sales_array = {"id": deal_id, 
              "sales" : 10, 
              "time"  : t};	     
	      
function insert_deal(deal_array){
db.open(function(err, db){
  if(err) { 
    console.log(' ERROR! :: ' +err +' ' ); 
  } 
  else { 
//     console.log('\n  DB Connected :: ' +db +' ' ); 
     db.collection('dealr', function(err, collection){
      if(err) { 
	console.log('\n ERROR! :: ' +err +' \n' ); 
      } else { // there was no error finding the collection so we can now .find
        collection.find({"id":deal_id}).toArray(function(err, items){
          size = cfn.objectsize(items);
//           console.log('    Things in DB :: ' +size ); 
//           console.log('      Items :: ' +items ); 
	  if (size == undefined || size < 1){
	    collection.insert(deal_array);
            console.log('       ' +deal_id +' Inserted into Deals \n');
	    db.close();
	  } else {
	    console.log('       ' +deal_id  +' already in DB \n');
	    db.close();
	  }
	  
	  
	});
      }
     }); // end collection
  } // end err check
// return size;
}); // end .open
}

insert_deal(deal_array);

function insert_deal(deal_array){
db.open(function(err, db){
  if(err) { 
    console.log(' ERROR! :: ' +err +' ' ); 
  } 
  else { 
//     console.log('\n  DB Connected :: ' +db +' ' ); 
     db.collection('dealr', function(err, collection){
      if(err) { 
	console.log('\n ERROR! :: ' +err +' \n' ); 
      } else { // there was no error finding the collection so we can now .find
        collection.find({"id":deal_id}).toArray(function(err, items){
          size = cfn.objectsize(items);
//           console.log('    Things in DB :: ' +size ); 
//           console.log('      Items :: ' +items ); 
	  if (size == undefined || size < 1){
	    collection.insert(deal_array);
            console.log('       ' +deal_id +' Inserted into Deals \n');
	    db.close();
	  } else {
	    console.log('       ' +deal_id  +' already in DB \n');
	    db.close();
	  }
	  
	  
	});
      }
     }); // end collection
  } // end err check
// return size;
}); // end .open
}
