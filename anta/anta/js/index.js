$(function(){
	console.log($.cookie("userinfo"))
	//判断是否登陆过,若登录过则将用户名显示在界面上
	if($.cookie().logined){
		var user = $.cookie("logined");//获取已登录的用户名
		$(".top_list1").html("<p>欢迎您,"+user+"!<a href='javascript:;'>退出</a></p>");
	}
	//判断购物出中是否存在商品
	if($.cookie("cart")){
		var total = JSON.parse($.cookie("cart"))["total"];
		$(".cart a span").html(total);
	}else{
		$(".cart a span").html(0);
	}
	//点击退出时,退出该用户
	$(".top_list1").find("a").click(function(){
		$.removeCookie("logined",{expires:-1,path:'/'});
		$(".top_list1").html("<li><a href='html/login.html'>登录</a></li><li class='br_0'><a href='html/register.html' >注册</a></li>");
	})
	//鼠标滑过手机商城时出现二维码图片
	$(".top_list2 .phone").mouseover(function(){
		$(this).find(".ewm").show();
	}).mouseout(function(){
		$(this).find(".ewm").hide();
	})
	//控制主导航下的div显示与隐藏    ****************************未完待续！！
	$(".nav_list li").mouseover(function(){
//		if($(this).index()>0&&$(this).index()<$(".nav_list li").length-2){
//			if($("#sub_nav").outerWidth()+$(this).find(".list_item").outerWidth()+$(this).outerWidth()*$(this).index()+parseInt($(this).find(".list_item").css("left"))>$("#nav").outerWidth()){
//				console.log($(this).outerWidth()*$(this).index())
//				$(this).find(".list_item").css("left",-($(this).outerWidth()*$(this).index())+299);
//			}
//		}
		$(this).find(".list_item").show();
	}).mouseout(function(){
		$(this).find(".list_item").hide();
	})
	//装备区图片鼠标滑过时向上运动
	$(".zb a").mouseover(function(){
		$(this).find("img").stop().animate({"marginTop":"-10px"},300);
	}).mouseout(function(){
		$(this).find("img").stop().animate({"marginTop":"0"},300);
	})
	//回到顶部
	$("#return_top").click(function(){
		$('html,body').animate({"scrollTop":$("#header").offset().top},600);
	})
	//我的收藏,二维码,最近浏览,联系电话
	$(".c_hover").mouseover(function(){
		$(this).find("div").stop().fadeIn(500);
	}).mouseout(function(){
		$(this).find("div").stop().fadeOut(500);
	})
})

