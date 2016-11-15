var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
	name: String,
	address: String,
	email: String,
	phone: String,
	password: String
});

module.exports = mongoose.model("User", userSchema);