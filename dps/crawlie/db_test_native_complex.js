var mongo = require("node-mongodb-native"),
    sys = require('sys');

var host = process.env['MONGO_NODE_DRIVER_HOST'] != null ? process.env['MONGO_NODE_DRIVER_HOST'] : 'localhost';
var port = process.env['MONGO_NODE_DRIVER_PORT'] != null ? process.env['MONGO_NODE_DRIVER_PORT'] : mongo.Connection.DEFAULT_PORT;
var db   = new mongo.Db('mydb', new mongo.Server(host, port, {}), {});


var deal_id = 426968;
var deal_array = {"id": deal_id, 
              "sales" : 10, 
              "time"  : 114};

var sales_array = {"id": deal_id, 
              "sales" : 10, 
              "time"  : 114};	     
	      
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
          size = Object.size(items);
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
          size = Object.size(items);
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


/*
function deal(id){
  // here we are checking if a deal is already in the DB
  // db.open
  db.open(function(err, db){
    if(err) {
      console.log('\n ERROR! :: ' +err +' \n' );
    }
    else{
     console.log('\n DB Object! :: ' +db +' \n' );
       db.collection('deals', function(err, collection){
         collection.find({id:id}).toArray(function(err, items){
           return Object.size(items);
         });
       });
    }
  });
  db.close();
}

if (deal(id)) {
  console.log('Deal ' +id +' Exists');
}
else{
  console.log('Deal ' +id +' Does NOT Exist');
}

/* 
db.collection('dps', function(err, collection){

collection.find({id:id}).toArray(function(err, items){
	var size = Object.size(items);
  	console.log('Things in DB :: ' +size ); 
  	console.log('Items :: ' +items ); 
 
	// sys.puts(sys.inspect(items);

	});
var D = new Date();
var m = minofday(D);

   collection.insert({id:"426961", 
		      u:10, 
                      m: m});

});
   //do some stuff
   console.log('\n Made it this far! :: \n' );
   db.close();




*/



/******* Crawlie Function Library! ****/

 function is_string(input){
    return typeof(input)=='string' && isNaN(input);
  }

// Two basic Date 'Conversion' (simplification) functions:

function dayofyear(D) {   // D is a Date object  e.g: var D = new Date();
var yn = D.getFullYear();
var mn = D.getMonth();
var dn = D.getDate();
var d1 = new Date(yn,0,1,12,0,0); // noon on Jan. 1
var d2 = new Date(yn,mn,dn,12,0,0); // noon on input date
var ddiff = Math.round((d2-d1)/864e5);
return ddiff+1; 
}

function minofday(D) {
  var h = D.getHours(),
      m = D.getMinutes();
return (h-1)*60+m;
}

// Get size of object/array
Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};
