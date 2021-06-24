require(["config"],function(){
	require(["jquery", "template","header","footer", "cookie"], function($, template){
		//获取当前加载商品的id
		const id = location.search.slice(4);
		//加载详情页面数据
		$.getJSON(`http://rap2api.taobao.org/app/mock/25371/api/detail?id=${id}`, function(data){
			console.log(data);
			//art-template
			const html = template("detail_temp",{detail:data.res_body.data});
			// console.log(html);
			$(".content_box").prepend(html);
		}).done(function(){
			//表单提交（加入购物车）
			$(".buy_form").submit(function(){
				//加入购物车时，获取当前选购商品信息
				const currProd = {
					id:$(".id").text(),
					title:$(".title").text(),
					price:$(".price").text(),
					img:$(".img").attr("src"),
					amount:1
				};
				//将当前选购商品保存到cookie中
				$.cookie.json = true;//使用jquery.cookie插件，配置$.cookie = true;表示自动将JS值与JSON文本间互相转换
				const products = $.cookie("products") || [];
				//判断当前选购商品是否已有购买
				const has = products.some(function(curr){
					if(curr.id === currProd.id){//有购买过，修改数量
						curr.amount++;
						return true;
					}
				});
				if(!has){//没有购买过，将当前选购商品对象添加到数组中保存
					products.push(currProd);
				}
				//将数组重新存回cookie
				$.cookie("products",products,{expires:10,path:"/"});
				return false;//表示同时阻止默认和事件传播
			});
		});
	});
})