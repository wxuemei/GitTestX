$(function(){
	$.get("json/carousel.json",function(data){
		//console.log(data);
		$.each(data, function(index,element) {
			//console.log(index,element)
			$("<li><a href='' style='background:url("+element.img_src+") center no-repeat'></a></li>").appendTo("#carousel ul");
			$("<a href='javascript:;'>"+element.title+"</a>").appendTo(".slide_nav");
		})
		$("#carousel li:first").clone().appendTo("#carousel ul");//复制第一个到尾部
		var len = $("#carousel li").length;
		$(".slide_nav a").css("width",$(".slide_nav").outerWidth()/(len-1)-1);//显示图片信息的角标   有1像素右边距,所以减一
		var perWidth = $("#carousel li").outerWidth();
		var i = 0;
		$("#carousel li").css("width",perWidth);//设置li的宽度
//		console.log(perWidth)
		$("#carousel ul").css("width",perWidth*len);//设置ul的宽度
		$(".slide_nav a").eq(0).addClass("cur");
		var timer = setInterval(move,5000);//自动轮播
		function move(){
			i++;
			if(i==len){
				i = 1;
			}
			if(i==len-1){
				$(".slide_nav a").eq(0).addClass("cur").siblings().removeClass();
			}
			if(i<0){
				i = len-2;
				$("#carousel ul").css("margin-left",-perWidth*(i+1));
			}
			$(".slide_nav a").eq(i).addClass("cur").siblings().removeClass();
			$("#carousel ul").css("margin-left",-perWidth*i);
			$("#carousel ul").stop().animate({"opacity":.1},10,function(){
					$("#carousel ul").animate({"opacity":1});
			})
		}
		$("#prev img").click(function(){//上一张
			clearInterval(timer);
			i -= 2;
			move();
			timer = setInterval(move,5000);
		})
		$("#next img").click(function(){//下一张
			clearInterval(timer);
			move();
			timer = setInterval(move,5000);
		})
//		$(".slide_nav a").on("mousedown",function(){
//			clearInterval(timer);
//			//$(this).eq(0).addClass("cur").siblings().removeClass();
////			i = $(this).index()-1;
////			move();
////			timer = setInterval(move,5000);
//		})
		$(".slide_nav a").click(function(){//需在a标签的href中添加javascript:;才能保证不刷新能点击
			clearInterval(timer);
			i = $(this).index()-1;
			move();
			timer = setInterval(move,5000);
		})
	})
})
