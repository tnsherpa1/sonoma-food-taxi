var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Menu = require("./menu");

var RestaurantSchema = new Schema({
	name: String,
	cuisine: String,
	description: String,
	location: String,
	menu: Menu.schema
});

var Restaurant = mongoose.model('Restaurant', RestaurantSchema);
module.exports = Restaurant;