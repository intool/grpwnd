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



			// post-load deal cache refresh:
			$.get('/refresh/' + city, function(data) {
  				console.log('Cache refreshed for city :: ' +city);
  				
			  	// fetch json of deals for the city :-)
				$.getJSON('/json_cache/deals_' + city + '.json', function(data) {
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
			+ '<tr class="res_hdr"> <td class="col1">     Sold </td><td>               Revenue </td></tr>'
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
							
						+ '</div>').fadeIn(300);
					i++;
					total_r += val.r;
					total_s += Number(val.s);
					// console.log (i +' Total Sales : ' +total_s +' - revenue : ' +total_r );
					
					}); // end each
			
				$('#canvas').toggle('fast').slideDown();	
				$('#city-total').append('<table class="results green totals" width="100%" cellspacing="0" cellpadding="0" border="0">'
										+ '<tbody>'			
	+ '<tr class="res_hdr"> <td class="col1">   Sold       </td><td>            Revenue </td></tr>'
	+ '<tr class="res_lrg"> <td class="col1">' + total_s +'</td><td>  &pound;' + total_r  + '</td></tr>'
									+ '</tbody>'		
	                               + '</table>');
				});
			});	
			
setTimeout( function() {		
		var get = $.getJSON('/json_cache/deals_' + city + '.json', function (data, textStatus, jqXHR) {
			console.log('textStatus :: ' +textStatus);
			console.log('jqXHR :: ' +jqXHR.text);
			
            });
}, 30 000);
	

setTimeout( function() {		
		var get = $.ajax({
    type: "GET", url: '/json_cache/deals_' + city + '.json',
    success: function (data, text) {
        //...
    },
    error: function (request, status, error) {
        alert(request.responseText);
    }
});
}, 3000);	
	
	
/*	
$(function () {
    // we use an inline data source in the example, usually data would
    // be fetched from a server
    var data = [], totalPoints = 300;
    function getRandomData() {
        if (data.length > 0)
            data = data.slice(1);
 
        // do a random walk
        while (data.length < totalPoints) {
            var prev = data.length > 0 ? data[data.length - 1] : 50;
            var y = prev + Math.random() * 10 - 5;
            if (y < 0)
                y = 0;
            if (y > 100)
                y = 100;
            data.push(y);
        }
 
        // zip the generated y values with the x values
        var res = [];
        for (var i = 0; i < data.length; ++i)
            res.push([i, data[i]])
        return res;
    }
 
    // setup control widget
    var updateInterval = 500;
    $("#updateInterval").val(updateInterval).change(function () {
        var v = $(this).val();
        if (v && !isNaN(+v)) {
            updateInterval = +v;
            if (updateInterval < 1)
                updateInterval = 1;
            if (updateInterval > 2000)
                updateInterval = 2000;
            $(this).val("" + updateInterval);
        }
    });
 
    // setup plot
    var options = {
        series: { shadowSize: 0 }, // drawing is faster without shadows
        yaxis: { min: 0, max: 100 },
        xaxis: { show: false }
    };
    var plot = $.plot($("#placeholder"), [ getRandomData() ], options);
 
    function update() {
        plot.setData([ getRandomData() ]);
        // since the axes don't change, we don't need to call plot.setupGrid()
        plot.draw();
        
        setTimeout(update, updateInterval);
    }
 
    update();
});
*/
}); // end doc.ready