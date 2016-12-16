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
router.get("/cadastroInvestidor", function(req, res){
	res.render("register",{option: 0});
});

router.get("/cadastroEmpresa", function(req, res){
	res.render("register",{option: 1});
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
	var escolha = req.body.escolha;

	req.checkBody('name', 'Nome é um campo obrigatório!').notEmpty();
	req.checkBody('email', 'E-mail é um campo obrigatório!').notEmpty();
	req.checkBody('email', 'Este e-mail não é válido!').isEmail();
	req.checkBody('password', 'Senha é um campo obrigatório!').notEmpty();
	req.checkBody('password2', 'As senhas não são iguais!').equals(req.body.password);
	
	var errors = new Array();
	
	if(req.validationErrors()) {
		errors = req.validationErrors();
	} 
	User.getUserByEmail(email, function(err, user){
		if(err) {
			console.log(err);
		} else {
			if(user) {
				errors.push({msg: "E-mail já cadastrado!"});
			}
			
			if(errors.length > 0) {
				var option;
				if(escolha == "investidor") {
					option = 0;
				} else {
					option = 1;
				}
				
				res.render("register",{
					option: option,
					errors: errors
				});
			} else {
				var newUser = new User({
					name: name,
					email: email,
					password: password,
					escolha: escolha
				});
		
				User.createUser(newUser, function(err, user) {
					if(err) throw err;
					console.log(user);
				});
		
				passport.authenticate("local")(req, res, function(){
					console.log("Authentication working");
					res.redirect("/dashboard");
				});
			}
		}
	});
});

// Login User
router.post("/login", multipartMiddleware,
	passport.authenticate("local", {successRedirect: '/dashboard', failureRedirect: '/login', failureFlash: false}),
	function(req, res){
		res.redirect("/dashboard");
	}
);

module.exports = router;
