var io = require('/usr/local/lib/node_modules/node.io'),
    sys = require('sys'),
    fs = require('fs'),
    xml2js = require('xml2js'),
    cfn = require('./crawl_fn');

var mongo = require("node-mongodb-native");

var host = process.env['MONGO_NODE_DRIVER_HOST'] != null ? process.env['MONGO_NODE_DRIVER_HOST'] : 'localhost';
var port = process.env['MONGO_NODE_DRIVER_PORT'] != null ? process.env['MONGO_NODE_DRIVER_PORT'] : mongo.Connection.DEFAULT_PORT;
var db   = new mongo.Db('mydb', new mongo.Server(host, port, {}), {});

db.open(function(err, db){
  if(err) { 
    console.log(' ERROR! :: ' +err +' ' ); 
  } 
  console.log('\n  DB Connected :: ' +db +' ' ); 
}); // end open

var country = process.argv[2]; // 'UK';
   if (process.argv[2] == undefined){
       var country = 'UK';
   }
console.log('Country :: ' +country);

var D = new Date(),
    t = cfn.minofday(D),
    timestamp = Date.now(),
    d = cfn.dayofyear(D),
    y = D.getFullYear();

var parser = new xml2js.Parser();

io.scrape(function() {	
	this.get('http://api.groupon.de/api/v1/deals/oftheday/' +country +'/', function(err, text) {
    			if (err){ 
					console.log('OOps! Failed to get XML');
					throw err;
				}
		parser.parseString(text);
		// var timestamp = Date.now();
		var fd = '/root/node/grpwnd/tps/crawlie/cache/' +country +'_' +timestamp +'.xml';
	/*
		fs.writeFile(fd, text, function (err) {
			if (err){ 
				throw err;
                console.log('OOps! Failed to Write File!');
			}
		});	
		this.emit('File saved : ' +fd);
	*/
	}); // end get
}); //end scrape

console.log('PARSER - should be object : ' +parser);
parser.addListener('end', function(r) {
    var n = cfn.objectsize(r['deal']);
	console.log('n :: ' +n);
   	var sales = [];
   	var i = 0;
  	while(i < n) {
    var deal_id = r['deal'][i]['@']['id'],
	   sold = r['deal'][i]['@']['sold_count'],
	  price = r['deal'][i]['@']['price'],
	revenue = sold * price;
	
    var deal = {           "id": deal_id, 
                       "title" : r['deal'][i]['@']['title'],
                            "d": d,
                            "y": y,
		            "s": sold,
		            "r":revenue,
		   
    	    "limited_quantity" : r['deal'][i]['@']['limited_quantity'],
    	    "discount_percent" : r['deal'][i]['@']['discount_percent'],
    	     "discount_amount" : r['deal'][i]['@']['discount_amount'],
    	                 "url" : r['deal'][i]['@']['url'],  	
             "image_large_url" : r['deal'][i]['@']['image_large_url'],
    	       "salesforce_id" : r['deal'][i]['@']['salesforce_id'],
    	  "coupon_valid_until" : r['deal'][i]['@']['coupon_valid_until'],
    	   "coupon_valid_from" : r['deal'][i]['@']['coupon_valid_from'],
    		         "end" : r['deal'][i]['@']['end'],
                       "start" : r['deal'][i]['@']['start'],
     "max_number_of_customers" : r['deal'][i]['@']['max_number_of_customers'],
     "min_number_of_customers" : r['deal'][i]['@']['min_number_of_customers'],
                         "tax" : r['deal'][i]['@']['tax'],
                       "price" : r['deal'][i]['@']['price'],
              "original_price" : r['deal'][i]['@']['original_price'],
                  "highlights" : r['deal'][i]['@']['highlights'],
                  "conditions" : r['deal'][i]['@']['conditions'],
               "meta_keywords" : r['deal'][i]['@']['meta_keywords'],       
            "meta_description" : r['deal'][i]['@']['meta_description'],
                  "meta_title" : r['deal'][i]['@']['meta_title'],
                       
                 "parent_city" : r['deal'][i]['city']['@']['parent_city'],
              "facebook_group" : r['deal'][i]['city']['@']['facebook_group'],  
             "twitter_account" : r['deal'][i]['city']['@']['twitter_account'],
                   "longitude" : r['deal'][i]['city']['@']['longitude'],
                    "latitude" : r['deal'][i]['city']['@']['latitude'],
                    "city_url" : r['deal'][i]['city']['@']['url'],
                   "city_name" : r['deal'][i]['city']['@']['city_name'],
                 "city_status" : r['deal'][i]['city']['@']['status'],
                     "city_id" : r['deal'][i]['city']['@']['id'],
                     
                     "country" : r['deal'][i]['city']['country']['@']['shortname'],
                  "country_id" : r['deal'][i]['city']['country']['@']['id'],
                    "currency" : r['deal'][i]['city']['country']['@']['currency'],
     "incentive_reward_amount" : r['deal'][i]['city']['country']['@']['incentive_reward_amount'],
                "reward_units" : r['deal'][i]['city']['country']['@']['reward_units'],  
                                      
                   "type_info" : r['deal'][i]['type']['@']['info'],
                     "type_id" : r['deal'][i]['type']['@']['id'],
                 "status_info" : r['deal'][i]['status']['@']['info'],
                   "status_id" : r['deal'][i]['status']['@']['id']       
                   };	
                   
       console.log('   Currency ' +r['deal'][i]['city']['country']['@']['currency'] );
                  //  "status_id" : r['deal'][i]['city']['@']['id']             
        console.log('                                      Attempting to RUN DealinDB :: ' +deal.id);
       console.log(' Country : ' +deal.country +' - country_id : ' +deal.country_id +' - currency : ' +deal.currency );
       dealindb(deal);
   	
   	sales[i] = {"id": deal_id, 
                    "s" : sold, 
                    "t" : t,
		    "r" : revenue };	 
   
    updatesales(sales[i]);
    console.log('Deal ID [' +deal_id +'] Sold: ' +sales[i].s  +' \n'); 
	
   i++;
   } // end while
   console.log('Done. WORK!! ' +url); //    
    
});


/***************************************************************************
   We need 3 db functions: dealindb, dealinsert, updatesales
***************************************************************************/

var dealindb = function (deal) {
   if (deal.id == undefined ) { return false; }
   db.collection('deals_test', function(err, collection){
      if(err) { 
		console.log('\n ERROR! :: ' +err +' \n' ); 
      } else {
	collection.update({"id":deal.id}, {$set:deal}, {safe:true, upsert:true},
           function(err) {
	      if (err) console.warn(err.message);
	      else console.log('successfully updated :: ' +deal.id);
	});
      }
   }); // end collection	
} // end function dealindb

var updatesales = function (sales) {
   if (sales.id == undefined ) { return false; }
   db.collection('sales_test', function(err, collection){
      if(err) { 
		console.log('\n ERROR! :: ' +err +' \n' ); 
      } else { // there was no error finding the collection so we can now .find
        collection.insert(sales);
      } // end else
   }); // end db.col
} // end function dealindb




// */1 * * * * /usr/local/bin/node /root/node/grpwnd/tps/crawlie/crawlie-write-db.js uk
// */1 * * * * /usr/local/bin/node /root/node/grpwnd/tps/crawlie/crawlie-write-db.js ie
// */1 * * * * /usr/local/bin/node /root/node/grpwnd/tps/crawlie/crawlie-write-db.js de
// */1 * * * * /usr/local/bin/node /root/node/grpwnd/tps/crawlie/crawlie-write-db.js fr
// */1 * * * * /usr/local/bin/node /root/node/grpwnd/tps/crawlie/crawlie-write-db.js pt
// */1 * * * * /usr/local/bin/node /root/node/grpwnd/tps/crawlie/crawlie-write-db.js es
// */1 * * * * /usr/local/bin/node /root/node/grpwnd/tps/crawlie/crawlie-write-db.js nl
// */1 * * * * /usr/local/bin/node /root/node/grpwnd/tps/crawlie/crawlie-write-db.js it
// */1 * * * * /usr/local/bin/node /root/node/grpwnd/tps/crawlie/crawlie-write-db.js at
// */1 * * * * /usr/local/bin/node /root/node/grpwnd/tps/crawlie/crawlie-write-db.js se
// */1 * * * * /usr/local/bin/node /root/node/grpwnd/tps/crawlie/crawlie-write-db.js ro
// */1 * * * * /usr/local/bin/node /root/node/grpwnd/tps/crawlie/crawlie-write-db.js pl
