require(["config"],function(){//引入配置的短名称
	require(["jquery", "template", "header", "footer"],function($,template,promise){//依赖各模块实现首页功能
		//动态获取列表页面数据（使用模拟假数据）
		$.getJSON("http://rap2api.taobao.org/app/mock/25371/api/list",function(data){
			 console.log(data);
// 			let html="";
// 			data.res_body.data.forEach(function(curr){
// 				html += ` <div class="col_1_of_single1 span_1_of_single1">
// 	          	    <a href="single.html">
// 				     <img src="${curr.img_url}" class="img-responsive" alt=""/>
// 				     <h3>${curr.title}</h3>
// 				   	 <p>${curr.desc}</p>
// 				   	 <h4>${curr.price}</h4>
// 			         </a>  
// 				  </div>`
// 			});
// 			$(".list_box").html(html);
			// 利用art-template来渲染模板
			const html = template("list_temp",{list:data.res_body.data});//第一个参数是id，第二个参数是数据
			$(".list_box").html(html);
		});
	});
});