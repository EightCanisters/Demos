require(["config"],function(){
	require(["jquery","header","footer", "cookie"],function(){
		//注册
		$(".regis_form_submit").on("click",function(){
			console.log($(".form_register").serialize());
			var data = $(".form_register").serialize();
			
			//将最后两个checkbox的值去掉
			var cutLast = function(data){
				//定义新数组
				var array2 = [];
				//字符串分割成数组
				var array = data.split("&");
				// console.log(array);
				//去掉数组最后两项
				array.pop();array.pop();
				// console.log(array);
				//获取年月日
				var date="";
				for(var i = 3; i < array.length; i++){
					 var temp = array[i].split("=");
					 // console.log(temp);
					 if(temp[1] == ""){date += "";}
					 else{date += temp[1] + "-";}
				}
				date = "birthday=" + date.slice(0,date.length-1);
				// console.log(date)
				array2.push(array[0],array[1],array[2],date);
				// console.log(array2)
				//获取radio的值
				array2.push("sex=" + $(".sex input:radio[name='sex']:checked").val());
				array2.push("dingyue=" + $(".dingyue input:radio[name='dingyue']:checked").val());
				console.log(array2);
				//返回字符串
				return array2.join("&");
			}
			data = cutLast(data);
			// console.log(data)
			
			console.log($(".itemCheck input[type='checkbox']").is(':checked'));//打印勾选同意
			//是否勾选同意
			if($(".itemCheck input[type='checkbox']").is(':checked')){
				if($(".user_pwd").val()=="" || $(".user_name").val()=="")
					alert("用户名或密码为空");
				else{
					//ajax访问注册API借口
					$.post("http://localhost/api/register.php", data, function(data){
						console.log(data);
						if (data.res_code === 1) {
							alert("用户注册成功");
							// location = "/html/login.html";
						} else {
							alert("用户注册失败");
						}
					}, "json");
				}
			}else{
				alert("同意条款同意后才能注册");
			}
		});
		
		//cookie
		$.cookie.json = true;
		//登录
		$(".form_login").on("submit", function(e){
			//获取登录表单中的用户名和密码
			const data = $(this).serialize();
			console.log(data);
			//ajax实现登录
			// console.log($(".itemCheck_login input[type='checkbox']").is(':checked'))
			if($(".itemCheck_login>input[type='checkbox']").is(':checked')){
				$.post("http://localhost/api/login.php", data, function(data){
					if(data.res_code === 1){
						alert("用户登录成功");
						$.cookie("login_user",data.res_body, {path:"/"});
						let prevLink = document.referrer;
						location = prevLink;
					}else{
						alert("用户名或密码错误");
					}
				},"json");
			}else{
				alert("同意条款后才能登录");
			}
			
			
			//阻止默认和事件传播
			return false;
		})
	});
})