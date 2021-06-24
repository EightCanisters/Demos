require(["config"], function(){
	require(["jquery","template","fly","cookie","header","footer"],function($,template,fly){
		//cookie插件配置
		$.cookie.json = true;
		/*加载相关商品数据*/
		$.getJSON("http://rap2api.taobao.org/app/mock/26085/api/list",function(data){
			const html1 = template("c_about_temp1", {about:data.res_body.data});
			$(".div1").html(html1);
			const html2 = template("c_about_temp2", {about:data.res_body.data});
			$(".div2").html(html2);
		}).then(function(){
			//末尾部分相关商品展示
			$(".content_bottom_title li").on("click",function(){
				$(".content_bottom_title li").css({"border-bottom":"1px solid #7c0d02"});
				$(this).css({"border-bottom":"1px solid #ffffff","border-right":"1px solid #7c0d02"});
				//获取事件源元素在父节点中的索引
				const index = $(this).parent().children().index(this);
				if(index == 0){
					$(this).next().css({"border-right":"1px solid #ffffff"});
					$(".div1").show();
					$(".div2").hide();
				}
				else{
					$(".div1").hide();
					$(".div2").show();
				}
			});
		}).then(function(){
			//加入购物车
			$(".content_bottom_content").on("click", ".add_cart", function(e){
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
				goodsTotal(products);	
			});
			
		});
		
		/**************购物车内容加载**************/
		let  products = $.cookie("products") || [];
		//判断购物车是否为空
		if(products.length == 0){//为空
			return;
		}
		//购物车不为空，显示所有购物车中的商品
		$(".no_goods").hide().siblings(".goods_info").removeClass("hide");
		
		//动态渲染购物车的商品
		const html = template("cart_template",{products})
		$(".cart_main tbody").html(html);
		calcTotal();
		
		/**************删除数据**************/
		$(".cart_main tbody").on("click", ".btn_delete", function(){
			//获取当前删除链接所在行
			const tr = $(this).parents("tr");
			
			//获取当前删除商品的id
			const id = tr.data("id");//获取的是data-id的值
			// console.log(id)
			//从cookie中删除
			products = products.filter(function(curr){
				if(curr.id == id)
					return false;
				return true;
			});
			$.cookie("products", products, {expires:10,path:"/"});
			// console.log(products)
			
			//从DOM中删除
			tr.remove();
			// location.reload();
			//判断购物车是否为空
			if(products.length == 0){//为空
				$(".no_goods").show().siblings(".goods_info").addClass("hide");
			}
			
		});
		
		/**************修改数量+/-**************/
		$(".cart_main tbody").on("click",".btn_decrease,.btn_increase", function(){
			//获取所在行
			const tr = $(this).parents("tr");
			//商品id
			const id = $(tr).data("id");
			// console.log(id)
			//行对应商品
			let prod = null;
			const a = products.some(function(curr){
				if(curr.id == id){
					prod = curr;
					return true;
				}
			});
			//修改商品数量+/-
			if ($(this).is(".btn_increase")) {
				prod.amount++;
			} else {
				if (prod.amount <= 1)
					return;
				prod.amount--;
			}
			// console.log(prod.amount);
			//保存到cookie中
			$.cookie("products", products, {expires:10, path:"/"});
			
			//将修改后的数量填充到文本框
			$(this).siblings(".txt_amount").val(prod.amount);
			//修改小计
			$(tr).children(".p_subtotal").text("￥"+(prod.amount * prod.price).toFixed(2));
			//计算合计
			calcTotal();
			goodsTotal(products);
		});
		
		/**************修改数量--用户输入**************/
		$(".cart_main tbody").on("blur",".txt_amount",function(){
			//查找所在的行
			const tr = $(this).parents("tr");
			//获取商品id，通过tr的data-id属性
			const id = $(tr).data("id");
			//行对应商品
			let prod = null;
			products.some(function(curr){
				if(curr.id == id){
					prod = curr;
					return true;
				}
			});
			//修改prod商品的数量
			const _amount = $(this).val();
			if(!/^[1-9]\d*$/.test(_amount)){
				$(this).val(_amount);//非法字符显示为改之前的数字
			}
			prod.amount = Number(_amount);
			//存进cookie
			$.cookie("products",products,{expires:10,path:"/"});
			//显示小计
			$(tr).find(".p_subtotal").text("￥" + (prod.amount*prod.price).toFixed(2));
			//显示合计
			calcTotal();
			//购物车总数
			goodsTotal(products);
		});
		
		
		//定义函数，计算合计
		function calcTotal(){
			let sum = 0;
			console.log($(".p_subtotal"))
			$(".p_subtotal").each(function(index,element){
				sum += Number($(element).text().slice(1));
			});
			// console.log(sum);
			$(".total_price label").text("￥"+ sum.toFixed(2));
		}
		
		//顶部商品总数
		function goodsTotal(products){
			const totalAmount = products.reduce(function(sum,curr){
				return sum += Number(curr.amount);
			},0);
			$(".header_cart span").text(totalAmount);
		}
		
		//继续购物
		console.log(document.referrer, typeof document.referrer)
		$(".cart_main tfoot").on("click",".btn_continue_shopping",function(){
			let prevLink = document.referrer;
			if(prevLink.toString().indexOf("/html/cart.html")==-1)
				location = prevLink;
			else
				location = "/index.html"
		})
		
		//去结算
		$(".cart_main tfoot").on("click",".cart_submit",function(){
			if($(".t_right").children("li").first().children("a").hasClass("t_right_login")){
				alert("请先登录 ^ ^");
				location = "/html/loginAndRegis.html";
			}else
			location = "/html/confirm.html";
		})
	});
})