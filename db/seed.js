var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sonoma_food_taxi');
var Restaurant = require('../models/restaurant');

var restaurants = [ 
{	
	name: "El Dorado Kitchen",
	cuisine: "American",
	description: "Locally sourced California-Mediterranean fare served in a sophisticated hotel dining room." ,
	location: "405 1st St W"
}, 
{	
	name: "The Red Grape",
	cuisine: "Pizza",
	description: "Easygoing, family-run pizzeria offering brick-oven pies, salads & pasta dishes, plus patio seating." ,
	location: "529 1st St W"
},
{	
	name: "Depot Hotel Restaurant",
	cuisine: "Italian",
	description: "Elevated Italian cuisine & wines are served in an 1870 train depot with a garden & ornamental pool." ,
	location: "241 1st St W"
},
{	
	name: "La Casa Restaurant",
	cuisine: "Mexican",
	description: "Opened in 1967, this Mexican venue offers Jalisco cuisine in a warm, traditional space with a patio." ,
	location: "121 E Spain St",
},
{	
	name: "Saddles Steakhouse",
	cuisine: "Steak",
	description: "Casually refined MacArthur Place hotel eatery serving steaks & breakfast amid upscale cowboy decor." ,
	location: "29 E MacArthur St",
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