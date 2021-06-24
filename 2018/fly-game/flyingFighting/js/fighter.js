const Fighter = function(){
	function Fighter(){
		Role.call(this, {
			width: 66,
			height: 80,
			x: 100,
			y: 100
		});
		this.element = $("#self");
	}
	
	Fighter.prototype = Object.create(Role.prototype);
	
	//飞机移动
	Fighter.prototype.move = function(x, y){
		this.x = x - this.width / 2;
		this.y = y - this.height / 2;
		if(this.x <= 0)
			this.x = 0;
		else if(this.x >= Map.width - this.width)
			this.x = Map.width - this.width;
		if(this.y <= 0)
			this.y = 0;
		else if(this.y >= Map.height - this.height)
			this.y = Map.height - this.height;
		console.log(this.x, this.y)
		//css
		this.element.style.left = this.x + "px";
		this.element.style.top = this.y + "px";
	}
	
	//饿汉式单例
	// return new Fighter();
	
	//懒汉式单例
	let instance = null;
	return {
		getInstance: function(){
			if(instance == null){
				instance = new Fighter();
			}
			return instance;
		}
	}
}();
