var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Restaurant = require('./restaurant');
var Customer = require('./customer');
var OrderSchema = new Schema({
	// TODO: Reference Customer and Restaurant model by Id 
	/*restaurantId: {type: Schema.Types.ObjectId, ref: 'Restaurant'},
	customerId: {type: Schema.Types.ObjectId, ref: 'Customer'},*/
	customerName: String,
	deliveryAddress: String,
	deliveryTime: String,
	itemName: String,
	itemQty: Number,
	itemPrice: Number,
	orderTotal: Number,
	orderNo: Date
});
var Order = mongoose.model("Order", OrderSchema);
module.exports = Order;