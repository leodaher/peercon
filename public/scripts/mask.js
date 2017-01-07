$(document).ready(function(){
	var cpf = $(".cpfMask");
	var data = $(".dataMask");
	var telefone = $(".telefoneMask");
	var celular = $(".celularMask");
	var money = $(".moneyMask");
	var cep = $(".cep");
	var logradouro = $(".logradouro");
	var cidade = $(".city");
	var estado = $(".state");
  var rg = $(".rg");

    // Máscara RG
    rg.keyup(function(key){
        var code = key.keyCode;
        var len = rg.val().length;
        if((len == 2 || len == 6) && code != 8) {
            rg.val(rg.val()+'.');
        }

        else if(len == 10 && code != 8) {
            rg.val(rg.val()+'-');
        }
    })

	// Máscara CPF
	cpf.keyup(function(key){
		var code = key.keyCode;
		var len = cpf.val().length;
		if((len == 3 || len == 7) && code != 8) {
			cpf.val(cpf.val()+'.');
		}

		else if(len == 11 && code != 8) {
			cpf.val(cpf.val()+'-');
		}
	});

	// Máscara Data
	data.keyup(function(event){
		var code = event.keyCode;
		if(code != 8) {
			var len = data.val().length;
			if(len == 2 || len == 5) {
				data.val(data.val()+'/');
			}
		}
	});

	// Máscara Telefone Fixo
	telefone.keyup(function(event){
		var code = event.keyCode;
		if(code != 8) {
			var len = $(this).val().length;
			if(len == 1) {
				var tmp = $(this).val()[0];
				$(this).val('('+tmp);
			}

			else if(len == 3) {
				$(this).val($(this).val()+') ');
			}

			else if(len == 9) {
				$(this).val($(this).val()+'-');
			}
		}
	});

	// Máscara Celular
	celular.keyup(function(event){
		var code = event.keyCode;
		if(code != 8) {
			var len = $(this).val().length;
			if(len == 1) {
				var tmp = $(this).val()[0];
				$(this).val('('+tmp);
			}

			else if(len == 3) {
				$(this).val($(this).val()+') ');
			}

			else if(len == 10) {
				$(this).val($(this).val()+'-');
			}
		}
	});

	// Máscara Renda
	money.maskMoney({prefix:'R$ ', allowNegative: true, thousands:'.', decimal:',', affixesStay: true});

	// Autocomplete CEP
	cep.blur(function(){
		var cepval = this.value.replace(/[^0-9]/,"");
		if(cepval.length != 8){
			return false;
		}

		var url = "http://viacep.com.br/ws/"+cepval+"/json/";

		$.getJSON(url, function(dados){
			logradouro.val(dados.logradouro);
			cidade.val(dados.localidade);
			estado.val(dados.uf);
		});
	});
});
