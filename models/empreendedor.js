var mongoose = require("mongoose");

var empreendedorSchema = new mongoose.Schema({
	CPF: String,
	birthday: String,
	CNPJ: String,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	}
});

var Empreendedor = module.exports = mongoose.model("Empreendedor",empreendedorSchema);

module.exports.createEmpreendedor = function(newEmpreendedor, callback){
	newEmpreendedor.save(callback);
}

module.exports.getEmpreendedorByUserId = function(userId, callback){
	var query = {user: userId};
	Empreendedor.findOne(query, callback);
}