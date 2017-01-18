$(document).ready(function(){
    var numSocios = $("select[name='numeroSocios']");

    numSocios.change(function(){
        $('#dadosSoc').find("div.socio").remove();

        var val = $("select[name='numeroSocios']").children("option").filter(":selected").text();

        var i = 0;
        for(i = 0; i < val; i++) {
            var openDiv = "<div class='input-outer col-xs-12 socio'><div class='form-group'><div class='input-group'>";
            var nameInput = "<div class='input-group-addon'><i class='fa fa-lock'></i></div><input type='text' class='form-control' name='nomeSoc' placeholder='Nome do sócio #"+(i+1)+"'>";
            var emailInput = "<div class='input-group-addon'><i class='fa fa-lock'></i></div><input type='text' class='form-control' name='emailSoc' placeholder='E-mail do sócio #"+(i+1)+"'>";
            var celInput = "<div class='input-group-addon'><i class='fa fa-lock'></i></div><input type='text' class='form-control celularMask' name='celularSoc' placeholder='Celular do sócio #"+(i+1)+"'>";
            var closeDiv = "</div></div></div>";
            $("#dadosSoc").append(openDiv+nameInput+closeDiv+openDiv+emailInput+closeDiv+openDiv+celInput+closeDiv);
        }
    });

    var numGastos = $("select[name='numeroGastos']");

    numGastos.change(function(){
        $('#dadosGastos').find("div.gasto").remove();

        var val = $("select[name='numeroGastos']").children("option").filter(":selected").text();

        var i = 0;
        for(i = 0; i < val; i++) {
            var openDiv = "<div class='input-outer col-xs-12 gasto'><div class='form-group'><div class='input-group'>";
            var valInput = "<div class='input-group-addon'><i class='fa fa-lock'></i></div><input type='text' class='form-control moneyMask' name='valorGasto' placeholder='Valor do gasto #"+(i+1)+"'>";
            var finalidadeInput = "<div class='input-group-addon'><i class='fa fa-lock'></i></div><input type='text' class='form-control' name='finalidadeGasto' placeholder='Finalidade do gasto #"+(i+1)+"'>";
            var closeDiv = "</div></div></div>";
            $("#dadosGastos").append(openDiv+valInput+closeDiv+openDiv+finalidadeInput+closeDiv);
        }
    })
});
