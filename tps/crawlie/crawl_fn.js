
/******* Crawlie Function Library! ****/

 function is_string(input){
    return typeof(input)=='string' && isNaN(input);
  }

// Two basic Date 'Conversion' (simplification) functions:

module.exports.dayofyear = function(D) {   // D is a Date object  e.g: var D = new Date();
	if (D == undefined || D === false ){
	 var D = new Date;	
	}
	var yn = D.getFullYear();
	var mn = D.getMonth();
	var dn = D.getDate();
	var d1 = new Date(yn,0,1,12,0,0); // noon on Jan. 1
	var d2 = new Date(yn,mn,dn,12,0,0); // noon on input date
	var ddiff = Math.round((d2-d1)/864e5);
  return ddiff+1; 
}

module.exports.minofday = function(D) {
//	if (D === undefined || D === false ){
//	 var D = new Date;	
//	}
  	var h = D.getHours(),
      m = D.getMinutes();
  return (h-1)*60+m;
}

// Get size of object/array 
// usage var size = objectsize(obj);
module.exports.objectsize = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};
