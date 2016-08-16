var morgan = require('morgan');
var express = require('express');
var swig = require('swig');
var app = express();
var routes = require('./routes');
var model = require('./models');
var db = model.db;
var Hotel = model.Hotel;
var Place = model.Place;
var Restaurant = model.Restaurant;
var Activity = model.Activity;
var bodyparser = require('body-parser')

app.use(morgan('dev'))

app.use('/', routes)

app.set('views', __dirname + '/views');

app.set('view engine', 'html');

app.engine('html', swig.renderFile);

swig.setDefaults({cache:false})

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());

app.use(express.static(__dirname + '/public'))
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap'))
app.use('/jquery', express.static(__dirname + '/node_modules/jQuery/dist'))
app.use('/js', express.static(__dirname + '/js'))
app.use('/moment', express.static(__dirname + '/node_modules/moment'))


app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500).send();
  console.error(err);
});


model.Place.sync()
  .then(model.Hotel.sync())
  .then(model.Restaurant.sync())
  .then(model.Activity.sync())
  .then(function() {
    app.listen(3000, function() {
      console.log('listening on 3000');
    })
  })
