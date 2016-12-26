var express = require("express"),
    router = express.Router(),
    middleware = require("../../middleware/index"),
    Investor = require("../../models/investor");

router.get("/", middleware.isLoggedIn, function(req, res){
	Investor.getInvestorByUserId(req.user._id, function(err, investor){
			if(err) throw err;
			if(!investor) {
				res.render("investidores/portfolios/index",{isFormComplete: false, user: req.user});
			} else {
				res.render("investidores/portfolios/index",{isFormComplete: true, user: req.user});
			}
    });
});

module.exports = router;
