var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FoodSchema = new Schema({
	name: String,
	price: Number
});

var Food = mongoose.model('Food', 'FoodSchema');
module.exports = Food;

