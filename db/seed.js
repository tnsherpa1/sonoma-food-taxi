var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sonoma_food_taxi');
var Restaurant = require('../models/restaurant');

var restaurants = [ 
{	
	Name: "El Dorado Kitchen",
	Cuisine: "American",
	Description: "Locally sourced California-Mediterranean fare served in a sophisticated hotel dining room." ,
	Location: "405 1st St W"
}, 
{	
	Name: "The Red Grape",
	Cuisine: "Pizza",
	Description: "Easygoing, family-run pizzeria offering brick-oven pies, salads & pasta dishes, plus patio seating." ,
	Location: "529 1st St W"
},
{	
	Name: "Depot Hotel Restaurant",
	Cuisine: "Italian",
	Description: "Elevated Italian cuisine & wines are served in an 1870 train depot with a garden & ornamental pool." ,
	Location: "241 1st St W"
},
{	
	Name: "La Casa Restaurant",
	Cuisine: "Mexican",
	Description: "Opened in 1967, this Mexican venue offers Jalisco cuisine in a warm, traditional space with a patio." ,
	Location: "121 E Spain St",
},
{	
	Name: "Saddles Steakhouse",
	Cuisine: "Steak",
	Description: "Casually refined MacArthur Place hotel eatery serving steaks & breakfast amid upscale cowboy decor." ,
	Location: "29 E MacArthur St",
}
];
Restaurant.remove({}, function(err) {
if (err) {
	console.log(err);
} else {
	Restaurant.create(restaurants, function(err, restaurants){
		if (err) { 
			console.log(err); 
		}
			else {	
			console.log("created: ", restaurants);
			mongoose.connection.close();
			}
	});
}
});