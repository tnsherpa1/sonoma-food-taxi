var repl = require('repl');
var db      			= {};
		db.Food 			= require('./food');
		db.Menu 			= require('./menu');
		db.Restaurant	= require('./restaurant');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sonoma_food_taxi');

repl.start('> ').context.db = db;

// listen for an `exit` event
repl.on("exit", function () {
  console.log("Ciao!");
  // disconnect the database connection
  mongoose.disconnect(function() {
    // exit the repl
    process.exit();
  });
});