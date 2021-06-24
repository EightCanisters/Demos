function Bullet({width, height, x, y, img, speed}){
	Role.call(this,{width, height, x, y});
	this.img = img;
	this.speed = speed;
	
	//敌机渲染
	this.createDom();
}
Bullet.prototype = Object.create(Role.prototype);

Bullet.prototype.createDom = function(){
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
};

//敌机移动
Bullet.prototype.move = function(){
	if(!this.isAlive)
		return;
	
	//移动中,y左边更改
	this.y += this.speed;
	if(this.y <= 0){
		this.element.parentNode.removeChild(this.element);
		this.isAlive = false;
		return;
	}
	this.element.style.top = this.y + "px";
};

//生成子弹
const createBullet = function(element){
	return new Bullet({
		width: 6,
		height: 14,
		//x: Fighter.x + Fighter.width/2 - 3,
		//y: Fighter.y - 14,
		x: element.x + element.width / 2 - 3,
		y: element.y - 14,
		img: "images/bullet.png",
		speed: -2
	});
};