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
        patrimonio: String,
        cep: String,
        logradouro: String,
        numero: String,
        complemento: String,
        cidade: String,
        estado: String
    },
    pessoaJuridica: {
        papel: String,
        CNPJ: String,
        nomeFantasia: String,
        simplesNacional: String,
        inscricaoEstadual: String,
        funcionarios: String,
        telefone: String,
        telefone2: String,
        site: String,
        facebook: String,
        linkedin: String,
        outraRede: String,
        cep: String,
        logradouro: String,
        numero: String,
        complemento: String,
        cidade: String,
        estado: String,
        dadosSocios: {
            numeroSocios: String,
            nomes: [String],
            emails: [String],
            celulares: [String]
        }
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