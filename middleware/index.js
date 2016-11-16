module.exports = {
	isLoggedIn : function(req, res, next) {
		if(req.isAuthenticated()){
			return next();
		}

		req.flash("error_msg","Você não está logado!");
		res.redirect("/login");
	}
}