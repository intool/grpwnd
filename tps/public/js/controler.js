$(document).ready(function() {
// load country list:
// 

	$.getScript('/js/client-country.js', function() {
		console.log('client-country.js loaded by controler.js');
		// init_selects();
	});
	
	CFInstall.check({
		mode: "overlay",
		destination: window.location
	});

	
}); // end doc.ready
