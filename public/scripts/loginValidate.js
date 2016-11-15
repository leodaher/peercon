$(document).ready(function(){ 
    $(".icon").click(function() {
        $(".header-login-signup").toggleClass("responsive");
    });
    $('a.login-window').click(function() {
        
                //Getting the variable's value from a link 
        var loginBox = $(this).attr('href');

        //Fade in the Popup
        $(loginBox).fadeIn(300);
        
        //Set the center alignment padding + border see css style
        
        var popMargTop = ($(loginBox).height()) / 2; 
        var popMargLeft = ($(loginBox).width()) / 2; 
        
        $(loginBox).css({ 
            'margin-top' : -popMargTop,
            'margin-left' : -popMargLeft
        });
        
        // Add the mask to body
        $('body').append('<div id="mask"></div>');
        $('#mask').fadeIn(300);
        
        return false;
    });

    $('.form-style h1 span').click(function() { 
        $("#login-box").fadeOut(300, function(){
            $("#mask").remove(); 
        });
    });

    $("#loginForm").submit(function(){
        event.preventDefault();
        var email = $("input[name='email']").val();
        var pass = $("input[name='password']").val();

        $.post("/checkLogin", {email: email, pass: pass}, function(data, event){
            if(data.userExists == true) {
                $("#loginForm").trigger("submit");
            }
        });

    });
});