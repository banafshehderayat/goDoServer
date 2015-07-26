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

