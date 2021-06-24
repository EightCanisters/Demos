/**
 * 在指定的范围内产生随机整数，包括下限，不包括上限
 */
function random(lower, upper) {
	return Math.floor(Math.random() * (upper - lower)) + lower;
}

/**
 * 根据类名查找元素，解决兼容问题
 * @param className 待查找的类名
 * @param context 查找上下文，可选参数，默认为 document
 * @return 返回根据类名查找到的元素集合
 */
function byClass(className, context) {
	// 如果 context 未传递，则默认为 document
	context = context || document;
	// 浏览器支持使用 context.getElementsByClassName() 方法
	if (context.getElementsByClassName) 
		return context.getElementsByClassName(className);

	/* 浏览器不支持使用 context.getElementsByClassName() 方法 */
	// 保存所有查找到的元素
	var result = []; 
	// 查找所有元素
	var elements = context.getElementsByTagName("*");
	// 遍历每个元素
	for (var i = 0, len = elements.length; i < len; i++) {
		// 当前遍历到元素的所有类名
		var classNames = elements[i].className.split(" ");
		// 遍历当前元素的所有类名
		for (var j = 0, l = classNames.length; j < l; j++) {
			// 待查找类名与当前遍历到的某个类名相同，则说明当前DOM元素是需要被查找出来的元素
			if (classNames[j] === className) {
				result.push(elements[i]);
				break;
			}
		}
	}

	// 返回查找到的元素所在的数组
	return result;
}

/**
 * 根据元素的 id、类名或标签名查找元素
 * @param selector 选择器，#id、.className、element
 * @param context 查询上下文，默认为 document
 * @return 返回根据选择器在查询上下文中查找到的结果
 */
function $(selector, context) {
	// 默认在 document 后代查找
	context = context || document;
	// 判断
	if (selector.indexOf("#") === 0) // id
		return document.getElementById(selector.slice(1));
	if (selector.indexOf(".") === 0) // className
		return byClass(selector.slice(1), context);
	// element
	return context.getElementsByTagName(selector);
}

/**
 * 获取指定元素的CSS属性值
 * @param element DOM元素
 * @param attrName 属性名
 * @return 返回根据属性名查找到的CSS属性值
 */
function css(element, attrName) {
	/*if (window.getComputedStyle) // 支持使用 getComputedStyle()  方法
		return getComputedStyle(element)[attrName];
	// IE9之前不支持使用 getComputedStyle() 方法，则使用 currentStyle 属性
	return element.currentStyle[attrName];*/
	
	return window.getComputedStyle
				? getComputedStyle(element)[attrName]
				: element.currentStyle[attrName];
}

/**
 * 注册事件监听，解决兼容问题
 * @param element 待注册事件监听的DOM元素
 * @param type 事件类型字符串
 * @param callback 事件处理程序（函数）
 */
function on(element, type, callback) {
	if (element.addEventListener) { // 支持使用 addEventListener
		if (type.indexOf("on") === 0)  // 事件类型字符串以"on"开头
			type = type.slice(2);
		element.addEventListener(type, callback);
	} else { // 不支持使用 addEventListener，使用 attachEvent()
		if (type.indexOf("on") !== 0) // 没有以 "on" 开头
			type = "on" + type;
		element.attachEvent(type, callback);
	}
}

/**
 * 保存、查询cookie
 * @param key cookie名
 * @param value cookie值，如果该参数未传递，则函数表示查询cookie
 * @param options 可配置参数，如：{expires: 3, path:"/", domain:"", secure:true} 
 */
function cookie(key, value, options) {
	// writing
	if (typeof value !== "undefined") { // 有传递value，则保存 cookie
		options = options || {};
		// 构建保存cookie的字符串，将 key 与 value 都编码
		var cookie = encodeURIComponent(key) + "=" + encodeURIComponent(value);
		// 判断是否有失效时间设置
		if (options.expires) {
			var date = new Date();
			date.setUTCDate(date.getUTCDate() + options.expires);
			cookie += ";expires=" + date.toUTCString();
		}
		// 路径
		if (options.path)
			cookie += ";path=" + options.path;
		// 域
		if (options.domain)
			cookie += ";domain=" + options.domain;
		// 安全链接
		if (options.secure)
			cookie += ";secure";

		// 保存
		return document.cookie = cookie;
	}

	// reading
	// 将域下所有 cookie 的 "key=value" 放到数组中
	var cookies = document.cookie.split("; ");
	// 遍历所有 cookie
	for (var i = 0, len = cookies.length; i < len; i++) {
		// 使用 = 将当前遍历到的 "key=value" 分开
		var parts = cookies[i].split("=");
		// cookie名
		var name = decodeURIComponent(parts.shift());
		// cookie值
		var value =decodeURIComponent(parts.join("="));

		// 判断当前cookie名是否是待查找的 cookie名称
		if (name === key)
			return value;
	}
	// 不能查找到，则返回 undefined
	return undefined;
}

/**
 * 删除 cookie
 * @param key cookie名
 * @param options 配置选项，通常配置 path
 */
function removeCookie(key, options) {
	options = options || {};
	options.expires = -1;
	cookie(key, "", options);
}

/**
 * 运动框架：线性运动
 * @param element 待添加运动动画效果的DOM元素
 * @param options 多属性运动配置选项
 * @param speed 限定运动的总时间
 * @param fn 运动结束后需要继续执行的函数
 */
function animate(element, options, speed, fn) {
	// 将在 element 元素上已有的运动动画效果停止
	clearInterval(element.timer);
	// 计算起始值、范围值
	var start = {}, range = {};
	for (var attr in options) {
		start[attr] = parseFloat(css(element, attr));
		range[attr] = options[attr] - start[attr];
	}
	// 记录运动开始时间
	var startTime = new Date().getTime();
	// 启动计时器，运动，将计时器id缓存在 element 上
	element.timer = setInterval(function(){
		// 计算实际运动时间
		var elapsed= Math.min(new Date().getTime() - startTime, speed);
		// 每个属性计算当前值
		for (var attr in options) {
			// 根据线性运动公式计算
			var result = elapsed * range[attr] / speed + start[attr];
			// 设置CSS
			element.style[attr] = result + (attr === "opacity" ? "" : "px");
		}
		// 判断是否停止计时器
		if (elapsed === speed) {
			// 停止计时器
			clearInterval(element.timer);
			// 如果有运动结束后执行的函数，则调用
			fn && fn();
		}
	}, 1000/60);
}

/**
 * 运动框架：淡入
 * @param element 待添加运动动画效果的DOM元素
 * @param speed 限定运动的总时间
 * @param fn 运动结束后需要继续执行的函数
 */
function fadeIn(element, speed, fn) {
	element.style.display = "block";
	element.style.opacity = 0;
	animate(element, {opacity: 1}, speed, fn);
}

/**
 * 运动框架：淡出
 * @param element 待添加运动动画效果的DOM元素
 * @param speed 限定运动的总时间
 * @param fn 运动结束后需要继续执行的函数
 */
function fadeOut(element, speed, fn) {
	animate(element, {opacity: 0}, speed, function() {
		element.style.display = "none";
		fn && fn();
	});
}

/**
 * ajax函数，异步请求服务器URL资源
 * @param options 可选配置选项 
 * {
 *		type: "get|post",  // 请求方式，默认 "get"     method
 *		url:"", // 请求资源的url
 *		data: {username:"", password:"", sex:""},  // 向服务器发送的数据
 *		dataType:"json", // 预期从服务器返回数据的类型
 *		success: function(resData){}, // 请求成功时执行的函数
 *		error: function(errMsg){} // 请求失败时执行的函数
 *	}
 */
function ajax(options) {
	options = options || {};
	// 请求服务器的URL
	var url = options.url;
	if (!url)
		return;
	// 请求方式
	var method = (options.type || "get").toUpperCase();
	// 判断是否有向服务器提交的数据
	var queryString = null,
		data = options.data;
	if (data) { // 如果有向服务器提交的数据，则将数据串联成查询字符串结构
		queryString = [];
		for (var attr in data) {
			queryString.push(attr + "=" + data[attr]);
		}
		queryString = queryString.join("&");
		// {username:"a", password:"b", sex:"c"}
		// ["username=a", "password=b", "sex=c"]
		// "username=a&password=b&sex=c"
	}
	// 判断，如果是 get 请求并且有向服务器提交数据，则将查询字符串串联在URL后
	if (method === "GET" && queryString) {
		url += "?" + queryString;
		queryString = null;
	}

	// 创建核心对象
	var xhr = new XMLHttpRequest();
	// 准备连接
	xhr.open(method, url, true);
	// 如果要像表单一样POST提交数据，则设置请求头
	if (method === "POST")
		xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	// 发送请求
	xhr.send(queryString);
	// 准备处理响应
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) { // 请求处理完毕，响应就绪
			if (xhr.status === 200) { // 请求成功
				// 获取响应数据
				var data = xhr.responseText;
				// 判断数据类型
				if(options.dataType === "json")
					data = JSON.parse(data);
				// 响应数据的处理业务
				options.success && options.success(data);
			} else { // 请求失败
				options.error && options.error(xhr.status);
			}
		}
	}
}




