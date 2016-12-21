var mongoose = require("mongoose");

var empresaSchema = new mongoose.Schema({
    pessoaFisica: {
        nome: String,
        dataNasc: String,
        CPF: String,
        RG: String,
        orgaoEmissor: String,
        cidadeNatal: String,
        telefone: String,
        celular: String,
        politicamenteExp: String,
        aluguel: String,
        renda: String,
        patrimonio: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

var Empresa = module.exports = mongoose.model("Empresa",empresaSchema);

module.exports.createEmpresa = function(newEmpresa, callback){
	newEmpresa.save(callback);
}