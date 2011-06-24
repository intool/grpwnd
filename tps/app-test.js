
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
    title: 'TPS [Transactions Per Second]'
  });
});

app.get('/test', function(req, res){

var D = new Date(),
d = cfn.dayofyear(D),
t = cfn.minofday(D),
city =  req.params.city;
if(!city || city == undefined) { var city = 'London'; }

  res.render('test', {
    title: '[Transactions Per Second] : ' +d +' > ' +t,
    city: city
  });

});

app.get('/:country', function(req, res){

  // res.header('Cache-Control', 'no-cache');
  // res.header('Expires', 'Fri, 31 Dec 1998 12:00:00 GMT');	

country =  req.params.country;

res.render('country', { layout: 'country_layout.jade', title: 'Country Overview'});
  
// var gdc = require('./crawlie/get_deals_for_city');
// gdc.getdeals(city);

});


app.get('/uk/:city', function(req, res){

  res.header('Cache-Control', 'no-cache');
  res.header('Expires', 'Fri, 31 Dec 1998 12:00:00 GMT');	

city =  req.params.city;

  res.render('city', {
    title: city
  });

// var gdc = require('./crawlie/get_deals_for_city');
// gdc.getdeals(city);

});

app.get('/refresh/:city', function(req, res){

var gdc = require('./crawlie/get_deals_for_city');
city =  req.params.city;
gdc.getdeals(city);

  res.header('Cache-Control', 'no-cache');
  res.header('Expires', 'Fri, 31 Dec 1998 12:00:00 GMT');	

  res.statusCode = 200;
  res.end();

});

app.listen(80);
console.log("Express server listening on port %d", app.address().port);