function Role({width, height, x, y}){
	this.width = width;
	this.height = height;
	this.x = x;
	this.y = y;
	this.isAlive = true;
}
Role.prototype = {
	constructor: Role,
	//移动
	move: function(){},
	//销毁
	destory: function(){
		if(this.isAlive){
			this.isAlive = false;
			this.element.parentNode.removeChild(this.element);
		}
	}
}