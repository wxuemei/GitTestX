$(function(){
	//获取图片列表数据
	var str = window.location.href.split("#")[1];
	$.get("../json/shopping_list.json",function(data){
		var str = "";
		var str2 = "";
	//点击退出时退出该用户
	$(".top_list1").find("a").click(function(){
		$.removeCookie("logined",{expires:-1,path:'/'});
		$(".top_list1").html("<li><a href='login.html'>登录</a></li><li class='br_0'><a href='register.html' >注册</a></li>");
	})


		$.each(data,function(index,obj){
				//遍历li下的ul中的图片信息
				for(var i in obj.small_img.small_id){
						str2 += "<li><a target='_blank' href='detail.html#"+index+"'><img id='"+obj.small_img.small_id[i]+"' alt='"+obj.small_img.c_intro[i]+"' title='"+obj.small_img.c_intro[i]+"' class='colorimg loading'  src='"+obj.small_img.img_src[i]+"'></a></li>";
					}
				str += "<li class='pro_item' id='"+index+"'>" 
					  +"<div class='pro_info'>"
					  +"<a class='pro_like'><i></i>关注</a>"
					  +"<a class='pro_img' href='detail.html#"+index+"' target='_blank'> <img id='"+obj.id+"' src='"+obj.big_img+"' alt='"+obj.title+"' class='loading'></a>"
					  +"<div class='pro_scroll'>"
					  +"<div class='pro_wrap current'>"
					  +"<ul>"+str2+"</ul>"
					  +"</div></div>"
					  +"<div class='pro_price'>"
					  +"<span>￥<b>"+obj.price+"</b></span>"
					  +"<div class='pro_mark'>"
					  +"<span>满减</span>"
					  +"</div></div>"
					  +"<p class='pro_title'>"
					  +"<a target='_blank' href='detail.html#"+index+"'>"+obj.title+"</a>"
					  +"</p></div></li>";
					   str2 = "";
					   $(str).appendTo(".pro_list");
						str = "";
			
		})
			//数据分页
				var total = data.length;//总数105
				var perPage = 20;//每页20个
				var pageCount = Math.ceil(total/perPage);//页数
				var index = 0;
				$(".s_sort b").html(total);
				$(".filter_page em").html(pageCount);
				function divide(n){
					index = n;
					$(".pro_list .pro_item").hide();
					for(var i = n*perPage;i<Math.min((n+1)*perPage,total);i++){//每一页的图所对应的下标		
								$("#"+i).show();
					}
				}
				divide(0);//默认显示第一页
				for(var i = 0;i<pageCount;i++){
						str2 += "<button>"+(i+1)+"</button>";
				}
					$(".btn").append(str2);
					$("<input type='button' value='上一页' />").prependTo(".btn");
					$("<input type='button' value='下一页' />").appendTo(".btn");
					$("<p>向第<input type='text'/>页<a href='javascript:;'>跳转</a></p>").appendTo(".btn");
					$(".btn button:first").addClass("active");
					$(".btn button").click(function(){//分页显示每一页的内容
						$(this).addClass("active").siblings().removeClass("active");
						var t = $(this).index()-1;
						divide(t);
						return false;
					})
				//上一页
				$(".btn input[type=button]:first,.filter_page .page_n").click(function(){
						if(index<=0){
							index = 0;
							divide(index);
						}else{
							divide(index-1);
							$(".btn button").eq(index).addClass("active").siblings().removeClass("active");
						} 
						$(".filter_page span b").html($(".btn .active").html());
				})
				//下一页
				$(".btn input[type=button]:last,.filter_page .page_p").click(function(){
						if(index>=pageCount-1){
							divide(index);
						}else{
							divide(index+1);
							$(".btn button").eq(index).addClass("active").siblings().removeClass("active");
						} 
						$(".filter_page span b").html($(".btn .active").html());
				})
				//跳转到第几页
				$(".btn p a").click(function(){
					var num = $(this).prev().val();
					console.log(num)
					if(num>=0&&num<=pageCount){
						divide(num-1);
						$(".btn button").eq(num-1).addClass("active").siblings().removeClass("active");
						$(".pro_list").show();
						$(".list_box").find("h1").hide();
					}else{
						$(".pro_list").hide();
						$(".list_box").find("h1").show();
					}
				})
		//判断小图个数是否大于5,若大于则添加左右按钮
		$.each($(".pro_wrap ul"),function(index){
			if($(this).find("li").length>5){
				$("<span class='pro_prev'>&lt;</span><span class='pro_next'>&gt;</span>").prependTo($(this).parent().parent());
				$(this).parent().parent().addClass("current");
			}
		})
		//点击左按钮时,显示前一张
				$(".pro_prev").click(function(){
					var t =parseInt($(this).parent().find(".pro_wrap ul").css("marginLeft"));
					if(t!=0){
						$(this).parent().find(".pro_wrap ul").stop().animate({"marginLeft":t+35+"px"},500)
					}
				})
				//点击右按钮时,显示后一张
				$(".pro_next").click(function(){
						console.log(parseInt($(this).parent().find(".pro_wrap ul").css("marginLeft")))
						var n = $(this).parent().find(".pro_wrap ul li").length - 5;
						var t =parseInt($(this).parent().find(".pro_wrap ul").css("marginLeft"));
						if(t>-n*35){
							$(this).parent().find(".pro_wrap ul").stop().animate({"marginLeft":t-35+"px"},500)
						}	
				})
		//滑过列表中小图   显示大图
		var bigImg_src = [];
		$(".pro_wrap ul li").mouseenter(function(){
			var img_id = $(this).find("img").attr("id");//获取小图的id即小图src地址
			bigImg_src.push($(this).parent().parent().parent().parent().find(".pro_img img").attr("src"));//获取大图的初始src,要保持这个值不变
			$(this).parent().parent().parent().parent().find(".pro_img img").attr("src","../images/"+img_id+"_big.jpg");
			$(this).parent().parent().parent().parent().mouseleave(function(){
				$(this).find(".pro_img img").attr("src",bigImg_src[0]);
				bigImg_src = [];//清空数组,以便记录滑过的每一个li的初始bigImg_src
			})
		})
		
	})
	
	$(".top_list1").find("a").click(function(){
		//$.cookie("logined","",{expires:-1,path:'/'});
		$(".top_list1").html("<li><a href='html/login.html'>登录</a></li><li class='br_0'><a href='html/register.html' >注册</a></li>");
	})
})