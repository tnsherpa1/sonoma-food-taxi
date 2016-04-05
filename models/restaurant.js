var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var restaurantSchema = new Schema({
	Name: String,
	Cuisine: String,
	Description: String,
	Location: String,
	MenuItems: [{type: Schema.Types.ObjectId, ref: 'Menu'}],
	OpeningHours: String
});

var Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;