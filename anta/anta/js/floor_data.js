$(function(){
	//**************获取楼层数据*************
	$.get("json/floorInfo.json",function(data){
		//console.log(data);
		var str = "";
		var str2 = "";
		var str3 = "";
		var str4 = "";
		var str5 = "";
		$.each(data, function(index,ele) {
			for(var i in data[index].left_img_list){
				str +=  "<dl class='product'>"
					+"<dt><a href='javascript:;'><img src='"+data[index].left_img_list[i].l_img_src+"' alt='' /></a></dt>"
					+"<dd><a href='javascript:;'>"+data[index].left_img_list[i].l_name+"</a></dd>"
					+"</dl>";
			}
			for(var i in data[index].left_list){
				str2 += "<li><a href='javascript:;'>"+data[index].left_list[i]+"</a></li>";
			}
			for(var i in data[index].right_list1){
				str4 += "<li><a href='javascript:;'><img src='"+data[index].right_list1[i].r_img_src+"' alt='' /></a><p><a href='javascript:;'>"+data[index].right_list1[i].r_name+"</a></p></li>";
			}
			for(var i in data[index].right_list2){
				str5 += "<li><a href='javascript:;'><img src='"+data[index].right_list2[i].r_img_src+"' alt='' /></a><p><a href='javascript:;'>"+data[index].right_list2[i].r_name+"</a></p></li>";			
			}
			str3 = 	"<div class='hot'>"
					+"<a href='javascript:;'><img src='"+data[index].big_img_src+"' alt='' /></a>"
					+"</div>"
//			//console.log(str,str2)
			$(".floor_list").eq(index).append($(str));//左侧图片
			$(".floor_list").eq(index).append($("<ul class='shoe_type'>"+str2+"</ul>"));//左侧列表
			$(str3).appendTo($(".floor_c").eq(index));//中间大图
			$("<ul class='shoe_list'>"+str4+"</ul>").appendTo($(".floor_r").eq(index));//右边图片列表上部
			$("<ul class='shoe_list no_bd'>"+str5+"</ul>").appendTo($(".floor_r").eq(index));//右边图片列表下部
			$(".shoe_type").eq(index).find("li").eq(0).find("a").addClass("active");//左侧列表首个a标签高亮
			str = "";
			str2 = "";
			str4 = "";
			str5 = "";
		});
		
	})
})
