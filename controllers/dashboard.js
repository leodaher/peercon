var express = require("express"),
	router  = express.Router(),
	passport = require("passport"),
	middleware = require("../middleware/index"),
	Investor = require("../models/investor"),
    Empresa = require("../models/empresa"),
	fs = require("fs"),
	multipart = require("connect-multiparty"),
	multipartMiddleware = multipart(),
	formValidator = require("../helpers/formValidator");


router.use("/portfolios", require('./investidores/portfolios'));
router.use("/propostas", require('./empresas/propostas'));

router.use("/cadastro-investidor", require('./investidores/cadastro'));
router.use("/suitability", require('./investidores/suitability'));
router.use("/cadastro-empresa", require('./empresas/cadastro'));


router.get("/", middleware.isLoggedIn, function(req, res){
	if(req.user.escolha == "investidor") {
		res.redirect("/dashboard/portfolios");
	} else {
		res.redirect("/dashboard/propostas");
	}
});

router.get("/logout", middleware.isLoggedIn, function(req, res){
	req.logout();
	req.flash("success_msg","Até a proxima!");
	res.redirect("/");
});

module.exports = router;