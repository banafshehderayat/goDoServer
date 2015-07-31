//EXPRESS - Framework
var express = require('express');
var app = express();

//ROUTES
var router = require('./Routes/routes').router;

//OTHER LIBRARIES
var bodyParser = require('body-parser');
var session = require('express-session');
var parseurl = require('parseurl');

//MODELS
var models = require('./Database/models');

// MIDDLEWARE
app.use(function (request, response, next) {
	response.header("Access-Control-Allow-Origin", "*");
	response.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
	response.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
	next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
	secret: 'SECRET',
	resave: false,
	saveUninitialized: false
}));
app.use('/', router);
app.listen(8080);

