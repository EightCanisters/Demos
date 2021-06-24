require(["config"],function(){
	require(["jquery","template", "fly", "header","footer","cookie"],function($,template,fly){
		
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
		
		//cookie
		$.cookie.json = true;//自动将js值与json值直接互相转换
		//加载数据
		const id = location.search.slice(4);
		$.getJSON(`http://rap2api.taobao.org/app/mock/26085/api/detail?id=${id}`,function(data){
			// console.log(data);
			//加载商品详情数据
			const html = template("d_list_temp", {curr:data.res_body.data[0]});
			// console.log(html)
			$(".stastic1").html(html);
			
		}).then(function(){
			const singlePrice = $(".curr_price").text();//单价
			//点击加减号
			$(".cut,.add").click(function(){
				if($(this).hasClass("cut")){
					if($(".number").val() >1){
						$(this).next().val(Number($(".number").val() - 1));
					}
				}else{
					$(this).prev().val(Number($(".number").val()) + 1);
				}
				calcSmallTotal(singlePrice);
			});
			$(".number").blur(function(){
				calcSmallTotal(singlePrice);
			});
			
		}).then(function(e){
			//表单提交 加入购物车
			console.log($(".c_buy input:first"))
			$(".c_buy input:first").click(function(e){
				//获取加购的商品信息
				const currProd = {
					id:$(".curr_id").text(),
					img:$(".curr_img").attr("src"),
					title:$(".curr_title").text(),
					price:$(".curr_price").text() / $(".curr_amount").val(),
					amount:$(".curr_amount").val()
				};
				console.log(currProd);
				//将当前选购商品保存到cookie
				const products = $.cookie("products") || [];
				//判断当前选购商品是否已有购买
				const has = products.some(function(curr){
					if(curr.id == currProd.id){
						curr.amount += Number(currProd.amount);
						return true;
					}
				})
				//没有购买过，则将当前选购商品保存
				if(!has){
					products.push(currProd);
				}
				//保存到cookie
				$.cookie("products",products,{expires:10,path:"/"});
				
				//添加购物车抛物线效果
				// console.log($(".header_cart"));
				const end = $(".header_cart").offset();//抛物线终点
				const start = {left:e.pageX, top:e.pageY};//抛物线七点
				const flyer = $(`<img src="${currProd.img}" style="width:50px;z-index=999;">`);
				// console.log(start)
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
				
				//显示所有选购商品的总数量
				const totalAmount = products.reduce(function(sum,curr){
					return sum += Number(curr.amount);
				},0);
				$(".header_cart span").html(totalAmount);
				//阻止默认和委派
				return false;
			});
		});
		$.getJSON(`http://rap2api.taobao.org/app/mock/26085/api/list`,function(data){
			//加载相关商品数据
			const html1 = template("d_about_temp", {about:data.res_body.data});
			$(".about_content").html(html1);
		});
		
		//计算小计
		function calcSmallTotal(singlePrice){
			const count = $(".number").val(),
				smallTotal = (count * singlePrice).toFixed(2);
			$(".curr_price").text(smallTotal);
		}
	});
})