//EXPRESS - Framework
var express = require('express');
var app = express();

//ROUTES
var routes = require('./Routes/routes');
var router = routes.router;
var passport = routes.passport;


//OTHER LIBRARIES
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var parseurl = require('parseurl');

//MODELS
var models = require('./Database/models');

// MIDDLEWARE
app.use(function (request, response, next) {
	response.header("Access-Control-Allow-Origin", "*");
	response.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
	response.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
	if ('OPTIONS' == request.method) {
	 	return response.send(200);
	}
	next();
});
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
	secret: 'SECRET',
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', router);
app.listen(8080);

