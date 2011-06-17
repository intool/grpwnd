	var city = window.location.pathname.split("/")[2];
	console.log('CITY :: ' + city);
	if (city !== undefined){
		// assign the city id from the url to the city select box client side.
		$('#city-select-box' + ' option[value=' + city + ']').attr('selected','selected');
	}
	
	$('#city-select-box').change( function () {
		var city = $('#city-select-box').find(':selected').val(); // get the value of the city clicked on.
		location.href = "/city/" + city; // send the client to the appropriate city
	}); // end change event watcher testy

	console.log('IE is SH!T!! Get yourself some Chrome!');
	alert('Browser : ' + navigator.appName );

	$.getScript('/js/jquery.flot.js', function () {
		alert('flot.js loaded');
	});
