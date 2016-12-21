var express = require("express"),
    router = express.Router(),
    middleware = require("../../middleware/index"),
    Investor = require("../../models/investor");


//NEW SUITABILITY
router.get("/", middleware.isLoggedIn, function(req, res){
    res.render("suitabilityForm");
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
        risco: req.body.risco
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

module.exports = router;