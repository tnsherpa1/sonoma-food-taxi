var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sonoma_food_taxi');
var Menu = require('../models/menu');

var menus = [];

menus.push({ item: 'Pizza',
             price: 10 });
menus.push({ item: "Pasta",
             price: 12 });
menus.push({ item: 'Sandwich',
             price: 13 });
menus.push({ item: 'Burger',
             price: 14 });
menus.push({ item: 'Salad',
             price: 15 });
menus.push({ item: 'Steak',
             price: 16 });
menus.push({ item: 'Burger',
             price: 13 });

Menu.remove({}, function(err) {
if (err) {
	console.log(err);
} else {
	Menu.create(menus, function(err, menus){
		console.log("creating...")
		if (err) { 
			console.log(err); 
		}
			else {	
			console.log("created: ", menus);
			mongoose.connection.close();
			}
	});
}
});
