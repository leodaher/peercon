var express = require("express"),
    router  = express.Router(),
    User    = require("../models/user");

//LANDING PAGE ROUTE
router.get("/", function(req, res) {
    res.render("home");
});

//REGISTER PAGE ROUTE
router.get("/cadastro", function(req, res){
	var emptyUser = {
		name: "",
		address: "",
		email: "",
		phone: ""
	}
	res.render("register", {err: false, user: emptyUser});
});

//CHECK IF EMAIL EXISTS
router.post("/checkEmail", function(req, res){ 
	var email = req.body.email;
	var userExists = false;
	var query = User.find({email: email});

	query.exec(function(err, usersFound){
		if(err) {
			console.log(err);
		} else {
			if(usersFound.length != 0) {
				userExists = true;
			}
			res.json({userExists: userExists});
		}
	});
	
});

//CHECK LOGIN
router.post("/checkLogin", function(req, res){
	var email = req.body.email;
	var pass = req.body.pass;
	var userExists = false;
	var query = User.find({email: email, password: pass});

	query.exec(function(err, usersFound){
		if(err) {
			console.log(err);
		} else {
			if(usersFound.length == 1) {
				userExists = true;
			} 
			res.json({userExists: userExists});
		}
	})
});

//UPLOAD USER TO DATABASE
router.post("/cadastro", function(req, res){
	var name = req.body.name;
	var address = req.body.address;
	var email = req.body.email;
	var phone = req.body.phone;
	var password = req.body.password;
	
	var newUser = {
		name: name,
		address: address,
		email: email,
		phone: phone,
		password: password
	};

	var query = User.find({email: email});
	
	query.exec(function(err, usersFound){
		if(err) {
			console.log(err);
		} else {
			if(usersFound.length != 0) {
				res.render("register");
			} else {
				User.create(newUser, function(err, newlyCreated) {
					if(err) {
						console.log(err);
					} else {
						console.log(newlyCreated);
						res.redirect("/sucess");
					}
				});
			}
		}
	});
});

router.get("/sucess",function(req, res){
    res.send("<h1>SUCCESS</h1>");
}

module.exports = router;
