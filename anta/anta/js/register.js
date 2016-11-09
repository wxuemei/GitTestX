$(function() {
	//鼠标滑过客服电话链接   div透明度变化
	$(".icon .second").mouseover(function() {
		$(this).find(".phone").show();
		$(this).find(".phone").stop().animate({
			"opacity": "1"
		}, 500);
	}).mouseout(function() {
		$(this).find(".phone").stop().animate({
			"opacity": "0"
		}, 500);
		$(this).find(".phone").hide();
	})

	var username = 0;
	var timer = null;
	$("button[type=submit]").click(function() { //点击发送验证码按钮进行验证
		username = $(".username").val(); //手机号
		var re1 = /^1(3|4|5|7|8)\d{9}$/; //验证手机号
	
		if(re1.test(username)) {
			//若手机号正确：判断cookie是否有 用户信息userinfo
			if($.cookie("userinfo")) {
				var obj = JSON.parse($.cookie("userinfo"));
				if(obj["tel"+username]) { //匹配手机号   查看是否已注册
					$(".infomation").html("该手机号已注册");
				}else{
					$(this).html("验证码发送中...");
					timer = setInterval(send, 3000);
				}
			}else {
				$(this).html("验证码发送中...");
				timer = setInterval(send, 3000);
			}

		} else {
			$(".infomation").html("请输入正确的手机号");
		}

	})
	$(".username").focus(function() {
		$(".infomation").html("");
	})
	clearTimeout(timer);

	function send() {
		window.location = "register_validate.html?" + username;
	}
})