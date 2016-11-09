$(function(){
	var id = window.location.href.split(/\#/gi)[1];
	$.get("../json/detail.json",function(data){
		var x = "";//记录商品id
		$.each(data, function(index,ele) {
			var str = "";
			var str2 = "";
			var str3 = "";
			var str4 = "";
			var str5 = "";
			var str6 = "";
			var str7 = "";
			if(id == ele.pid){//比较商品id与json中商品id是否一致
				x = index ;
				var result = data[index].result;
				str4 = "<h1 class='title'><i>"+data[index].pname+"</i><span>款号:<em>"+data[index].num+"</em></span></h1>"
					  +"<a class='stars' href='##'><span>(4.9)</span></a>";
				str5 = 	"<p class='pro_price'>¥<span>"+data[index].price+"</span></p><p class='old_price'>吊牌价：<em>"+data[index].old_price+"</em><span>折扣：<i>"+data[index].discount+"</i></span></p>";
				str7 = "<dl class='b_list'>"
					  +"<dt>"+data[index].intro_title+"</dt>"
					  +"<dd>系列：<span>"+data[index].intro_type+"</span></dd>"
					  +"<dd>底料：<span>"+data[index].b_material+" 面料："+data[index].plus_material+"</span></dd>"
					  +"</dl>";
				for(var i in result){
					//中间大图
					str3 += "<img id='img"+i+"' src='"+result[i].big_img_src+"'/>";
					//右侧小图片
					str6 +="<li data-id='"+result[i].cid+"'><img data-id='"+i+"' src='"+result[i].right_img_src+"' title='"+result[i].color+"' alt='"+result[i].color+"'/></li>"
					for(var j in result[i].left_img_src){
						//左侧图片列表
						str	+= "<li><img src='"+result[i].left_img_src[j]+"' /></li>";
					}
					str2 += "<ul class='img_menu' id='menu"+i+"'>"+str+"<li></ul>";
					str="";
				}
				$(str2).insertBefore($(".down"));
				$(str3+"<img id='img_menu' src='' style='display:none'/>").appendTo($(".big_img"));
				$(str4).appendTo($(".pro_top"));
				$(str5).prependTo($(".pro_c"));
				$(str6).appendTo($(".img_list"));
				$(str7).appendTo(".pro_b");
				$(".img_menu").hide();
				$("#menu0").show();//默认显示第一个列表
				$(".big_img img").hide();
				$("#img0").show();
				$(".imgroom_pop").html($("#img0").clone());//右边放大镜盒子中的图片
			}
					
		});
		
		var flag = false;//判断右侧小图是否被点击
		var flag1 = false;//判断尺码是否被点击
		var m = "";//记录右侧所点击小图的下标
		var n = "";//记录尺码被点击的下标
		//点击右侧小图片,显示红色边框
		$(".img_list img").click(function(){
			flag = true;
			$(this).parent().addClass("current").siblings().removeClass("current");
			var data_id = $(this).attr("data-id");
			var arr_img = $(".big_img").find("img");
			$("#img"+data_id).show().siblings().hide();
			$(".imgroom_pop").html($("#img"+data_id).clone());//对应显示右侧放大镜大图
			$(".img_menu").hide();
			$("#menu"+data_id).show();
			if(flag&&flag1){
				$(".addCar").removeAttr("disabled","disabled");
			}
		})
		//************判断购物车中是否存在商品,若存在,将数量显示出来************
		if($.cookie("cart")){
							var obj = JSON.parse($.cookie("cart"));
							var total = JSON.parse($.cookie("cart"))["total"];
						}else{
							var obj = {};
							var total = 0;
				}
		$(".cart span").html(total);
		/**************************点击加入购物车,购物车数量增加
				**************	cart存储的格式:	{data-id:num,total:total}	
				*************
				**************/
		$(".addCar").click(function(){
						var data_size = x+"pro"+$(".img_list li.current").attr("data-id")+"_"+$(".size_list li.current").html();//商品id号及图片id号及尺寸
						var num = obj[data_size]||0;//某件商品的数量
						var addNum = parseInt($(".amount span").html());//添加的数量
						var img_src = $(".img_list li.current img").attr("src");//图片路径
						var data_img_src = x+"img"+$(".img_list li.current").attr("data-id");//没见商品对应尺码的标识
						var data_color = x+"color"+$(".img_list li.current").attr("data-id");
						var data_num = x+"num"+$(".img_list li.current").attr("data-id");
						var data_nprice = x+"nprice"+$(".img_list li.current").attr("data-id");
						var data_oprice = x+"oprice"+$(".img_list li.current").attr("data-id");
						var data_title = x+"title"+$(".img_list li.current").attr("data-id");
						var p_num = $(".pro_top .title span em").html();//商品编号
						var p_nprice = $(".pro_price span").html();//商品现价
						var p_oprice = $(".old_price em").html();//商品原价
						var p_title = $(".pro_top .title i").html()+"-"+p_num;
						var p_color = $(".img_list li.current img").attr("title");//商品颜色
						var p_size = $(".size_list li.current").html();//商品尺码
						//console.log(img_src,p_num,p_nprice,p_oprice,p_color,p_size);
						total = total+addNum;
						$(".cart span").html(total);
						obj[data_size] = num+addNum;
						obj[data_num] = p_num;
						obj[data_nprice] = p_nprice;
						obj[data_oprice] = p_oprice;
						obj[data_title] = p_title;
						obj[data_color] = p_color;
						obj[data_img_src] = img_src;
						obj["total"] = total;
						objStr = JSON.stringify(obj);
						//console.log(obj,objStr)
						$.cookie("cart",objStr,{expires:7,path:'/'});
						console.log($.cookie("cart"))
		})
		
		//点击尺码显示对应的库存及尺码
		$(".size_list li").click(function(){
			flag1 = true;
			n =	$(this).index();
			$(this).addClass("current").siblings().removeClass("current");
			$(".size span").html($(this).html());
			m = $(".img_list li.current").index();//获取右侧当前被点击的图片下标
			//**************如果右侧小图和尺码都被点击了,输出库存****************
			if(flag&&flag1){
				$(".size em").html(data[x].result[m].size[n])//获取所点击鞋的尺码的库存量
				$(".addCar").removeAttr("disabled","disabled");
			}
		})
		//************点击左侧小图列表，显示对应大图（若存在,则显示对应大图,若不存在,则不显示对应大图）**********/
		$(".img_menu li").click(function(){
			$(this).addClass("current").siblings().removeClass("current");
			var small_src = $(this).find("img").attr("src").split(".jpg")[0];//获取小图的src
			var s_src = small_src+"_big.jpg";
			//去左侧大图json中匹配,若匹配成功,则将大图显示在右侧
			$.get("../json/detail_left_big_img.json",function(data){
				$.each(data, function(index,ele) {
					if(s_src == ele){
						$(".big_img #img_menu").attr("src",ele).show().siblings().hide();
						$(".imgroom_pop img").attr("src",ele);
					}
				});
			})
			
		})
		//**************放大镜*************
		$(".big_img").mouseover(function(){
			$(".imgzoom_shot").show();
			$(".imgroom_pop").show();
			
		}).mouseout(function(){
			$(".imgzoom_shot").hide();
			$(".imgroom_pop").hide();
		})
		//*****************放大镜移动边界处理************************
		$(".big_img").mousemove(function(e){
					var e = e||event;
					var shotLeft = e.pageX - $(this).offset().left - $(".imgzoom_shot").outerWidth()/2;
					var shotTop = e.pageY - $(this).offset().top - $(".imgzoom_shot").outerHeight()/2;
					
					if(shotLeft <= 0){
						shotLeft = 0;
					}
					if(shotLeft >= $(this).outerWidth()-$(".imgzoom_shot").outerWidth()){
						shotLeft = $(this).outerWidth()-$(".imgzoom_shot").outerWidth();
					}
					if(shotTop<=0){
						shotTop = 0;
					}
					if(shotTop >= $(this).outerHeight()-$(".imgzoom_shot").outerHeight()){
						shotTop = $(this).outerHeight()-$(".imgzoom_shot").outerHeight();
					}
					$(".imgzoom_shot").css({
						"left":shotLeft,
						"top":shotTop
					})
					//右边盒子图片位置处理
					
					var percentX = shotLeft/($(this).outerWidth()-$(".imgzoom_shot").outerWidth());
					var percentY = shotTop/($(this).outerHeight()-$(".imgzoom_shot").outerHeight());
					var imgLeft = percentX*($(".imgroom_pop").outerWidth()-$(".imgroom_pop img").outerWidth());
					var imgTop = percentY*($(".imgroom_pop").outerHeight()-$(".imgroom_pop img").outerHeight());
					$(".imgroom_pop img").css({
						"left":imgLeft,
						"top":imgTop
					})
		})
		//点击数量出现数量列表
		$(".amount").click(function(){
			$(".count_list").show();
		})
		//点击数量后隐藏并显示点击的数量
		$(".count_list li").click(function(){
				$(".amount span").html($(this).html());
				$(".count_list").hide();
		})
		//点击立即购买，进入购物车
		$(".buy").click(function(){
			window.location = "cart.html";
		})
	})
	
})
