var express = require('express');
var swig = require('swig');
var bodyparser = require('body-parser');
var bluebird = require('bluebird');
var model = require('../models');
var db = model.db;
var Hotel = model.Hotel;
var Place = model.Place;
var Restaurant = model.Restaurant;
var Activity = model.Activity;

var router = express.Router();

var hotels = Hotel.findAll();
var restaurants = Restaurant.findAll();
var activities = Activity.findAll();


router.get('/', function(req, res, next) {

  // Hotel.findAll()
  //   .then(function(hotels) {
  //     // var hotelnames = hotels.map(function(hotel) {
  //     //   return hotel.name;
  //     // })
  //     console.log(hotels.dataValues)
  //     res.render('index', {hotels: hotels})
  //   })

  Promise.all([hotels, restaurants, activities]).then(function([hotels, restaurants, activities]) {
  res.render('index', {
    Hotel: hotels,
    Restaurant: restaurants,
    Activity: activities
  })
  })
});





module.exports = router
