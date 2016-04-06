var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Food = require("./food");

var MenuSchema = new Schema({
	menuName: String,
	foods: [Food.schema]
});
var Menu = mongoose.model("Menu", MenuSchema);
module.exports = Menu;

