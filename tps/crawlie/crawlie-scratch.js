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

