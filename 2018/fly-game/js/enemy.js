function Enemy({width, height, x, y, img, speed}){
	Role.call(this,{width, height, x, y});
	this.img = img;
	this.speed = speed;
	
	//敌机渲染
	this.createDom();
}
Enemy.prototype = Object.create(Role.prototype);

Enemy.prototype.createDom = function(){
	//创建dom节点
	this.element = document.createElement("div");
	this.element.style.width = this.width + "px";
	this.element.style.height = this.height + "px";
	this.element.style.background = `url(${this.img})`;
	this.element.style.position = "absolute";
	this.element.style.left = this.x + "px";
	this.element.style.top = this.y + "px";
	//将此节点添加到地图中显示
	Map.addRole(this);
}

//敌机移动
Enemy.prototype.move = function(){
	if(!this.isAlive)
		return;
	
	//移动中,y左边更改
	this.y += this.speed;
	if(this.y >= Map.height){
		this.element.parentNode.removeChild(this.element);
		this.isAlive = false;
	}
	this.element.style.top = this.y + "px";
}

//生成敌机的工厂
const EnemyFactory = {
	createEnemy: function(type){
		if(type == "small"){
			return new Enemy({
				width: 34,
				height: 24,
				x: random(0, Map.width - 34),
				y: 0,
				img: "images/small_fly.png",
				speed: 3
			});
		}else if(type == "middle"){
			return new Enemy({
				width: 46,
				height: 60,
				x : random(0, Map.width - 46),
				y : 0,
				img : "images/mid_fly.png",
				speed : 2
			});
		}else if (type == "big") { // da
			return new Enemy({
				width: 110,
				height: 164,
				x : random(0, Map.width - 110),
				y : 0,
				img : "images/big_fly.png",
				speed : 1
			});
		}
	}
}