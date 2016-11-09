//鼠标滚动右侧边栏固定  主导航固定,子导航隐藏
$(".sub_item").show();
$(function(){
	$(document).scroll(function(){
		var top = $(document).scrollTop();
		if(top>=50){
			$("#slide_menu").css({"position":"fixed","top":"0"});
			$(".sub_menu").hide();
			$(".nav").addClass("light pl45");
			$(".nav .nav_list").addClass("pl255");
			$(".sub_caption").mouseover(function(){
				$(".sub_item").show();
				$(".sub_menu").mouseleave(function(){
					$(".sub_item").hide();
				});
			})
		}else{
			$("#slide_menu").css({"position":"absolute","top":"50px"});
			$(".sub_menu").show();
			$(".sub_item").show();
			$(".nav").removeClass("light pl45");
			$(".nav .nav_list").removeClass("pl255");
			$(".sub_caption").mouseover(function(){
				$(".sub_menu").show();
			}).mouseout(function(){
				$(".sub_menu").show();
			})
		}
	})
})
	