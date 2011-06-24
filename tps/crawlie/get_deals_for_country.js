var mongo = require("node-mongodb-native"),
    sys = require('sys'),
    cfn = require('./crawl_fn'),
	 fs = require('fs');

var host = process.env['MONGO_NODE_DRIVER_HOST'] != null ? process.env['MONGO_NODE_DRIVER_HOST'] : 'localhost';
var port = process.env['MONGO_NODE_DRIVER_PORT'] != null ? process.env['MONGO_NODE_DRIVER_PORT'] : mongo.Connection.DEFAULT_PORT;
var db   = new mongo.Db('mydb', new mongo.Server(host, port, {}), {});

// absolutely hidious way of closing the DB connection. need to learn how to do it async!! 


// this writes the city list to a JSON file :-)
function getdeals(country_id) {
if ( country_id == undefined || country_id == null || isNaN(country_id) ) {
 // fail code:
 console.log('Fail!');	
 return false;
}
  var i = 1,
  deals = [],
  json = [],
  // citylist = [{ id:10000, name : '' }],
         D = new Date(),
	     d = cfn.dayofyear(D),
	     country_id_string = String(country_id);

db.open(function(err, db){
  if(err) { console.log(' DB ERROR! :: ' +err +' ' ); } 
  else { console.log('\n  DB Connected :: ' +db +' ' ); 
  
	  db.collection('deals', function(err, collection) {
	    if(err) { console.log('Collection ERROR! :: ' +err +' ' ); }

		collection.find({"country_id": country_id_string, 'd':d},{ 'sort':{'city_name':'a'} }, function(err, cursor) {
		  if(err) { console.log(' NO DB ERROR! :: ' +err +' ' ); } 

		  console.log('getdeals called for ::' +country_id + ' - for day:: ' + d);
//		   console.log('Cursor :: ' +cursor +'   >>   length :: ' +cursor.length );
	      cursor.toArray(function(err, docs) {
			console.log('   Docs Length :: ' +docs.length +'  -  ' +docs +'\n');
			   db.close();
			var total = docs.forEach(function(doc) {
			
				if(doc.city_name == null) { // doc.city_name in citylist //  || 
						// do nothing as the city is alreay in our array!
				}else{
					sys.puts("Deal ID :: " +doc.id +' - ' + doc.title);
					i = doc.id;
				    deals[i] = { id : doc.country_id , 
				    		  price : doc.price,  
				    			  s : doc.s,
				    	          r : doc.r,
				    		  title : doc.title, 
				    	 image_large_url : doc.image_large_url,
				    	  type_info : doc.type_info,
				      salesforce_id : doc.salesforce_id
				    		   };
					
				} // end if
			
		  }); // end docs.forEach 
		 
						clean = cleanArray(deals);
						json = JSON.stringify(clean);
						console.log('Citylist JSON :: ' +json);
						console.log('DealCount :: ' +cfn.objectsize(deals));
						 
						 		var fd = '/root/node/grpwnd/tps/public/json_cache/' +'deals_' +country_id +'.json';
						
						fs.writeFile(fd, json, function (err) {
							if (err){ 
								throw err;
						              console.log('OOps! Failed to Write File!');
							} else {
							console.log('File saved : ' +fd);
							}
						});	// end writeFile
		
		  	      }); // end cursor.toArray
		  	 
	    }); // end collection.find
		
	 }); // end collection
  } // end err check
}); // end .open
// setTimeout(function () {
   // db.close();
   // }, 2000);
} // end function :-)



country_id=3;
deals = getdeals(country_id);


   // this removes null values from the city list... :-) >> tell me if you have a better/faster way of doing it!!
	function cleanArray(actual){
		var newArray = new Array();
		for(var i = 0; i <actual.length; i++){
			if (actual[i]){
				newArray.push(actual[i]);
			}	
		}
		return newArray;
	} // end fun cleanArray
