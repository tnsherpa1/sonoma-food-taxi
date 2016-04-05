var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RestaurantSchema = new Schema({
	name: String,
	cuisine: String,
	description: String,
	location: String,
	menu: [{type: Schema.Types.ObjectId, ref: 'Menu'}],
	openingHours: String
});

var Restaurant = mongoose.model('Restaurant', RestaurantSchema);
module.exports = Restaurant;