
$(document).ready(function() {

	var country = window.location.pathname.split("/")[1].toUpperCase(),
	       city = window.location.pathname.split("/")[2];
	       
	$('#city-select-box').change(function() {
		var city = $('#city-select-box').find(':selected').val(); // get id from select
		$('#city-select').html('<img src="/img/ajax-loader.gif">');
		location.href = '/' +country + '/' +city; // send to city
	}); // end change event watcher

	// build & select the city list client side :-)
	$.getJSON('/json_cache/citylist_' + country + '.json', function(data) {
		var sort_by = function(field, reverse, primer){
		   reverse = (reverse) ? -1 : 1;
		   return function(a,b){
			   a = a[field];
			   b = b[field];
			   if (typeof(primer) != 'undefined'){
				   a = primer(a);
				   b = primer(b);
			   }
			   if (a<b) return reverse * -1;
			   if (a>b) return reverse * 1;
			   return 0;
		   }
		}
		data.sort(sort_by('name', false, function(a){return a.toUpperCase()}));
		$.each(data, function(key, val) {
			$('#city-select-box').append('<option value="' + val.id + '">' + val.name + '</option>');
		});
		var c = window.location.pathname.split("/")[2];
		document.getElementById("city-select-box").value = c;
		$('#city-select').fadeIn(300, 'swing');	
	});

//	var city = window.location.pathname.split("/")[2];
console.log('We\'ve made it this far... ' +city);
 updatedeals();
// setTimeout( dealinit(city), 100);	

	
}); // end doc.ready

function updatedeals() { 
	var city = window.location.pathname.split("/")[2];
	$.get('/refresh/' + city, function(data) {
  		console.log('Cache refreshed for city :: ' +city );
  		dealinit(city);
    });
}

function dealinit(city) {	
	
	var D = new Date(),
	d = dayofyear(D),
	m = minofday(D);
	console.log('Date : ' +D +' Day :: ' +d +' + min :: ' +m);	
	var get = $.ajax({
     type: "GET", url: '/json_cache/deals_' + city + '_' +d +'.json',
     success: function (data, text) {
     console.log('Success! > Loading deals from Cache...');
     var i = 0,
	 total_s = 0,
	 total_r = 0;
				    
		$.each(data, function(key, val) {
			$('#deals').append('<div class="deal" id="' + val.id + '">' 		

	+ '<div class="dinfo">'
		+ '<a target="_blank" href="' +val.url + '"><img class="dimg" src="' + val.image_large_url  +'"></a>'
		+ '<h3 class="dtitle">' + val.title  + '</h3>'
		+ '<small> [ ' +val.type_info  + ' ]</small>'
	+ '</div>'	
		
	+ '<div class="tbls">'												
	+ '<table class="results green" width="100%" cellspacing="0" cellpadding="0" border="0">'				
		+ '<tbody>'			
			+ '<tr class="res_hdr"> <td class="col1">   Sold </td><td>               Revenue </td></tr>'
			+ '<tr class="res_lrg"> <td class="col1">'  + Math.round(val.s)  +'</td><td>  &pound;' + Math.round(val.r*10)/10  + '</td></tr>'
		+ '</tbody>'		
	+ '</table>'
	
	+ '<table class="results blue" width="100%" cellspacing="0" cellpadding="0" border="0">'				
		+ '<tbody>'						
			+ '<tr class="res_hdr"> <td class="col1">             Price      </td><td>        Discount      </td></tr>'
			+ '<tr class="res_lrg"> <td class="col1"> &pound;'  + val.price  +'</td><td>' + val.discount_percent  + '% </td></tr>'
		+ '</tbody>'		
	+ '</table>'
	
	+ '<table class="results orange" width="100%" cellspacing="0" cellpadding="0" border="0">'				
		+ '<tbody>'			
			+ '<tr class="res_hdr"> <td class="col1-or">    Deal ID </td><td>       Salesforce # </td></tr>'
			+ '<tr class="res_lrg"> <td class="col1-or">'  + val.id  +'</td><td>' + val.salesforce_id  + '</td></tr>'
		+ '</tbody>'		
	+ '</table>'		
	+ '</div>'
							
				+ '</div>').fadeIn(300); // end append
					i++;
					total_r += val.r;
					total_s += Number(val.s);
					// console.log (i +' Total Sales : ' +total_s +' - revenue : ' +total_r );
					
			}); // end each
			
				$('#canvas').fadeTo('slow', 1.0); // .toggle('fast').slideDown();	
				$('#city-total').append(' '

	+ '<table class="results totals ph" width="100%" cellspacing="0" cellpadding="0" border="0">' 
		+ '<tbody>'			
	+ '<tr class="res_hdr"> <td class="col1">  #G p/h       </td><td class="col1">  &pound;  p/h    </td></tr>'
	+ '<tr class="res_lrg"> <td class="col1">' + Math.floor(total_s*60*100/m)/100 +'</td>' 
	+'<td class="col1">&pound;' + Math.floor((total_r*60/m)*100)/100  + '</td></tr>'
		+ '</tbody>'		
	+ '</table>'

	+ '<table class="results green totals" width="100%" cellspacing="0" cellpadding="0" border="0">' 
		+ '<tbody>'			
	+ '<tr class="res_hdr"> <td class="col1">  # Sold       </td><td class="col1">   Revenue       </td><td>   Average </td></tr>'
	+ '<tr class="res_lrg"> <td class="col1">' + total_s +'</td><td class="col1">&pound;' + Math.floor(total_r*100)/100  + '</td><td>&pound;' +Math.floor(total_r/total_s*100)/100 +'</td>  </tr>'
		+ '</tbody>'		
	+ '</table>'
	
	+ '<table class="results totals active" width="100%" cellspacing="0" cellpadding="0" border="0">'
		+ '<tbody>'			
			+ '<tr class="res_hdr"> <td># Active</td></tr>'
			+ '<tr class="res_lrg"> <td>' + i +'</td></tr>'
		+ '</tbody>'		
	+ '</table>'	
	);
console.log('Done!');
    },
    error: function (request, status, error) {
    	console.log('No Cache! Need to Load');
        console.log(request.responseText +' -> '  + error);
        updatedeals(city);

    }
});
}


// Two basic Date 'Conversion' (simplification) functions:

function dayofyear(D) {   // D is a Date object  e.g: var D = new Date();
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

function minofday(D) {
//	if (D === undefined || D === false ){
//	 var D = new Date;	
//	}
  	var h = D.getHours(),
      m = D.getMinutes();
  return h*60+m;
}
