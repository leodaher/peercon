var express = require("express"),
	router  = express.Router(),
	passport = require("passport"),
	middleware = require("../middleware/index"),
	Investor = require("../models/investor"),
	fs = require("fs"),
	multipart = require("connect-multiparty"),
	multipartMiddleware = multipart(),
	formValidator = require("../helpers/formValidator");


router.get("/", middleware.isLoggedIn, function(req, res){
    res.render("portfolios")
});

router.get("/cadastro-investidor", middleware.isLoggedIn, function(req, res){
	res.render("cadastroInvestidor");
});

router.post("/cadastro-investidor", multipartMiddleware, middleware.isLoggedIn, function(req, res){
	var name = req.body.name;
	var CPF = req.body.cpf;
	var birthdayArray = req.body.date.split("/");
	var birthday = new Date(birthdayArray[2],birthdayArray[1],birthdayArray[0]);
	var phone = req.body.telephone;
	var cellphone = req.body.cellphone;
	var renda = req.body.renda;

	var cep = req.body.cep;
	var logradouro = req.body.logradouro;
	var number = req.body.number;
	var complement = req.body.complement;
	var city = req.body.city;
	var state = req.body.state;

	var images = [req.files.rg,req.files.rgverso,req.files.residencia];

	req.checkBody('name','Nome é um campo obrigatório!').notEmpty();
	req.checkBody('cpf','CPF é um campo obrigatório!').notEmpty();
	req.checkBody('date','Data de nascimento é um campo obrigatório!').notEmpty();
	req.checkBody('telephone','Telefone fixo é um campo obrigatório!').notEmpty();
	req.checkBody('cellphone','Celular é um campo obrigatório!').notEmpty();
	req.checkBody('renda','Renda Mensal Declarada é um campo obrigatório!').notEmpty();

	req.checkBody('cep','CEP é um campo obrigatório!').notEmpty();
	req.checkBody('logradouro','Logradouro é um campo obrigatório!').notEmpty();
	req.checkBody('number','Número é um campo obrigatório!').notEmpty();
	req.checkBody('city','Cidade é um campo obrigatório!').notEmpty();
	req.checkBody('state','Estado é um campo obrigatório!').notEmpty();

	var errors = req.validationErrors();
	
	// Validar CPF
	var cpfstr = CPF.replace(/^[0-9]/,"");
	if(!(formValidator.testaCPF(cpfstr))){
		errors.push({
			msg: "CPF inválido!"
		});
	} 

	if(errors) {
		res.render("cadastroInvestidor",{
			errors: errors
		});
	} else {
		var newInvestor = new Investor({
			name: name,
			CPF: CPF,
			birthday: birthday,
			phone: phone,
			cellphone: cellphone,
			renda: renda,
			cep: cep,
			logradouro: logradouro,
			numero: number,
			complemento: complement,
			cidade: city,
			estado: state,
			user: req.user._id
		});

		Investor.create(newInvestor, function(err, investor){
			if(err) {
				console.log(err);
			} else {
				console.log(investor);
				fs.mkdir("tmp/investidores/"+req.user._id, function(err){
					if(err) {
						console.log(err);
					} else {
						console.log("Directory created successfully!");
						images.forEach(function(img){
							fs.readFile(img.path, function(err, data){
								var imageName = img.name;
								fs.writeFile("tmp/investidores/"+req.user._id+"/"+imageName, data, function(err){
									if(err) {
										console.log(err);
									} else {
										console.log("Images Saved!");
									}
								})
							});
						});						
					}	
				});
			}
		});

		req.flash('success_msg',"Cadastro completo!");
		res.redirect("/dashboard");
	}
});

router.get("/cadastro-empresa", middleware.isLoggedIn, function(req, res){
	res.render("cadastroEmpresa");
})

router.get("/logout", middleware.isLoggedIn, function(req, res){
	req.logout();
	req.flash("success_msg","Até a proxima!");
	res.redirect("/login");
});

module.exports = router;