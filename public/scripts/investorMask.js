$(document).ready(function(){
	var cpf = $("input[name='cpf']");
	var data = $("input[name='date']");
	var telefone = $("input[name='telephone']");
	var celular = $("input[name='cellphone']");
	var renda = $("input[name='renda']");
    var patrimonio = $("input[name='patrimonio']");
	var cep = $("input[name='cep']");
	var logradouro = $("input[name='logradouro']");
	var cidade = $("input[name='city']");
	var estado = $("input[name='state']");
    var rg = $("input[name='rg']");
    
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
			var len = telefone.val().length;
			if(len == 1) {
				var tmp = telefone.val()[0];
				telefone.val('('+tmp);
			}

			else if(len == 3) {
				telefone.val(telefone.val()+') ');
			}

			else if(len == 9) {
				telefone.val(telefone.val()+'-');
			}
		}
	});

	// Máscara Celular
	celular.keyup(function(event){
		var code = event.keyCode;
		if(code != 8) {
			var len = celular.val().length;
			if(len == 1) {
				var tmp = celular.val()[0];
				celular.val('('+tmp);
			}

			else if(len == 3) {
				celular.val(celular.val()+') ');
			}

			else if(len == 10) {
				celular.val(celular.val()+'-');
			}
		}
	});
	
	// Máscara Renda
	renda.maskMoney({prefix:'R$ ', allowNegative: true, thousands:'.', decimal:',', affixesStay: true});
    patrimonio.maskMoney({prefix:'R$ ', allowNegative: true, thousands:'.', decimal:',', affixesStay: true});
    
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