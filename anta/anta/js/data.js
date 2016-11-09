$(function() {
	//主导航获取数据
	$.get("json/main_nav.json", function(data) {
			var str = "";
			$.each($(".nav_list li"), function(index) {
				if(index > 0 && index < 9) {

					if(index == 3 || index == 7) {
						str = "<div class='list_item pb6'><a href='' class='list_img'><img src='" + data[index - 1].img_src + "'/></a><dl><dt class='first'><a href='javascript:;'>" + data[index - 1].list[0].name + "</a></dt></dl><dl><dt><a href='javascript:;'>" + data[index - 1].list[1].name + "</a></dt></dl><dl><dt><a href='javascript:;'>" + data[index - 1].list[2].name + "</a></dt></dl><dl><dt><a href='javascript:;'>" + data[index - 1].list[3].name + "</a></dt></dl><dl><dt><a href='javascript:;'>" + data[index - 1].list[4].name + "</a></dt><dd><a href='javascript:;'>" + data[index - 1].list[4].shoe_type[0] + "</a></dd><dd><a href='javascript:;'>" + data[index - 1].list[4].shoe_type[1] + "</a></dd></dl><dl><dt><a href='javascript:;'>" + data[index - 1].list[5].name + "</a></dt><dd class='last'><a href='javascript:;'>" + data[index - 1].list[5].shoe_type[0] + "</a></dd></dl></div>";
						$(str).appendTo($(".nav_list li").eq(index));
					} else if(index == 8) {
						str = "<div class='list_item pb6'><a href='' class='list_img'><img src='" + data[index - 1].img_src + "'/></a><dl><dt class='first'><a href='javascript:;'>" + data[index - 1].list[0].name + "</a></dt><dd><a href='javascript:;'>" + data[index - 1].list[0].shoe_type[0] + "</a></dd><dd><a href='javascript:;'>" + data[index - 1].list[0].shoe_type[1] + "</a></dd></dl><dl><dt><a href='javascript:;'>" + data[index - 1].list[1].name + "</a></dt><dd><a href='javascript:;'>" + data[index - 1].list[1].shoe_type[0] + "</a></dd><dd><a href='javascript:;'>" + data[index - 1].list[1].shoe_type[1] + "</a></dd></dl><dl><dt><a href='javascript:;'>" + data[index - 1].list[2].name + "</a></dt></dl><dl><dt><a href='javascript:;'>" + data[index - 1].list[3].name + "</a></dt><dd><a href='javascript:;'>" + data[index - 1].list[3].shoe_type[0] + "</a></dd><dd><a href='javascript:;'>" + data[index - 1].list[3].shoe_type[1] + "</a></dd><dd><a href='javascript:;'>" + data[index - 1].list[3].shoe_type[2] + "</a></dd></dl><dl><dt><a href='javascript:;'>" + data[index - 1].list[4].name + "</a></dt><dd class='last'><a href='javascript:;'>" + data[index - 1].list[4].shoe_type[0] + "</a></dd></dl></div>";
						$(str).appendTo($(".nav_list li").eq(index));
					} else if(index == 6) {
						str = "<div class='list_item'><a href='' class='list_img'><img src='" + data[index - 1].img_src + "'/></a><dl><dt class='first'><a href='javascript:;'>" + data[index - 1].list[0].name + "</a></dt><dd><span>鞋:</span><a href='javascript:;'>" + data[index - 1].list[0].shoe_type[0] + "</a></dd><dd><a href='javascript:;'>" + data[index - 1].list[0].shoe_type[1] + "</a></dd><br /><dd><span>服:</span><a href='javascript:;'>" + data[index - 1].list[0].cloth_type[0] + "</a></dd><dd><a href='javascript:;'>" + data[index - 1].list[0].cloth_type[1] + "</a></dd></dl><dl><dt><a href='javascript:;'>" + data[index - 1].list[1].name + "</a></dt><dd><span>鞋:</span><a href='javascript:;'>" + data[index - 1].list[1].shoe_type[0] + "</a></dd><dd><a href='javascript:;'>" + data[index - 1].list[1].shoe_type[1] + "</a></dd><br /><dd><span>服:</span><a href='javascript:;'>" + data[index - 1].list[1].cloth_type[0] + "</a></dd><dd><a href='javascript:;'>" + data[index - 1].list[1].cloth_type[1] + "</a></dd></dl><dl><dt><a href='javascript:;'>" + data[index - 1].list[2].name + "</a></dt><dd><a href='javascript:;'>" + data[index - 1].list[2].shoe_type[0] + "</a></dd><dd><a href='javascript:;'>" + data[index - 1].list[2].shoe_type[1] + "</a></dd></dl><dl><dt><a href='javascript:;'>" + data[index - 1].list[3].name + "</a></dt><dd class='last'><a href='javascript:;'>" + data[index - 1].list[3].shoe_type[0] + "</a></dd></dl></div>";
						$(str).appendTo($(".nav_list li").eq(index));
					} else {
						str = "<div class='list_item'><a href='' class='list_img'><img src='" + data[index - 1].img_src + "'/></a><dl><dt class='first'><a href='javascript:;'>" + data[index - 1].list[0].name + "</a></dt><dd><a href='javascript:;'>" + data[index - 1].list[0].shoe_type[0] + "</a></dd><dd><a href='javascript:;'>" + data[index - 1].list[0].shoe_type[1] + "</a></dd><dd><a href='javascript:;'>" + data[index - 1].list[0].shoe_type[2] + "</a></dd></dl><dl><dt><a href='javascript:;'>" + data[index - 1].list[1].name + "</a></dt><dd><a href='javascript:;'>" + data[index - 1].list[1].shoe_type[0] + "</a></dd><dd><a href='javascript:;'>" + data[index - 1].list[1].shoe_type[1] + "</a></dd></dl><dl><dt><a href='javascript:;'>" + data[index - 1].list[2].name + "</a></dt><dd><a href='javascript:;'>" + data[index - 1].list[2].shoe_type[0] + "</a></dd><dd><a href='javascript:;'>" + data[index - 1].list[2].shoe_type[1] + "</a></dd><dd><a href='javascript:;'>" + data[index - 1].list[2].shoe_type[2] + "</a></dd></dl><dl><dt><a href='javascript:;'>" + data[index - 1].list[3].name + "</a></dt><dd><a href='javascript:;'>" + data[index - 1].list[3].shoe_type[0] + "</a></dd><dd><a href='javascript:;'>" + data[index - 1].list[3].shoe_type[1] + "</a></dd><dd><a href='javascript:;'>" + data[index - 1].list[3].shoe_type[2] + "</a></dd></dl><dl><dt><a href='javascript:;'>" + data[index - 1].list[4].name + "</a></dt><dd class='last'><a href='javascript:;'>" + data[index - 1].list[4].shoe_type[0] + "</a></dd></dl></div>";
						str = str.replace(/undefined/gi, "");
						$(str).appendTo($(".nav_list li").eq(index));
					}
				}
			});
		})
		//获取子导航的列表项
	$.get("json/shopping_sort.json", function(data) {
		var str = "";
		var str1 = "";
		var str2 = "";
		var str3 = "";
		$.each(data, function(index, ele) {
			var arr = [];
			//遍历json对象的type,将其转换为数组对象
			$.each(ele.type, function(key, value) {
				arr.push(value);
			});
			arr = arr.join(" "); //将数组对象转换为以空格隔开的字符串
			arr = arr.split(" "); //将字符串转换为以空格分隔的单个字符串
			for(var i in arr) {
				str1 += "<a href='#'>" + arr[i] + "</a>"; //每个列表长度不一
			}
			str = "<div class='sub_item'><div class='item_theme'><a href='#'>" + ele.name + "</a></div><div class='item_list'>" + str1 + "</div></div>";
			str1 = "";
			$(str).appendTo($("#sub_nav .sub_menu"));
			//判断是否有有侧隐藏内容并获取有该内容的列表下标
			if(data[index].right_content) {
				var arr2 = [];
				$.each(data[index].right_content.item_sort, function(key, value) {
					arr2.push(value);
				});
				for(var i = 0; i < arr2.length; i++) {
					arr2[i] = arr2[i].join(" ");
					var t = arr2[i].split(" ");
					for(var j in t) {
						str2 += "<a href='#'>" + t[j] + "</a>";
					}
					str3 += "<div class='box_content'>" + str2 + "</div>";
					str2 = "";
				}
				str4 = "<div class='box'><div class='box_l pt15'>" + str3 + "</div><div class='box_r'><h3>" + data[index].right_content.title + "</h3><a href='#'><img src='" + data[index].right_content.img_src + "' alt=''/></a></div></div>";
				$(str4).appendTo($("#sub_nav .sub_item").eq(index));
				str4 = "";
				str3 = "";
			}
		})
	})
})