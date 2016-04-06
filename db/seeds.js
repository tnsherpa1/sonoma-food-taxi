var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sonoma_food_taxi');
var Restaurant = require('../models/restaurant');
var Menu = require('../models/menu');
var Food = require('../models/food');

Food.remove({}, function(err){ 
	if (err) {
		console.log(err);
	} 
});
Menu.remove({}, function(err) {
	if (err) {
		console.log(err);
	} 
});
Restaurant.remove({}, function(err) {
	if (err) {
		console.log(err);
	}
});

var redGrapeFood = [{ 
									name: "pizza", 
									price: 7 
								}, 
								{
									name: "sandwich",
									price: 8
								}, 
								{
									name: "burger",
									price: 9
								}];

//Depot Hotel Menu Items
var depotFood = [{ 
									name: "gnocchi", 
									price: 7 
								}, 
								{
									name: "parmigiana",
									price: 8
								}, 
								{
									name: "pizza napoletana",
									price: 9
								}];

//Eldorado Kitchen Menu Items
var edkFood = [{ 
								name: "pasta", 
								price: 7 
							}, 
							{
								name: "Eggs Bennedict",
								price: 8
							}, 
							{
								name: "burger",
								price: 9
						}];
//Saddles Menu Items
var saddlesFood = [{ 
								name: "omelette", 
								price: 10 
							}, 
							{
								name: "Hash Browns",
								price: 11
							}, 
							{
								name: "Breakfast Burrito",
								price: 12
						}];
	////MENUS////
var menus = [
	{ 
		menuName: "The Red Grape Menu",
		foods: redGrapeFood
	},
	{
		menuName: "Depot Menu",
		foods: depotFood
	},
	{
		menuName: "EDK Menu",
		foods: edkFood
	},
	{	
		menuName: "Saddle's Menu",
		foods: saddlesFood
	}
];

var restaurants = [ 
{	
	name: "The Red Grape",
	cuisine: "Pizza",
	description: "Easygoing, family-run pizzeria offering brick-oven pies, salads & pasta dishes, plus patio seating." ,
	location: "529 1st St W",
	menu: menus[0]
},
{	
	name: "Depot Hotel Restaurant",
	cuisine: "Italian",
	description: "Elevated Italian cuisine & wines are served in an 1870 train depot with a garden & ornamental pool." ,
	location: "241 1st St W",
	menu: menus[1]
},
{	
	name: "El Dorado Kitchen",
	cuisine: "American",
	description: "Locally sourced California-Mediterranean fare served in a sophisticated hotel dining room." ,
	location: "405 1st St W",
	menu: menus[2]
}, 
{	
	name: "Saddle's Restaurant",
	cuisine: "Mexican",
	description: "Opened in 1967, this Mexican venue offers Jalisco cuisine in a warm, traditional space with a patio." ,
	location: "121 E Spain St",
	menu: menus[3]
}
];
Restaurant.create(restaurants, function(err, restaurants){
	console.log("new restaurants: ", restaurants);

	Menu.create(menus, function(err, menus) {
		console.log("new menus: ", menus);

		Food.create(redGrapeFood, function(err, redGrapeFood) {
			console.log("Food: ", redGrapeFood);
		});
		Food.create(depotFood, function(err, depotFood) {
		console.log("Food: ", depotFood);
		});
		Food.create(edkFood, function(err, edkFood) {
		console.log("Food: ", edkFood);
		});
		Food.create(saddlesFood, function(err, saddlesFood) {
		console.log("Food: ", redGrapeFood);
		});
	});

});


