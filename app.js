//EXPRESS - Framework
var express = require('express');
var app = express();

//MONGODB - Database
var mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/wakedb");

//PASSPORT - User authentication
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FBStrategy = require('passport-facebook').Strategy;

//OTHER LIBRARIES
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var parseurl = require('parseurl');

var db = mongoose.connection;
db.on('error', function() {
	console.log("Error: Database is fucked");
});
db.once('open', function() {
	console.log("Successfully connected to Database")
});

//MONGODB set up
var localUserSchema = new mongoose.Schema({
	username: String,
	password: String
});
var localUser = mongoose.model('localUser', localUserSchema);

//PASSPORT set up
passport.use(new LocalStrategy(function(username, password, done){
	localUser.findOne({username: username}, function(err, user) {
		if (err) {
			console.log("Error: Database query failed");
			return done(err);
		} else if (!user) {
			console.log("Error: user not found")
			return done(null, false, { message: "Error: user not found" });
		} else if (password != user.password) {
			console.log("is: " + password + " should be: " + user.password);
			console.log("Error: incorrect password");
			return done(null, false, { message: "Error: incorrect password" });
		} else {
			console.log(username + " has logged in")
			return done(null, user,  { message: username + " has logged in" });
		}
	});
}));

passport.serializeUser(function(user, done) {
	console.log("serialized");
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	console.log("deserialized");
	localUser.findById(id, function(err, user){
		if(err) {
			done(err)
		} else{
			done(null, user);
		}
	});
});

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


//ROUTES
app.get('/', function(request,response) {
	if (request.user){
		response.json(request.user.username + " is signed in");
	} else {
		localUser.find({}, function(err, users) {
			var str = "No one is signed in, possible users are: \n";
			for(var i=0; i < users.length; i++) {
				str += users[i].username + "\n";
			}
			response.status(200).json(str);
		});
	}
})

app.post('/login', passport.authenticate('local', { failureRedirect: '/sign_in' }), function(request, reponse) {
	reponse.json(request.user.username + " has logged in")
});

app.get('/login', function(request, response) {
	response.sendFile(__dirname + '/public/index.html');
});

app.get('/sign_in', function(request, response) {
	response.sendFile(__dirname + '/public/index.html');
});
app.post('/sign_in', function(request,response) {
	if (!request.body.username) {
		response.status(400).json("Please enter username");
	} else if (!request.body.password){
		response.status(400).json("Please enter a password");
	} else {
		localUser.findOne({username: request.body.username}, function(error, user){
			console.log(user);
			if(user){
				response.status(400).json("User name already exists");
			} else {
				var newUser = new localUser({
					username: request.body.username,
					password: request.body.password
				});
				newUser.save();
				str = "username: " + newUser.username + " password: " + newUser.password;
				response.status(201).json(str);
			}
		});
	}
});

app.get('/logout', function(request, response) {
	username = request.user.username
	request.logout();
	response.json(username + " has signing out");
})

//HOLY SHIT BE CAREFUL MAN - DELETE THIS OR ENSURE PROPER SECURITY IS IMPLEMENTED BEFORE RELEASE
app.post('/cleardb', function(request, response) {
	localUser.remove({}, function(error) {
		if (error) {
			console.log("Error: could not remove modesl from Database");
		} else {
			console.log("Database cleared");
		}
	})
	response.end();
})
app.listen(8080);