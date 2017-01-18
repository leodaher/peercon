var express = require("express"),
    router = express.Router(),
    mongoose = require("mongoose"),
    middleware = require("../../middleware/index"),
    Empresa = require("../../models/empresa.js"),
    Proposta = require("../../models/proposta.js");

router.get("/", middleware.isLoggedIn, function(req, res){
  var query = {user: mongoose.Types.ObjectId(String(req.user._id))};
  Empresa.findOne(query, function(err, empresa){
    if(err) {
      console.log(err);
    } else {
      if(!empresa) {
        res.render("empresas/propostas/index",{empresa: false, user: req.user, propostas: []});
      } else {
        if(empresa.status != "Aprovado") {
          res.render("empresas/propostas/index",{empresa: empresa, user: req.user, propostas: []});
        } else {
          var query = {empresa: mongoose.Types.ObjectId(String(empresa._id))};
          Proposta.find(query, function(err, propostas){
            if(err) {
              console.log(err);
            } else {
              res.render("empresas/propostas/index", {empresa: empresa, user: req.user,propostas: propostas});
            }
          })
        }
      }
    }
  })
});

router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("empresas/propostas/new");
});

router.post("/new", middleware.isLoggedIn, function(req, res){
    var valor = req.body.valor;
    var prazo = req.body.prazo;
    var proposito = req.body.proposito;

    var banco = req.body.banco;
    var agencia = req.body.agencia;
    var conta = req.body.conta;

    req.checkBody("valor","Valor é um campo obrigatório!").notEmpty();
    req.checkBody("prazo","Prazo é um campo obrigatório!").notEmpty();
    req.checkBody("proposito","Propósito é um campo obrigatório!").notEmpty();
    req.checkBody("banco","Banco é um campo obrigatório!").notEmpty();
    req.checkBody("agencia","Agência é um campo obrigatório!").notEmpty();
    req.checkBody("conta","conta é um campo obrigatório!").notEmpty();

    var errors = req.validationErrors();

    if(errors) {
      res.render("empresas/propostas/new",{errors: errors});
    } else {
      var query = {user: mongoose.Types.ObjectId(String(req.user._id))};
      Empresa.findOne(query, function(err, empresa){
          if(err) {
              console.log(err);
          } else {
              var newProposta = new Proposta({
                emprestimo: {
                  valor: valor,
                  prazo: prazo,
                  proposito: proposito
                },
                dadosBancarios: {
                  banco: banco,
                  agencia: agencia,
                  conta: conta
                },
                status: "Análise",
                empresa: empresa._id
              });
              Proposta.createProposta(newProposta, function(err){
                if(err) {
                  console.log(err);
                } else {
                  console.log("Proposta criada!");
                  req.flash("success_msg","Sua solicitação foi feita! Agora nossa equipe irá analisá-la!");
                  res.redirect("/dashboard/propostas");
                }
              })
          }
      });
    }
});

module.exports = router;
