var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MenuSchema = new Schema({
	menuName: String,
	menuItems: [{type: Schema.Types.ObjectId, ref: 'Food'}]
});
var Menu = mongoose.model("Menu", MenuSchema);
module.exports = Menu;

