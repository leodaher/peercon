var express = require("express"),
    router = express.Router(),
    middleware = require("../../middleware/index"),
    Empresa = require("../../models/empresa.js");

router.get("/", middleware.isLoggedIn, function(req, res){
	res.render("propostas", {user: req.user});
});

module.exports = router;