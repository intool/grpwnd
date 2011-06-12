
var nodeio = require('node.io');
var options = {timeout: 10};
 
exports.job = new nodeio.Job(options, {
    input: ['hello', 'foobar','weather'],
    run: function (keyword) {
        var self = this, results;
        this.getHtml('http://www.google.com/search?q=' + encodeURIComponent(keyword), function (err, $) {
            results = $('#resultStats').text.toLowerCase();
            self.emit(keyword + ' has ' + results);
        });
    }
});
