var fs = require('fs'),
    crypto = require('crypto');

var writeStream = fs.createWriteStream('./random.csv', { flags: 'a+', encoding: null, mode: 0666 });
function run() {
	var i = 1;
	while (i<16001){
uniq_id = crypto.createHash('md5').update("" + (new Date()).getTime() +i).digest("hex");
		console.log('# ' +i + ' - ' +uniq_id.substring(0,10));
		writeStream.write(i +',' +uniq_id.substring(0,10) +'\n');
	i++;
	} // end while
}

run();
