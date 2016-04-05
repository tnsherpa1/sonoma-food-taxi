var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var menuSchema = new Schema({
	item: String,
	price: Number
});
var Menu = mongoose.model("Menu", menuSchema);
module.exports = Menu;

