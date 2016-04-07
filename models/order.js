var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Restaurant = require('./restaurant');
var Customer = require('./customer');
var OrderSchema = new Schema({
	restaurantId: {type: Schema.Types.ObjectId, ref: 'Restaurant'},
	customerId: {type: Schema.Types.ObjectId, ref: 'Customer'}
});
var Order = mongoose.model("Order", OrderSchema);
module.exports = Order;