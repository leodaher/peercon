var express = require("express"),
    router = express.Router(),
    middleware = require("../../middleware/index"),
    Investor = require("../../models/investor"),
    fs = require("fs"),
	multipart = require("connect-multiparty"),
	multipartMiddleware = multipart(),
    formValidator = require("../../helpers/formValidator");


//NEW INVESTOR
router.get("/", middleware.isLoggedIn, function(req, res){
	Investor.getInvestorByUserId(req.user._id, function(err, investor){
		if(err) throw err;
		if(!investor) {
			res.render("investidores/cadastro/geral/new");
		} else {
			res.redirect("/dashboard/cadastro-investidor/editar");
		}
	});
});

//CREATE INVESTOR
router.post("/", multipartMiddleware, middleware.isLoggedIn, function(req, res){
	var name = req.body.name;
	var CPF = req.body.cpf;
	var birthday = req.body.date;
	var phone = req.body.telephone;
	var cellphone = req.body.cellphone;
	var renda = req.body.renda;

	var cep = req.body.cep;
	var logradouro = req.body.logradouro;
	var number = req.body.number;
	var complement = req.body.complement;
	var city = req.body.city;
	var state = req.body.state;

	var rg = "tmp/"+"investidores/"+req.files.rg.name;
	var rgverso = "tmp/"+"investidores/"+req.files.rgverso.name;
	var residencia = "tmp/"+"investidores/"+req.files.residencia.name;

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

	var errors = new Array();
	if(req.validationErrors()) {
		errors = req.validationErrors();
	}

	// Validar CPF
	var cpfstr = CPF.replace(/[^0-9]/g,"");
	console.log(cpfstr);
	if(!(formValidator.testaCPF(cpfstr))){
		errors.push({
			msg: "CPF inválido!"
		});
	}

	images.every(function(img){
		if(img.size == 0) {
			errors.push({
				msg: "Todos os documentos são obrigatórios!"
			});
			return false;
		}
	});

	if(errors.length > 0) {
		res.render("investidores/cadastro/geral/new",{
			errors: errors
		});
	} else {
		console.log("working");
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
			rg: rg,
			rgverso: rgverso,
			residencia: residencia,
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

//EDIT INVESTOR
router.get("/editar", middleware.isLoggedIn, function(req, res){
	Investor.getInvestorByUserId(req.user._id, function(err, investor){
		if(!investor) {
			res.render("investidores/cadastro/geral/new");
		} else {
			res.render("investidores/cadastro/geral/edit",{investor: investor});
		}
	});
});

//UPDATE INVESTOR
router.post("/editar", multipartMiddleware, middleware.isLoggedIn, function(req, res){
	var name = req.body.name;
	var CPF = req.body.cpf;
	var birthday = req.body.date;
	var phone = req.body.telephone;
	var cellphone = req.body.cellphone;
	var renda = req.body.renda;

	var cep = req.body.cep;
	var logradouro = req.body.logradouro;
	var number = req.body.number;
	var complement = req.body.complement;
	var city = req.body.city;
	var state = req.body.state;


	var rg = "tmp/"+"investidores/"+req.files.rg.name;
	var rgverso = "tmp/"+"investidores/"+req.files.rgverso.name;
	var residencia = "tmp/"+"investidores/"+req.files.residencia.name;

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

	var errors = new Array();
	if(req.validationErrors()) {
		errors = req.validationErrors();
	}

	// Validar CPF
	var cpfstr = CPF.replace(/[^0-9]/g,"");
	if(!(formValidator.testaCPF(cpfstr))){
		errors.push({
			msg: "CPF inválido!"
		});
	}

	if(errors.length > 0) {
		res.render("investidores/cadastro/edit",{
			errors: errors
		});
	} else {
		var newInvestor = {
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
		};

		if(images[0].size > 0) {
			newInvestor.rg = rg;
		}

		if(images[1].size > 0) {
			newInvestor.rgverso = rgverso;
		}

		if(images[2].size > 0) {
			newInvestor.residencia = residencia;
		}



		var query = {user: req.user._id};

		Investor.findOneAndUpdate(query, { $set: newInvestor}, function(err){
			if(err) {
				console.log(err);
			} else {
				images.forEach(function(img){
					if(img.size > 0) {
						fs.readFile(img.path, function(err, data){
							var imageName = img.name;
							fs.writeFile("tmp/investidores/"+req.user._id+"/"+imageName, data, function(err){
								if(err) {
									console.log(err);
								} else {
									console.log("Images Saved!");
								}
							});
						});
					}
				});
				req.flash("success_msg","Cadastro atualizado!");
				res.redirect("/dashboard/portfolios");
			}
		})
	}
});

module.exports = router;
