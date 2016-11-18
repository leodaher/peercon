var mongoose = require("mongoose");

var investorSchema = new mongoose.Schema({
	name: String,
	CPF: String,
	birthday: Date,
	phone: String,
	cellphone: String,
	address: String,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	}
});

module.exports = mongoose.model("Investor",investorSchema);