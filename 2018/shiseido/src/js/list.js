require(["config"],function(){
	require(["jquery","template","fly","cookie","header","footer"], function($,template,fly){
		$.getJSON("http://rap2api.taobao.org/app/mock/26085/api/list",function(data){
			console.log(data);
			
			const html = template("l_list_temp", {list:data.res_body.data});
			$(".main_content").html(html);
		}).then(function(){
			//详情
			$(".main_content").on("click", ".list_detail", function(){
				const id = $(this).parents("dl").data("id");
				location = `/html/detail.html?id=${id}`;
			});
			$.cookie.json = true;
			//加入购物车
			$(".main_content").on("click", ".add_cart", function(e){
				//获取加购的商品的信息
				const dl = $(this).parents("dl");
				const currProd = {
					id:$(dl).data("id"),
					img:$(dl).find(".curr_img").attr("src"),
					title:$(dl).find(".curr_title").text(),
					price:$(dl).children(".curr_price").text().slice(1),
					amount:1
				};
				console.log(currProd);
				//将当前选购商品保存到cookie
				//判断当前选购商品是否已购买
				const products = $.cookie("products") || [];
				const has = products.some(function(curr){
					if(curr.id == currProd.id){
						curr.amount++;//已购买，数量+1
						return true;
					}
				});
				
				//没有买过
				if(!has){
					products.push(currProd);
				}
				
				//保存到cookie
				$.cookie("products",products,{expires:10,path:"/"});
				
				//添加购物车抛物线效果
				console.log($(".header_cart"));
				const end = $(".header_cart").offset();//抛物线终点
				const start = {left:e.pageX, top:e.pageY};//抛物线七点
				const flyer = $(`<img src="${currProd.img}" style="width:50px;z-index=999;">`);
				console.log(start)
				flyer.fly({
					start:{
						left:start.left-$(window).scrollLeft(),
						top:start.top-$(window).scrollTop()
					},
					end:{
						left:end.left-$(window).scrollLeft(),
						top:end.top-$(window).scrollTop()
					},
					onEnd:function(){
						this.destroy();
					}
				});
				//头部商品数量加载
				const totalAmount = products.reduce(function(sum,curr){
					return sum += curr.amount;
				},0);
				$(".header_cart span").text(totalAmount);
			});
		});
		//左侧菜单显示隐藏
		$(".index>h3").on("click",function(e){
			if($(this).next(0).css("display")=="none"){
				$(this).next(0).show();
				$(this).find("a").css({"background":"url(/images/down.png) no-repeat 115px center","color":"#670205"});
			}
			else{
				$(this).next(0).hide();
				$(this).find("a").css({"background":"url(/images/arrow_left.jpg) no-repeat 115px center","color":"#000000"});
			}
		});
		
		//左侧菜单点击跳转
		$(".index>ul>li").on("click",function(){
			const addIndex2 = $(this).find("a").html();
			$(".page_index").append(" >> " + addIndex2);
			
		});
		//顶部索引修改:比如 首页》》护肤
		const addIndex = decodeURI(location.search.slice(4));
		$(".page_index").html("首页 >> " + addIndex);
		$(".page_h2").html(addIndex);
		
		//搜索后删除大标题
		console.log(addIndex.slice(0,2))
		if(addIndex.slice(0,2)=="搜索")
			$(".page_h2").remove();
		
	});
})