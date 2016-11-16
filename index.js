var express  = require("express"),
    app      = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    User     = require("./models/user"),
    passport = require("passport"),
    LocalStrategy = require("passport-local").Strategy,
    passportLocalMongoose = require("passport-local-mongoose"),
    session = require("express-session"),
    expressValidator = require("express-validator"),
    flash = require("connect-flash"),
    cookieParser = require("cookie-parser");

// Database Connect
mongoose.connect("mongodb://localhost/peercon");

// Requiring Routes
var indexRoutes = require("./controllers/index");

// View Engine
app.set("view engine","ejs");

// BodyParser Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(__dirname + "/public"));

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport Init
app.use(passport.initialize());
app.use(passport.session());

// Set Passport Strategy
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},  function(username, password, done){
        User.getUserByEmail(username, function(err, user) {
            if(err) throw err;
            if(!user) {
                return done(null, false, {message: "Usuário Desconhecido"});
            }

            User.comparePassword(password, user.password, function(err, isMatch) {
                if(err) throw err;

                if(isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, {message: "Senha Inválida!"});
                }
            });
        });
    }));

// Set Passport Serialize
passport.serializeUser(function(user, done) {
    done(null, user._id);
});

// Set Passport Deserialize
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

// Express Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value){
	var namespace = param.split("."),
	    root      = namespace.shift(),
	    formParam = root;

	while(namespace.length) {
	    formParam += '[' + namespace.shift() + ']';
	}

	return {
	    param: formParam,
	    msg: msg,
	    value: value
	};
    }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// Routes
app.use("/", indexRoutes);

// Start Server
app.listen(3000, "localhost", function(){
    console.log("PeerCon server is up!");
});
