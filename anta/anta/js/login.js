$(function(){
	//登录验证
	$("button[type=submit").click(function(){
		var username = $(".username").val();//用户登录输入的用户名
		var password = $(".password").val();//用户登录输入的密码
		//判断cookie是否存在
		if($.cookie("userinfo")){
			var obj = JSON.parse($.cookie("userinfo"));
			/*判断用户名密码是否相等*/
			if(obj["user"+username]){
				if(obj["user"+username]==password){
					window.location = "../index.html";
					$.cookie("logined",username,{expires:7,path:'/'});
				}else{
					$(".infomation").html("<h2>密码不匹配</h2>");
				}
			}else{
				$(".infomation").html("<h2>用户名不存在</h2>");
			}
		}else{
				$(".infomation").html("<h2>用户不存在</h2>");
		}
		$(".username").focus(function(){
			$(".infomation").html("");
		})
		$(".password").focus(function(){
			$(".infomation").html("");
		})
	})
	//客服电话滑过显示
	$(".icon .second").mouseover(function(){
		$(this).find(".phone").stop().fadeIn(500);
	}).mouseout(function(){
		$(this).find(".phone").stop().fadeOut(500);
	})
})
