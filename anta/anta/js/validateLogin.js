$(function(){
	//点击退出时,退出该用户(bug：实际上并未退出@_@刷新又会显示)
	$(".top_list1").find("a").click(function(){
		//$.cookie("logined","",{expires:-1,path:'/'});
		$(".top_list1").html("<li><a href='html/login.html'>登录</a></li><li class='br_0'><a href='html/register.html' >注册</a></li>");
	})
})
