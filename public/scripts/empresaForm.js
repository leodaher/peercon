$(document).ready(function(){
    var numSocios = $("select[name='numeroSocios']");

    numSocios.change(function(){
        $('#dadosSoc').find("div.socio").remove();

        var val = $("select[name='numeroSocios']").children("option").filter(":selected").text();

        var i = 0;
        for(i = 0; i < val; i++) {
            var openDiv = "<div class='socio'>";
            var nameInput = "<label>Nome do sócio<input type='text' name='nomeSoc'></label>";
            var emailInput = "<label>E-mail do sócio<input type='text' name='emailSoc'></label>";
            var celInput = "<label>Celular do sócio<input type='text' class='celularMask' name='celularSoc'></label>";
            var closeDiv = "</div>";
            $("#dadosSoc").append(openDiv+nameInput+emailInput+celInput+closeDiv);
        }
    });

    var numGastos = $("select[name='numeroGastos']");

    numGastos.change(function(){
        $('#dadosGastos').find("div.gasto").remove();

        var val = $("select[name='numeroGastos']").children("option").filter(":selected").text();

        var i = 0;
        for(i = 0; i < val; i++) {
            var openDiv = "<div class='gasto'>";
            var valInput = "<label>Valor <input type='text' name='valorGasto'></label>";
            var finalidadeInput = "<label>Finalidade <input type='text' name='finalidadeGasto'></label>";
            var closeDiv = "</div>";
            $("#dadosGastos").append(openDiv+valInput+finalidadeInput+closeDiv);
        }
    })
});
