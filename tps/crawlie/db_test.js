var mongo = require("node-mongodb-native"),
    sys = require('sys'),
    cfn = require('./crawl_fn');

var host = process.env['MONGO_NODE_DRIVER_HOST'] != null ? process.env['MONGO_NODE_DRIVER_HOST'] : 'localhost';
var port = process.env['MONGO_NODE_DRIVER_PORT'] != null ? process.env['MONGO_NODE_DRIVER_PORT'] : mongo.Connection.DEFAULT_PORT;
var db   = new mongo.Db('mydb', new mongo.Server(host, port, {}), {});

var D = new Date(),
    t = cfn.minofday(D),
	d = cfn.dayofyear(D);

var deal_id = 439904; // D.getTime(); // 426970;
var city_name = 'London';
var deal = {"id": deal_id, 
	    "city_name": city_name,
              "sales" : 10, 
              "time"  : t };

var sales_array = {"id": deal_id, 
              "sales" : 10, 
              "time"  : t};	     

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

// get_deal(deal);

// groupons per minute
function gpm(deal){
db.open(function(err, db){
  if(err) { console.log(' NO DB ERROR! :: ' +err +' ' ); } 
  else { console.log('\n  DB Connected :: ' +db +' ' );

  	  var country = 'UK',
	      city = 'Nottingham',
	      sum = 0;
	      D = new Date(),
	      t = cfn.minofday(D),
	      d = cfn.dayofyear(D),
	      h = D.getHours(),
	      m = D.getMinutes()
	      
	  console.log('Country :: ' +country +' -> Collection :: ' );

	  db.collection('deals', function(err, collection) {
	    if(err) { console.log('Collection ERROR! :: ' +err +' ' ); }

	    collection.find({'city_name':city, 'd':d-1 }, function(err, cursor) {

	      cursor.toArray(function(err, docs) {

		  var total = docs.forEach(function(doc) {

		    if(doc != null) {
			console.log(' Deal :: ' +doc.id +' - Revenue :: ' +doc.r +' > ' +doc.url );
			sum += doc.r;
		    
		    } // end if
		     sys.puts("SUM :: " + sum);
		     return sum;
		  }); // end docs.forEach 
	      sys.puts(city +" TOTAL :: " + sum +' at ' +h  +':' +m );
	      }); // end cursor.toArray
		
	    }); // end collection.find
	 }); // end collection
	    
  // console.log('count :: ' +count );
  } // end err check
// return size;

}); // end .open

setTimeout(function () {
      db.close();
    }, 2000);
} // end function :-)

// gpm(deal);

// groupons per minute
function getcitylist(country, callback){
  var citylist = {};
db.open(function(err, db){
  if(err) { console.log(' NO DB ERROR! :: ' +err +' ' ); } 
  else { console.log('\n  DB Connected :: ' +db +' ' );

	  db.collection('deals', function(err, collection) {
	    if(err) { console.log('Collection ERROR! :: ' +err +' ' ); }
// collection.find({'city_name':{'$in':[deal.city_name]} },{'limit':1, 'sort':{r:-1} }, function(err, cursor) {
	    collection.find({'country':country, },{ 'sort':{'city_name':'a'} }, function(err, cursor) {

	      cursor.toArray(function(err, docs) {

			var total = docs.forEach(function(doc) {
			
				if(doc.city_name !== null  && doc.city_name in citylist) {
						
				}else{
					sys.puts("City :: " +doc.city_id +' - ' + doc.city_name);
				    citylist[doc.city_id] = doc.city_name;
				} // end if

		  }); // end docs.forEach 
		  // console.log(cfn.objectsize(citylist));
		  	      }); // end cursor.toArray
	    }); // end collection.find
	 }); // end collection
  } // end err check
// callback( function (citylist) {
 // console.log('CALLBACK Citylist JSON :: ' +JSON.stringify(citylist));
   // console.log('Citylist :: ' +cfn.objectsize(citylist));
// } );
return citylist;
}); // end .open

setTimeout(function () {
   db.close();
   console.log('Citylist JSON :: ' +JSON.stringify(citylist));
   console.log('Citylist :: ' +cfn.objectsize(citylist));
    }, 2000);

} // end function :-)



var country = 'UK';
var citylist = getcitylist(country);

/*
function getcities(country) { return function (callback, err) {
  // Use nextTick to prove that we're working asynchronously
  process.nextTick(function () {
    if (country === 'IE') {
      err(new Error("Country needs to be UK"));
    } else {
     //  callback( ' Callback Says Country is ' +country +'\n' );
	 console.log(' Callback Says Country is ' +country +'\n');
	 var msg = ' Callback Says Country is ' +country +'\n';
	 callback( +msg);
	 
    }
  }); // end nextTick
}}

getcities(country)(function (result) {
  console.log("the result is " + result);
}, function (error) {
  throw error;
});
*/