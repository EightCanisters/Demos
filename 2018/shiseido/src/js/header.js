define(["jquery","cookie"],function($){
	$.cookie.json = true;
	return new Promise(function(resolve,reject){
		$.ajax({
			type:"get",
			url:"/html/include/header.html",
			success:function(data){
				$("header").html(data);
				resolve(data);
			},
			error:function(err){
				reject(err);
			}
		}).then(function(){//设置头部二级菜单位置
			let width = $(document.body).width(),
				left = $(".h_list").offset().left,
				left2 = left + $(".h_list>li:first").width()*(3/2);
			$(".h_skinScu, .h_color").css({"width": width+"px", "left": -1*left+"px"});
			$(".hs_box, .hc_box").css({"left": left2+"px"});
		}).then(function(){//头部搜索框跳转
			var words = $(".h_search input:first").val();
			$(".h_search input:last").on("click",function(){
				words = $(this).prev().val()
				// console.log(words)
				location.href = `/html/list.html?id=搜索${words}`;
			})
			// console.log(words)
		}).then(function(){
			//从cookie中读取用户信息，名为login_user
			const loginUser = $.cookie("login_user");
			// console.log(loginUser);
			if(loginUser){
				const html1 = `${loginUser.name}${(loginUser.sex =='男')?"先生":"女士"}&nbsp;&nbsp;&nbsp;欢迎您&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" class="offline">退出</a>&nbsp;&nbsp;&nbsp;<a href='#'>我的SHISEIDO</a>`;
				// console.log(html1)
				$($(".t_right li")[0]).html(html1);
			}
		}).then(function(){
			//点击退出用户退出登录
			$(".offline").on("click",function(){
				$.removeCookie("login_user",{path:"/"});
				location = "/index.html";
			});
		}).then(function(){
			//计算总数
			const products = $.cookie("products") || [];
			const totalAmount = products.reduce(function(sum,curr){
				return sum += Number(curr.amount);
			},0);
			$(".header_cart span").text(totalAmount);
		});
	});
})