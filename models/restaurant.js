var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var restaurantSchema = new Schema({
	Name: String,
	Cuisine: String,
	Description: String,
	Location: String,
	OpeningHours: String
});

var Restaurant = mongoose.model('Restaurant', restaurantSchema);
module.exports = Restaurant;