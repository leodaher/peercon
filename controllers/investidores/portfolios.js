var express = require("express"),
    router = express.Router(),
    middleware = require("../../middleware/index"),
    Investor = require("../../models/investor");

router.get("/", middleware.isLoggedIn, function(req, res){
	Investor.getInvestorByUserId(req.user._id, function(err, investor){
			if(err) throw err;
			if(!investor) {
				res.render("portfolios",{isFormComplete: false, user: req.user});
			} else {
				res.render("portfolios",{isFormComplete: true, user: req.user});
			}
    });
});

module.exports = router;