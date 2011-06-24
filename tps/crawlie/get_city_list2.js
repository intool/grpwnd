var mongo = require("node-mongodb-native"),
    sys = require('sys'),
    cfn = require('./crawl_fn'),
	 fs = require('fs');

var host = process.env['MONGO_NODE_DRIVER_HOST'] != null ? process.env['MONGO_NODE_DRIVER_HOST'] : 'localhost';
var port = process.env['MONGO_NODE_DRIVER_PORT'] != null ? process.env['MONGO_NODE_DRIVER_PORT'] : mongo.Connection.DEFAULT_PORT;
var db   = new mongo.Db('mydb', new mongo.Server(host, port, {}), {});


// this writes the city list to a JSON file :-)
module.exports.getcitylist = function(country_id){
  console.log('getcitylist called for :: ' +country_id);
  var i = 1,
  citylist = [{id : 0 , name : ' * All *'}],
  // citylist = [{ id:10000, name : '' }],
         D = new Date(),
	     d = cfn.dayofyear(D);
db.open(function(err, db){
  if(err) { console.log(' DB ERROR! :: ' +err +' ' ); } 
  else { console.log('\n  DB Connected :: ' +db +' ' ); 
  
	  db.collection('deals', function(err, collection) {
	    if(err) { console.log('Collection ERROR! :: ' +err +' ' ); }
		collection.find({'country_id':country_id, 'd':d, "type_info": "MAIN_DEAL"},{ 'sort':{'city_name':'a'} }, function(err, cursor) {
		  if(err) { console.log(' NO DB ERROR! :: ' +err +' ' ); } 
		  // console.log('Cursor :: ' +cursor +'   >>   length :: ' +cursor.length );
	        cursor.toArray(function(err, docs) {
			// console.log('   Docs Length :: ' +docs.length +'  -  ' +docs +'\n');
				db.close();
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
		   
				var fd = '/root/node/grpwnd/tps/public/json_cache/' +'citylist_' +country_id +'_' +d +'.json';
				// fs.open(fd, 'a', 666, function( e, id ) {
					// if (err){ 
						// throw err;
						// console.log('OOps! Failed to Write File!');
						// }
					// fs.write( id, 'json', null, 'utf8', function(){

					  // fs.close(id, function(){
						  // console.log('file closed');
						// });
					// });
				// });
				
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
} // end function :-)

// country = '4';
// citylist = module.exports.getcitylist(country);

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

