var express = require("express"),
    router = express.Router(),
    middleware = require("../../middleware/index"),
    Empresa = require("../../models/empresa.js");

router.get("/", middleware.isLoggedIn, function(req, res){
	Empreendedor.getEmpreendedorByUserId(req.user._id, function(err, empreendedor){
		if(err) throw err;
		if(!empreendedor) {
			res.render("propostas",{empreendedorForm: false, empresaForm:false, user: req.user});
		} else {
			res.render("propostas",{empreendedorForm: true, empresaForm:false, user: req.user});
		}
	})
});

module.exports = router;