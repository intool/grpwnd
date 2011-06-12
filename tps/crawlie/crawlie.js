var io = require('/usr/local/lib/node_modules/node.io'),
    sys = require('sys'),
    fs = require('fs');

var period = 10000;
// var interval = setInterval(function() {

io.scrape(function() {
        var country = 'UK';
    	this.get('http://api.groupon.de/api/v1/deals/oftheday/' +country +'/', function(err, text) {
	var timestamp = Date.now();
	var fd = '/home/user/grpwnd/betadash/crawlie/cache/' +country +'_' +timestamp +'.xml';
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
