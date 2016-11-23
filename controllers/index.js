var express  = require("express"),
    router   = express.Router(),
    passport = require("passport"),
    LocalStrategy = require("passport-local").Strategy,
    User     = require("../models/user"),
    middleware = require("../middleware/index"),
    fs = require("fs"),
    multipart = require("connect-multiparty"),
    multipartMiddleware = multipart();

// Landing Page Route
router.get("/", function(req, res) {
	if(req.isAuthenticated()) {
		res.redirect("/dashboard");
	} else {
		res.render("home");	
	}
});

// Register 
router.get("/cadastro", function(req, res){
	res.render("register");
});

// Login
router.get("/login", function(req, res) {
	res.render("login");
});

// Register User
router.post("/cadastro", multipartMiddleware, function(req, res){
	var name = req.body.name;
	var email = req.body.email;
	var password = req.body.password;
	var password2 = req.body.password2;

	req.checkBody('name', 'Nome é um campo obrigatório!').notEmpty();
	req.checkBody('email', 'E-mail é um campo obrigatório!').notEmpty();
	req.checkBody('email', 'Este e-mail não é válido!').isEmail();
	req.checkBody('password', 'Senha é um campo obrigatório!').notEmpty();
	req.checkBody('password2', 'As senhas não são iguais!').equals(req.body.password);

	var errors = req.validationErrors();

	if(errors) {
		res.render("register",{
			errors: errors
		});
	} else {
		var newUser = new User({
			name: name,
			email: email,
			password: password
		});

		User.createUser(newUser, function(err, user) {
			if(err) throw err;
			console.log(user);
		});

		passport.authenticate('local')(req, res, function(){
			req.flash('success_msg', 'Você está cadastrado e agora pode se logar!');
			res.redirect("/dashboard");
		});
	}
});

// Login User
router.post("/login", multipartMiddleware,
	passport.authenticate("local", {successRedirect: '/dashboard', failureRedirect: '/login', failureFlash: true}),
	function(req, res){
		res.redirect("/dashboard");
	}
);

module.exports = router;
