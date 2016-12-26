var express = require("express"),
    router = express.Router(),
    middleware = require("../../middleware/index"),
    Investor = require("../../models/investor");


//NEW SUITABILITY
router.get("/", middleware.isLoggedIn, function(req, res){
    Investor.getInvestorByUserId(req.user._id, function(err, investorFound){
        if(err) {
            console.log(err);
        } else {
            if(!investorFound) {
                res.redirect("/dashboard/cadastro-investidor");
            } else {
                if(investorFound.perfil.isComplete) {
                    res.redirect("/dashboard/suitability/edit");
                } else {
                    res.render("investidores/cadastro/suitability/new");
                }
            }
        }
    });
});


//CREATE SUITABILITY
router.post("/", middleware.isLoggedIn, function(req, res){
    if(req.body.investimento.length == 0) {
        req.body.investimento.push("Nunca investiu");
    }

    var query = {user: req.user._id};

    Investor.findOneAndUpdate(query, { $set: {perfil: {
        conhecimento: req.body.conhecimento,
        investimentos: req.body.investimento,
        objetivo: req.body.objetivo,
        acoes: req.body.acoes,
        valorInvestido: req.body.valorInvestido,
        risco: req.body.risco,
        isComplete: true
    }}}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("Perfil de investidor criado!");
            req.flash("success_msg","Formulário de suitability preenchido com sucesso!");
            res.redirect("/dashboard/portfolios");
        }
    })
});

// EDIT SUITABILITY
router.get("/edit", middleware.isLoggedIn, function(req, res){
    Investor.getInvestorByUserId(req.user._id, function(err, investorFound){
        if(err) {
            console.log(err);
        } else {
            if(!investorFound) {
                res.redirect("/dashboard/cadastro-investidor");
            } else {
                if(!investorFound.perfil.isComplete) {
                    res.redirect("/dashboard/suitability");
                } else {
                    res.render("investidores/cadastro/suitability/edit", {investor: investorFound.perfil});
                }
            }
        }
    })
});

// UPDATE SUITABILITY
router.post("/edit", middleware.isLoggedIn, function(req, res){
  if(req.body.investimento.length == 0) {
      req.body.investimento.push("Nunca investiu");
  }

  var query = {user: req.user._id};

  Investor.findOneAndUpdate(query, { $set: {perfil: {
      conhecimento: req.body.conhecimento,
      investimentos: req.body.investimento,
      objetivo: req.body.objetivo,
      acoes: req.body.acoes,
      valorInvestido: req.body.valorInvestido,
      risco: req.body.risco,
      isComplete: true
  }}}, function(err){
      if(err){
          console.log(err);
      } else {
          console.log("Perfil de investidor criado!");
          req.flash("success_msg","Formulário de suitability atualizado com sucesso!");
          res.redirect("/dashboard/portfolios");
      }
  })
});

module.exports = router;
