$(function(){
	//判断是否登陆过,若登录过则将用户名显示在界面上
	if($.cookie().logined){
		var user = $.cookie("logined");//获取已登录的用户名
		$(".head_list1").html("<li>欢迎您,"+user+"!<a class='close' href='javascript:;'>退出</a></li>");
	}
	//点击退出时
	$(".head_list1").find("a").click(function(){
		$.removeCookie("logined",{expires:-1,path:'/'});
		$(".head_list1").html("<li><a href='login.html'>请登录</a></li><li><a href='register.html'>免费注册<span>即送20优惠券</span></a></li>");
	})
	//
	if($(".tab tbody .shop_list")){
		$("#my_cart .cart_box").show().siblings().hide();
	}else{
		$("#my_cart .cart_box").hide().siblings().show();
	}
	//若购物车中有商品,显示购物车中商品信息
	if($.cookie("cart")){
		
		var arr = [39,40,40.5,41,42,42.5,43,44.5];
		$.get("../json/detail.json",function(data){
			$.each(data,function(index,ele){
				for(var i in data[index].result){
					var t = ele.pid+"img"+data[index].result[i].cid;
					var str = "";
					//console.log(t,JSON.parse($.cookie("cart"))["0img01"]);
					//console.log(t)
					if(JSON.parse($.cookie("cart"))[t]){
						//console.log(1)
						var p_color = ele.pid+"color"+data[index].result[i].cid;//cookie中的
						var p_title = ele.pid+"title"+data[index].result[i].cid;
						var p_num = ele.pid+"num"+data[index].result[i].cid;
						var p_oprice = ele.pid+"oprice"+data[index].result[i].cid;
						var p_nprice = ele.pid+"nprice"+data[index].result[i].cid;
						for(var j in arr){
								var p_size = ele.pid+"pro"+data[index].result[i].cid+"_"+arr[j];
								if(JSON.parse($.cookie("cart"))[p_size]){
									str +=	"<tr class='shop_list' id='"+ele.pid+"_"+data[index].result[i].cid+"_"+arr[j]+"'>"
									+"<td  class='w50'><input type='checkbox' class='ck'/></td>"
									+"<td  class='w80'><img src='"+JSON.parse($.cookie("cart"))[t]+"'/></td>"
									+"<td  class='w120'>"+JSON.parse($.cookie("cart"))[p_num]+"</td>"
									+"<td  class='w290 p_info'><h2><a href='javascript:;'>"+JSON.parse($.cookie("cart"))[p_title]+"</a></h2><span>颜色:<em>"+JSON.parse($.cookie("cart"))[p_color]+"</em> 尺码:<i>"+arr[j]+"</i></span></td>"
									+"<td  class='w150'><span class='o_price'>¥<em>"+JSON.parse($.cookie("cart"))[p_oprice]+"</em></span><i class='n_price'>¥<em>"+JSON.parse($.cookie("cart"))[p_nprice]+"</em></i></td>"
									+"<td  class='w200'>"
									+"<button class='down'>-</button>"
									+"<input class='p_num' type='text' value='"+JSON.parse($.cookie("cart"))[p_size]+"' readonly='readonly' />"
									+"<button class='up'>+</button>"
									+"</td>"
									+"<td  class='p_jifen w80'>"+JSON.parse($.cookie("cart"))[p_size]*JSON.parse($.cookie("cart"))[p_nprice]+"</td>"
									+"<td  class='w80'><a class='delete' href='javascript:;'>删除</a></td>"
									+"</tr>";
									$(str).prependTo(".tab tbody");
									//$(".pay .total em").html(total);
									str = "";
								}
						}
					}	
				}
			})
		
			var len = $("tbody .shop_list").length;
			function allSelect(){
				for(var i = 0;i<len;i++){
					//****每个checkbox添加onchange事件******
					$($(".ck")[i]).change(function(){
						var flag= true;
							for(var i = 0;i<len;i++){
								//如果存在未选中的多选框,则全选不选中
								if($(".ck")[i].checked==false){
									flag = false;
									break;
								}
							}
						//如果ck全选中了,则全选选中
						if(flag){
							$("#allChecked")[0].checked = true;
						}else{
							$("#allChecked")[0].checked = false;
						}
						/*保留两位小数*/
						var sum = getTotal().toFixed(2);
						$(".pay .total em").html(sum);		
					})	
				}
			}
			allSelect();
			//*******获取总金额*********
			function getTotal(){
				var sum = 0;
				for(var i = 0;i<len;i++){		
					if($(".ck")[i].checked){
						//每件商品的总积分之和
						sum += parseInt($($(".p_jifen")[i]).html());
					}		
				}		
				return sum;
			}
			//*********全选是否被选中*********
			$("#allChecked").change(function(){
				//******被选中   下面所有ck被选中*******
				if($(this).get(0).checked){
					for(var i = 0;i<len;i++){
						$(".ck")[i].checked = true
							var sum = getTotal().toFixed(2);
							$(".pay .total em").html(sum);		
					}
				}else{
					for(var i = 0;i<len;i++){
						$(".ck")[i].checked = false;
						$(".pay .total em").html(0);
					}
				}
			})
			//******点击+号商品数量增加*********
			 for(var i = 0;i<len;i++){
			 	$($(".up")[i]).click(function(){
			 		var count = parseInt($(this).prev().get(0).value);
			 		$(this).prev().get(0).value = count + 1;	
			 		var price = $(this).parent().prev().find("i").find("em").html();
			 		//**该商品的总价格即积分改变**
			 		$(this).parent().next().html(price*parseInt($(this).prev().get(0).value));
			 		var sum = getTotal();
					$(".pay .total em").html(sum);
						/*更新cookie值*/
					var obj = JSON.parse($.cookie("cart"));
					var id = $(this).parent().parent().attr("id");
					//console.log(id)
					var pro_pid = id.split(/\_/gi)[0];//取得pid
					var pro_cid = id.split(/\_/gi)[1];//取得cid
					var pro_size = id.split(/\_/gi)[2];//取得尺寸
					console.log(pro_pid,pro_cid,pro_size)
					//将该商品的数量增加1
						obj[pro_pid+"pro"+pro_cid+"_"+pro_size] = obj[pro_pid+"pro"+pro_cid+"_"+pro_size]+1;
						//总数减1
						obj["total"]++;
						//存入cookie中
						var objStr = JSON.stringify(obj);
						$.cookie("cart",objStr,{expires:7,path:'/'})
						delete obj[pro_pid+"pro"+pro_cid+"_"+pro_size];
				})
			 
			 }	
			//**********点击-号商品数量减少*********
			  for(var i = 0;i<len;i++){
			 	$($(".down")[i]).click(function(){
			 		var count = parseInt($(this).next().get(0).value);
			 		$(this).next().get(0).value = count - 1;
			 		if($(this).next().get(0).value<=1){
			 			$(this).next().get(0).value = 1;
			 		}
			 		//*******该商品的总价格即积分改变*********
			 		var price = $(this).parent().prev().find("i").find("em").html();
			 		$(this).parent().next().html(price*parseInt($(this).next().get(0).value));
					/*更新cookie值*/
					var obj = JSON.parse($.cookie("cart"));
					var id = $(this).parent().parent().attr("id");
					//console.log(id)
					var pro_pid = id.split(/\_/gi)[0];//取得pid
					var pro_cid = id.split(/\_/gi)[1];//取得cid
					var pro_size = id.split(/\_/gi)[2];//取得尺寸
					/*********最少不能少于一双******/
					if(obj[pro_pid+"pro"+pro_cid+"_"+pro_size]<=1){
						obj[pro_pid+"pro"+pro_cid+"_"+pro_size] = 1;
					}else{
						//****************将该商品的数量减去1************
						obj[pro_pid+"pro"+pro_cid+"_"+pro_size] = obj[pro_pid+"pro"+pro_cid+"_"+pro_size]-1;
						//总数减1
						obj["total"]--;
						//*******存入cookie中**************
						var objStr = JSON.stringify(obj);
						//console.log(objStr)
						$.cookie("cart",objStr,{expires:7,path:'/'})
						//console.log($.cookie("cart"));
						
					}
					
				})
			 
			 }
			  //清空购物车
				$(".clearPro a").click(function(){
					//******删除cookie**********
					$.removeCookie("cart",{path:'/'});
					window.location.href = "cart.html";
				})
			  //**********删除商品**************
			  for(var i = 0;i<len;i++){
			  	$($(".delete")[i]).click(function(){
			  		$(this).parent().parent().remove();
			  		//console.log(JSON.parse($.cookie("cart")))
			  		//获取到cookie--cart
			  		var obj = JSON.parse($.cookie("cart"));
			  		var id= $(this).parent().parent().attr("id");
			  		var pro_pid = id.split(/\_/gi)[0];//取得pid
					var pro_cid = id.split(/\_/gi)[1];//取得cid
					var pro_size = id.split(/\_/gi)[2];//取得尺寸
					/*******商品总数改变为原总数减去该商品的数量*******/
					obj["total"] = obj["total"] - obj[pro_pid+"pro"+pro_cid+"_"+pro_size];
					/*******删除cookie对象中与该商品有关的所有属性********/
			  		delete obj[pro_pid+"pro"+pro_cid+"_"+pro_size];
			  		delete obj[pro_pid+"color"+pro_cid];
			  		delete obj[pro_pid+"img"+pro_cid];
			  		delete obj[pro_pid+"nprice"+pro_cid];
			  		delete obj[pro_pid+"oprice"+pro_cid];
			  		delete obj[pro_pid+"num"+pro_cid];
			  		delete obj[pro_pid+"title"+pro_cid];
			  		if(obj["total"]==0){
			  			$.removeCookie("cart",{path:'/'});
			  			window.location = "cart.html"
			  		}else{
			  			var objStr = JSON.stringify(obj);
			  			$.cookie("cart",objStr,{expires:7,path:'/'})
			  		}
			  		
			  	})
			  }
			  console.log(JSON.parse($.cookie("cart")))
//			  //********删除选中的商品*********
//			  for(var i = 0;i<len;i++){			  			
//			  			$(".deletePro a").click(function(){
//			 			})
//			  	} 
		})
		
	}else{
		/*如果cookie--cart不存在则显示信息盒子*/
		$("#my_cart .cart_box").hide().siblings().show();
	}
	
})
