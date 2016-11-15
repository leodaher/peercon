$(document).ready(function(){
	var emailValid = false;
	var passValid = false;

	var emailInput = $("input[type='email']");
	emailInput.change(function(){
		if(emailInput.val() == "") {
			emailValid = false;
			emailInput.removeClass("valid");
			emailInput.addClass("invalid");
		}
		else{
			$.post("/checkEmail", {email: emailInput.val()}, function(data){
				if(data.userExists) {
					emailValid = false;
					emailInput.removeClass("valid");
					emailInput.addClass("invalid");
				} else {
					emailValid = true;
					emailInput.removeClass("invalid");
					emailInput.addClass("valid");
				}
			});
		}
	});

	$("#registerForm").submit(function(event){
		if(!emailValid) {
			event.preventDefault();
		}
		
		var nameAdressPhone = $("input[type='text'],textarea");
		nameAdressPhone.each(function(){
			if($(this).val() == "") {
				$(this).removeClass("valid");
				$(this).addClass("invalid");
				event.preventDefault();
			} else {
				$(this).removeClass("invalid");
				$(this).addClass("valid");
			}
		});

		var others = $("input");
		others.each(function(){
			if($(this).val() == "") {
				$(this).removeClass("valid");
				$(this).addClass("invalid");
				event.preventDefault();
			}
		});

		var pass = $("input[name='password']");
		var repass = $("input[name='repassword']");

		if(pass.val().length < 6) {
			event.preventDefault();
			pass.addClass("invalid");
			pass.removeClass("valid");
		} else {
			pass.addClass("valid");
			pass.removeClass("invalid");
		}

		if(repass.val() != pass.val() || repass.val() == ""){
			event.preventDefault();
			repass.addClass("invalid");
			repass.removeClass("valid");
		} else {
			repass.addClass("valid");
			repass.removeClass("invalid");
		}
	});
});