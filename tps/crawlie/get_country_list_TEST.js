var mongo = require("node-mongodb-native"),
    sys = require('sys'),
    cfn = require('./crawl_fn'),
	 fs = require('fs');

var host = process.env['MONGO_NODE_DRIVER_HOST'] != null ? process.env['MONGO_NODE_DRIVER_HOST'] : 'localhost';
var port = process.env['MONGO_NODE_DRIVER_PORT'] != null ? process.env['MONGO_NODE_DRIVER_PORT'] : mongo.Connection.DEFAULT_PORT;
var db   = new mongo.Db('mydb', new mongo.Server(host, port, {}), {});

var country_list = fs.readFileSync('./country_list.json'),
	   countries = JSON.parse(country_list),
               i = 0;   
for (c in countries){
	// if (i < 5) {
	// call your function from within here
		console.log( i +' :: ' +c +' = ' +countries[c]);
	// }
i++;
}
/*
var countries = fs.read('./country_list.json') // ["UK","FR","DE","IE"];
var get = [];
for (country in countries) {
 console.log(contry); 
}
*/
// for (country in countries){ //var i = 0; i < countries.length; i++) {
		
		// country = countries[i];
		// setTimeout(function (country) {
			// console.log('Countrie :: ' +country);
			// var list = getcitylist(country);

		// Do something
		
		
		 // }, 3000);
// }

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

