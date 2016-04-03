var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var hbs= require('hbs');

//configure body-parser for receiving form data
app.use(bodyparser.urlEncoded({ extended: true }));
app.use(bodyparser.json());



app.listen(3000, function(){
	console.log("Server started at ", 3000);
});
