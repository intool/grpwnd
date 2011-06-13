var io = require('/usr/local/lib/node_modules/node.io'),
    sys = require('sys'),
    fs = require('fs');

var period = 10000;
// var interval = setInterval(function() {

io.scrape(function() {
        var country = 'UK';
    	this.get('http://api.groupon.de/api/v1/deals/oftheday/' +country +'/', function(err, text) {
	var timestamp = Date.now();
	var fd = '/root/node/grpwnd/tps/crawlie/cache/' +country +'_' +timestamp +'.xml';
	this.emit(text);

	this.emit('File saved : ' +fd);
		fs.writeFile(fd, text, function (err) {
			if (err){ 
				throw err;
                		console.log('OOps! Failed to Write File!');
			}
		});	
	});

});
// }, period);



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




var dealindb = function (sales) {
	   
   db.collection('deals', function(err, collection){
      if(err) { 
	console.log('\n ERROR! :: ' +err +' \n' ); 
      } else { // there was no error finding the collection so we can now .find
        collection.find({"id":sales.id}).toArray(function(err, items){
          size = cfn.objectsize(items);
           console.log('    Things in DB :: ' +size ); 
           console.log('      Items :: ' +items ); 
	  	  	if (size == undefined || size < 1){
	    		collection.insert(sales);
            	console.log('       ' +sales.id +' Inserted into Deals \n');
	   		 
	 	 	} else {
	    		console.log('       ' +sales.id  +' already in DB \n');

	 	 	} // end else  
		});
      }
     }); // end collection	
} // end function dealindb

// old dealindb:

var dealindb = function (deal) {
   if (deal.id == undefined ) { return false; }
   db.collection('deals_test', function(err, collection){
      if(err) { 
		console.log('\n ERROR! :: ' +err +' \n' ); 
      } else { // there was no error finding the collection so we can now .find
        collection.find({"id":deal.id}).toArray(function(err, items){
          size = cfn.objectsize(items);  
          // console.log('                        ' +deal.id +' :: ' +size ); 
	  if (size == undefined || size < 1) {
	      collection.insert(deal);
	      
	      
	      
            	return size; // deal is NOT in the db
	 	 	} else {
	 	 		console.log('The deal is already in the DB :-) just update sales... ');
				return true; // the deal is present in the DB
	 	 	} // end else  
		}); // end find
      }
     }); // end collection	
} // end function dealindb

// NEW:

var dealindb = function (deal) {
   if (deal.id == undefined ) { return false; }
   db.collection('deals_test', function(err, collection){
      if(err) { 
		console.log('\n ERROR! :: ' +err +' \n' ); 
      } else { // there was no error finding the collection so we can now .find
             // collection.update({"id":deal.id},{$set: deal });
	      collection.update({"id":deal.id}, {$set:deal}, {safe:true},
                    function(err) {
		      if (err) console.warn(err.message);
		      else console.log('successfully updated');
	      });
      }
     }); // end collection	
} // end function dealindb
