var express = require("express"),
    router = express.Router(),
    middleware = require("../../middleware/index"),
    Empresa = require("../../models/empresa.js");

router.get("/", middleware.isLoggedIn, function(req, res){
	res.render("empresas/propostas/index", {user: req.user});
});

router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("empresas/propostas/new");
});

router.post("/new", middleware.isLoggedIn, function(req, res){
  
});

module.exports = router;
