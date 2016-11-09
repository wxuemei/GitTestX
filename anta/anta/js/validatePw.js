$(function(){
	//验证setPassword的正确性
	$(".goto").click(function(){
		/*密码长度8-16位,数字，字母，字符至少包含两种*/
		var re = /((?=.*\d)(?=.*\D)|(?=.*[a-zA-Z])(?=.*[^a-zA-Z]))^.{8,16}$/;
		var re1 = /^[a-z0-9_-]{3,16}$/;//用户名正则
		var username = $(".username").val();//用户名
		var pw = $(".password").val();//密码
		var timer = null;
		if(!re1.test(username)){
			$(".infomation2").html("用户名长度3-16位，以数字，字母或者下划线开头");
			
		}
		else if(!re.test(pw)){
			$(".infomation2").html("密码长度8-16位,数字，字母，字符至少包含两种");
		}else{
			//如果cookie存在
			if($.cookie("userinfo")){
				var obj = JSON.parse($.cookie("userinfo"));
				//判断该用户名是否存在
				if(obj["user"+username]){
					$(".infomation2").html("该用户名已注册,请重新输入");
				}else{
					var tel = window.location.href.split(/\?/gi)[1];//获取手机号
					obj["tel"+tel] = tel;
					obj["user"+username] = pw;
					var objStr = JSON.stringify(obj);
					$.cookie("userinfo",objStr,{expires:7,path:'/'});
					$(".infomation2").html("登录成功");
					
					$.cookie("logined",username,{expires:7,path:'/'})
					timer = setInterval(send,3000)
				}
			}else{
					var obj = {};
					var tel = window.location.href.split(/\?/gi)[1];//获取手机号
					obj["tel"+tel] = tel;
					obj["user"+username] = pw;
					var objStr = JSON.stringify(obj);
					$.cookie("userinfo",objStr,{expires:7,path:'/'});
					$(".infomation2").html("登录成功");
					
					$.cookie("logined",username,{expires:7,path:'/'})
					timer = setInterval(send,3000)
			}
		}
		return false;
	})
	function send(){
		window.location = "../index.html";
	}
	$("input").focus(function(){
			$(".infomation2").html("");
		})
})
