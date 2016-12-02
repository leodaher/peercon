$(document).ready(function(){
	$(".done").click(function(){
		var this_li_ind = $(this).parent().parent("li").index();
		if($('.payment-wizard li').hasClass("jump-here")){
			$(this).parent().parent("li").removeClass("active").addClass("completed");
			$(this).parent(".wizard-content").slideUp();
			$('.payment-wizard li.jump-here').removeClass("jump-here");
		}else{
			$(this).parent().parent("li").removeClass("active").addClass("completed");
			$(this).parent(".wizard-content").slideUp();
			$(this).parent().parent("li").next("li:not('.completed')").addClass('active').children('.wizard-content').slideDown();
		}
	});
	
	$('.payment-wizard li .wizard-heading').click(function(){
		if($(this).parent().hasClass('completed')){
			var this_li_ind = $(this).parent("li").index();		
			var li_ind = $('.payment-wizard li.active').index();
			if(this_li_ind < li_ind){
				$('.payment-wizard li.active').addClass("jump-here");
			}
			$(this).parent().addClass('active').removeClass('completed');
			$(this).siblings('.wizard-content').slideDown();
		}
	});
})