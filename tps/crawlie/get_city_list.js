var mongo = require("node-mongodb-native"),
    sys = require('sys'),
    cfn = require('./crawl_fn'),
	 fs = require('fs');

var host = process.env['MONGO_NODE_DRIVER_HOST'] != null ? process.env['MONGO_NODE_DRIVER_HOST'] : 'localhost';
var port = process.env['MONGO_NODE_DRIVER_PORT'] != null ? process.env['MONGO_NODE_DRIVER_PORT'] : mongo.Connection.DEFAULT_PORT;
var db   = new mongo.Db('mydb', new mongo.Server(host, port, {}), {});


// this writes the city list to a JSON file :-)
function getcitylist(country){
  console.log('getcitylist called for :: ' +country);
  var i = 1,
  citylist = [],
  // citylist = [{ id:10000, name : '' }],
         D = new Date(),
	     d = cfn.dayofyear(D);
db.open(function(err, db){
  if(err) { console.log(' DB ERROR! :: ' +err +' ' ); } 
  else { console.log('\n  DB Connected :: ' +db +' ' ); 
  
	  db.collection('deals', function(err, collection) {
	    if(err) { console.log('Collection ERROR! :: ' +err +' ' ); }
		// console.log('Collection :: ' +collection +' ' );
				// collection.find({'city_name':{'$in':[deal.city_name]} },{'limit':1, 'sort':{r:-1} }, function(err, cursor) {
				// collection.find({'country':country, 'd':d, "type_info": "MAIN_DEAL"},{ 'sort':{'city_name':'a'} }, function(err, cursor) {
		collection.find({'country':country, 'd':d, "type_info": "MAIN_DEAL"},{ 'sort':{'city_name':'a'} }, function(err, cursor) {
		  if(err) { console.log(' NO DB ERROR! :: ' +err +' ' ); } 
		  // console.log('Cursor :: ' +cursor +'   >>   length :: ' +cursor.length );
	      cursor.toArray(function(err, docs) {
			// console.log('   Docs Length :: ' +docs.length +'  -  ' +docs +'\n');
			var total = docs.forEach(function(doc) {
			
				if(doc.city_name == null) { // doc.city_name in citylist //  || 
						// do nothing as the city is alreay in our array!
				}else{
					sys.puts("City :: " +doc.city_id +' - ' + doc.city_name);
					i = doc.city_id;
				    citylist[i] = { id : doc.city_id , name : doc.city_name };
					
				} // end if
			
		  }); // end docs.forEach 
		 
		clean = cleanArray(citylist);
		var json = JSON.stringify(clean);
		console.log('Citylist JSON :: ' +json);
		console.log('Citylist :: ' +cfn.objectsize(citylist));
   
   		var fd = '/root/node/grpwnd/tps/public/json_cache/' +'citylist_' +country +'.json';

		fs.writeFile(fd, json, function (err) {
			if (err){ 
				throw err;
                console.log('OOps! Failed to Write File!');
			} else {
			console.log('File saved : ' +fd);
			}
		});	// end writeFile
		
		  	      }); // end cursor.toArray
			process.nextTick(function () {
				console.log('nextTick Called :-)');
				db.close();
			}); // end nextTick
	    }); // end collection.find
		
	 }); // end collection
  } // end err check
}); // end .open
} // end function :-)



country = 'UK';
citylist = getcitylist(country);






// need to work on automating this once the UK is demo'd :-)
var countries = ["UK","FR","DE","IE"];
var get = [];
for (var i = 0; i < countries.length; i++) {
		country = countries[i];
		console.log('Countrie :: ' +country);
		
		// setTimeout(function () {
			process.nextTick(function () {
				console.log('nextTick Called :-)');
				// var list = getcitylist2(country);
			}); // end nextTick
		//Do something
		
		
		// }, 3000);
}

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

