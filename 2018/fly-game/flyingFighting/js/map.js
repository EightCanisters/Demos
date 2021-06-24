//地图对象
const Map = {
	width: 320,
	height: 568,
	startElement: $("#start"),
	gameElement: $("#game"),
	addRole: function(role){//向地图中添加其他角色,
		this.gameElement.appendChild(role.element);
		
	}
}