//加载头部的模块
define(["jquery"],function($){
	// $(".header").load("/html/include/header.html");
// 	$.get("/html/include/header.html", function(data){
// 		// $(".header").append(data);
// 		$(".header").html(data);
	// })
	//创建Promise对象
	return new Promise(function(resolve, reject){
		$.ajax({
			type: "get",
			url: "/html/include/header.html",
			success: function(data){
				$(".header").html(data);
				resolve(data);
			},
			error: function(err){
				reject(err);
			}
		});
	}).then(function(){
		//实现搜索提示
		$(".search input:first").keyup(function(){
			const word = $(this).val();
			url = `https://suggest.taobao.com/sug?code=utf-8&q=${word}&callback=?`;
			//jsonP跨域的方式获取
			$.getJSON(url,function(data){
				console.log(data);
				let html = "";
				data.result.forEach(function(curr){
					html += `<div>${curr[0]}</div>`;
				});
				$(".suggest").html(html);
			})
		})
	}).then(function(){
		//使用事件委派来将提示内容选中后填充到搜索框中
		// $(".suggest").delegate("div", "click", function(){});
		$(".suggest").on("click", "div", function(){
			$(".search input:first").val($(this).html());
			$(".suggest").empty();
		});
	});
})