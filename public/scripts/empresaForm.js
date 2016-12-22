$(document).ready(function(){
    var numSocios = $("input[name='numeroSocios']");
    
    numSocios.blur(function(){
        var i = 0;
        for(i = 0; i < this.val(); i++) {
            $("#dadosSoc").append(")
        }
    })
});