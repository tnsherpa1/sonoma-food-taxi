var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var hbs= require('hbs');

//require and load dotenv
require('dotenv').load();

//configure body-parser for receiving form data
app.use(bodyparser.urlEncoded({ extended: true }));
app.use(bodyparser.json());

//serve static files from public folder
app.use(express.static(__dirname + '/public'));

//set view engine to hbs
app.set('view engine', 'hbs');

//connect to mongodb
mongoose.connect('mongodb://localhost/sonoma_food_taxi');

//require models
var Customer = require('./models/customer');

///////API////ROUTES///////
app.get('/api/customers', auth.ensureAuthenticated, function (req,res){
	Customer.findById(req.customer, function( err,customer ) {
		res.send();
	});
});

/*
* Catch all routes
*/
app.get('*', function(req,res){
	res.render('index');
});

/*
* Listen on localhost: 3000
*/
app.listen(3000, function(){
	console.log("Server started at ", 3000);
});
