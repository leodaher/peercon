var mongoose = require("mongoose");

var investorSchema = new mongoose.Schema({
	name: String,
	CPF: String,
	birthday: String,
	phone: String,
	cellphone: String,
	renda: String,
	cep: String,
	logradouro: String,
	numero: String,
	complemento: String,
	cidade: String,
	estado: String,
	rg: String,
	rgverso: String,
	residencia: String,
	completedForm: Boolean,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	}
});

var Investor = module.exports = mongoose.model("Investor",investorSchema);

module.exports.createInvestor = function(newInvestor, callback){
	newInvestor.save(callback);
}

module.exports.getInvestorByUserId = function(userId, callback){
	var query = {user: userId};
	Investor.findOne(query, callback);
}