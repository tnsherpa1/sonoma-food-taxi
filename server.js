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
app.use("/vendor", express.static("bower_components"));

//set view engine to hbs
app.set('view engine', 'hbs');

//connect to mongodb
mongoose.connect('mongodb://localhost/sonoma_food_taxi');

//require models
var Customer = require('./models/customer');
var Restaurant = require('./models/restaurant');
var Menu = require('./models/menu');
var Order = require('./models/order');
  ////////////////////////////
 ///////API////ROUTES///////
//////////////////////////
app.get('/api/me', auth.ensureAuthenticated, function (req, res) {
  Customer.findById(req.customer, function (err, customer) {
    res.send(customer);
  });
});

app.put('/api/me', auth.ensureAuthenticated, function (req, res) {
  Customer.findById(req.customer, function (err, customer) {
    if (!customer) {
      return res.status(400).send({ message: 'Customer not found.' });
    }
    customer.name = req.body.name || customer.name;
    customer.email = req.body.email || customer.email;
    customer.save(function(err) {
      res.send(customer);
    });
  });
});

app.post('/restaurants', function(req,res){
	var restaurant = new Restaurant({
		name: req.body.name,
		cuisine: req.body.cuisine,
		description: req.body.description,
		location: req.body.location,
		menuItems: [],
		openingHours: req.body.openingHours
	});
	restaurant.save(function (err, newRestaurant) {
		if (err) {
			res.send({"Error": err.message});
		} else {
			res.json({"Added Restaurant": newRestaurant});
		}
	});
});
app.get('/api/customers', auth.ensureAuthenticated, function (req,res){
	Customer.findById(req.customer, function( err,customer ) {
		res.send(customer);
	});
});
/*
 Auth Routes
*/
app.post('/auth/signup', function (req, res){
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

app.post('/auth/login', function (req,res) {
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


app.get('/customers', function(req, res){
	Customer.find({}, function(err, customers) {
		if (err) {
			res.send({error: err.message});
			} else res.json({myCustomers: customers});
	});
});

app.get('/api/restaurants', function(req,res){
	Restaurant.find({}, function(err, restaurants){
		if (err) {
			console.log(err);
		} else {
			res.json(restaurants);
		}
	});
});

app.get('/api/restaurants/:id', function(req, res){
	var restaurantId = req.params.id;
	Restaurant.findById( restaurantId, function (err, restaurant) {
		if (err) {
			res.status(500).json({ error: err.message });
		} else {
			res.json(restaurant);
		}
	});
});


//TODO: post order to database
app.post('/api/order', function(req, res) {
  // console.log(req.body);
  var order = new Order ({
		customerName: "John Does",
		deliveryAddress: "34 W Napa St",
		deliveryTime: "30mins",
		itemName: "pizza",
		itemQty: 1,
		itemPrice: 10,
		orderTotal: 10,
		orderNo: Date.now()
  });
  order.save(function(err, newOrder){
  	if (err) {
  		console.log("error: ", err.message);
  	}
  res.status(201).send({ newOrder: newOrder});
  });
});
app.get('/api/order', function(req, res){
	Order.find({}, function(err, allOrders) {
		if (err) {
			console.log("error: ", err.message);
		}
		res.json(allOrders);
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
