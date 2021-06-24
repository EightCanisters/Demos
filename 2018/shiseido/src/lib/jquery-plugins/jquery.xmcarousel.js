;
(function($){
	/**
	 * jQuery轮播图插件 
	 */
	function XmCarousel({imgs, width, height, container, duration, isButton, isCircle}) {
		this.imgs = imgs; // 所有待轮播的图片选项
		this.width = width; // 轮播图宽度
		this.height = height; // 轮播图高度
		this.container = $(container); // 轮播图放置的容器
		this.duration = duration || 3000; // 轮播图片切换时间间隔
		this.isButton = isButton; // 是否添加向前/后翻页按钮
		this.isCircle = isCircle; // 是否添加切换使用的小圆点
		this.length = imgs.length; // 所有轮播图片的张数
		this.lis = null; // 所有轮播图片布局的li盒子
		this.circles = null; // 所有小圆点
		this.prev = null; // 向前翻页
		this.next = null; // 向后翻页
		this.currentIndex = 0; // 当前正显示图片的索引
		this.nextIndex = 1; // 即将显示图片的索引
		this.timer = null; // 自动轮播切换计时器的id

		this.createDom(container); // 创建DOM元素
		this.autoPlay(); // 自动轮播
		this.addListener(); // 添加事件监听
	}

	XmCarousel.prototype = {
		// 动态创建轮播图布局结构
		// container 表示父级容器
		createDom : function(container) {
			let lis = "", // li中布局放置的图片
				is = ""; // i标签中布局的是小点
			// 循环生成 li 的布局HTML文本
			for (let i = 0, len = this.imgs.length; i < len; i++) {
				let img = this.imgs[i];
				lis += `<li><a href="${img.href}"><img src="${img.src}"></a></li>`;
				is += `<i></i>`;
			}
			let btn = this.isButton ? `<div class="prev"><a><img src="/images/left.png"></a></div>
					<div class="next"><a><img src="/images/right.png"></a></div>` : "",
				circle = this.isCircle ? `<div class="pages">${is}</div>` : "";
			// 轮播布局结构
			let html = `<ul class="imgs">${lis}</ul>
					${circle}
					${btn}`;
			// 将生成布局结构添加到容器内部
			$(container).html(html);

			// 查找所有布局好的li
			this.lis = $(".imgs li", $(container));
			// 查找所有小圆点
			this.circles = $(".pages i", $(container));
			// 查找向前、后翻页元素
			this.prev = $(".prev", $(container));
			this.next = $(".next", $(container));

			// 设置CSS
			// 容器CSS
			$(container).css({
				width: this.width,
				height: this.height,
				position: "relative",
				overflow: "hidden"
			});
			// ul样式
			$(".imgs", $(container)).css({
				margin: 0,
				padding: 0,
				listStyle: "none",
				width: this.width,
				height: this.height
			});
			// li样式
			this.lis.css({
				width: this.width,
				height: this.height,
				display: "none",
				position: "absolute",
				top: 0,
				left: 0
			}).first().show();
			// 小圆点盒子样式
			$(".pages", $(container)).css({
				position: "absolute",
				height: "30px",
				width: "100%",
				bottom: 0,
				background: "#000"
			});
			// 小圆点样式
			this.circles.css({
				display: "inline-block",
				width: "20px",
				height: "20px",
				margin: "5px",
				background: "#fff",
				borderRadius: "10px",
			}).first().css({
				background: "#f00"
			});
			// 向前向后翻页
			$(".prev, .next", $(container)).css({
				width: "32px",
				height: "62px",
				position: "absolute",
				top: 0,
				bottom: 0,
				margin: "auto",
			});
			this.next.css({
				right: "10px"
			});
			this.prev.css({
				left:"10px"
			});
		},
		// 自动轮播
		autoPlay: function() {
			// setInterval(this.move.bind(this), this.duration);
			this.timer = setInterval($.proxy(this.move, this), this.duration);
		},
		// 轮播切换图片
		move : function() {
			// 当前显示的图片淡出
			this.lis.eq(this.currentIndex).stop().fadeOut();
			// 即将显示的图片淡入
			this.lis.eq(this.nextIndex).stop().fadeIn();

			// 小圆点样式切换
			this.circles.eq(this.currentIndex).css("background", "#fff");
			this.circles.eq(this.nextIndex).css("background", "#f00");

			// 修改索引
			this.currentIndex = this.nextIndex;
			this.nextIndex++;
			if (this.nextIndex >= this.length)
				this.nextIndex = 0;
		},
		// 注册事件监听
		addListener : function() {
			// hover() 方法合成了 mouseenter() 与 mouseleave() 两个事件
			this.container.hover(()=>{
				clearInterval(this.timer);
			}, ()=>{
				this.autoPlay();
			});
			// 小圆点点击切换
			const that = this;
			this.circles.click(function() {
				// 获取当前点击的小圆点索引
				const index = $(this).index();
				if (that.currentIndex === index)
					return;
				that.nextIndex = index;
				that.move();
			});
			// 向前、后翻页
			this.prev.click(()=>{
				this.nextIndex = this.currentIndex - 1;
				if (this.nextIndex < 0)
					this.nextIndex = this.length - 1;
				this.move();
			});
			this.next.click($.proxy(this.move, this));
		}
	};

	// 添加插件：向jQuery的原型中添加方法
	// 即该方法能够直接被jQuery对象实例所调用
	/*$.fn.carousel = function(options){
		this.each(function(index, element){
			options.container = element;
			new XmCarousel(options);
		});
	}*/
	// 等价于
	$.fn.extend({
		carousel: function(options){
			this.each(function(index, element){
				options.container = element;
				new XmCarousel(options);
			});
		}
	});	
})(jQuery);