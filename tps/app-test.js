
/**
 * Module dependencies.
 */
var cfn = require('./crawlie/db_fn');
var express = require('express');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'UPDATED ON WINDOWS TPS [Transactions Per Second]'
  });
});

app.get('/test', function(req, res){


var D = new Date(),
d = cfn.dayofyear(D);
t = cfn.minofday(D);
  res.render('test', {
    title: 'KATE 2	: Test [Transactions Per Second] : ' +d +' > ' +t,
    city: 'London'
  });

});

app.listen(80);
console.log("Express server listening on port %d", app.address().port);
