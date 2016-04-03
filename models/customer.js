var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var customerSchema = new Schema({
	created: { type: Date },
	updated: { type: Date },
	name: {type: String},
	email: { type: String, unique: true, lowercase: true},
	password: { type: String, select: false}
});


customerSchema.pre('save', function(next) {
	now = new Date();
	this.updated = now;
	if (!this.created) {
		this.created = now;
	}
//encrypt password
var customer = this;
if (!customer.isModified('password')) {
	return next();
}
bcrypt.genSalt(10, function(err,salt) {
		bcrypt.hash(customer.password, salt, function(err, hash) {
			customer.password = hash;
			next();
		});
	});
});

customerSchema.methods.comparePassword = function ( password, done ) {
	bcrypt.compare(password, this.password, function (err, isMatch) {
		done( err, isMatch );
	});
};

var Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;