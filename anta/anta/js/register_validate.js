$(function(){
	//鼠标滑过客服电话链接   div透明度变化
	$(".icon .second").mouseover(function(){
		$(this).find(".phone").show();
		$(this).find(".phone").stop().animate({"opacity":"1"},500);
	}).mouseout(function(){
		$(this).find(".phone").stop().animate({"opacity":"0"},500);
		$(this).find(".phone").hide();
	})
	var tel = window.location.href.split(/\?/gi)[1];//获取手机号
	//console.log(tel)
	var timer2 = null;
	var t = 30;
	timer2 = setInterval(function(){
		t--;
		$(".show_info").val("发送中("+t+")");
		if(t<=23){
			clearInterval(timer2);
			//显示验证码
			$(".show_info").addClass("bg");
			random_validate();
		}
	},1000)
	//点击切换验证码
	$(".show_info").click(function(){
		random_validate();
	})
	//随机产生验证码
	function random_validate(){
		var arr = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","0","1","2","3","4","5","6","7","8","9"];
		var str = "";
		//四位验证码
		for(var i = 0;i<4;i++){
			var index = parseInt(Math.random()*arr.length);
			str+=arr[index];
		}
		$(".show_info").val(str);
	}
	//点击确定按钮判断验证码是否相等
	var timer3 = null;
	$(".goto").click(function(){
		console.log($(".show_info").val());
		//如果相等
		if($(".yanzhengma").val() == $(".show_info").val()){
			$(".infomation2").html("验证成功");
			timer3 = setInterval(send2,3000)
		}else{
			$(".infomation2").html("验证码填写错误");
		}
	})
	
	$(".yanzhengma").focus(function(){
		$(".infomation2").html("");
	})
	clearInterval(timer3);
	//域名重定向
	function send2(){
		window.location = "setPassword.html?"+tel;
	}
	//获取到注册的手机号
	//JSON.parse($.cookie("user"))["user"]
})
