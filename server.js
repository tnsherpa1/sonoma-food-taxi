var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var hbs= require('hbs');
var auth = require('./resources/auth');

//require and load dotenv
require('dotenv').load();

//configure body-parser for receiving form data
app.use(bodyparser.urlencoded({ extended: true }));
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
 Auth Routes
*/
app.post('/signup', function (req, res){
	Customer.findOne({ email: req.body.email }, function (err, existingCustomer) {
		if (existingCustomer) {
			return res.status(409).send({ message: 'Email is already taken' });
		}
		var customer = new Customer ({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password
		});
		customer.save( function (err, result) {
			if (err) {
				res.status(500).send({ message: err.message });
			}
			res.send({ token: auth.createJWT(result) });
		});
	});
});

app.post('/login', function (req,res){
	Customer.findOne({ email: req.body.email }, '+password', function (err, customer) {
		if (!customer) {
			return res.status(401).send({message: 'Invalid Email or Password'});
		}
		customer.comparePassword( req.body.password, function (err, isMatch) {
			if(!isMatch) {
				return res.status(401).send({message: 'Invalid Emailor Password'});
			}
			else {
				res.send({ token: auth.createJWT(customer) });
			}
		});
	});
});

/*app.get('/customers', function(req, res){
	Customer.find({}, function(err, customers) {
		if (err) {
			res.send({error: err.message});
			} else res.json({myCustomers: customers});
	});
});*/



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
