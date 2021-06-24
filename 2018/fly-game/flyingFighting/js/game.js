const Game = {
	enemies: [],//所有敌机
	bullets: [],//所有子弹
	fighter: Fighter.getInstance(), //战机
	
	//注册事件监听
	addListener: function(){
		const that = this;
		on(Map.startElement, "click", function(){
			this.style.display = "none";
			that.play();
		});
		//鼠标在游戏界面移动
		on(Map.gameElement, "mousemove", function(e){
			let x = e.pageX - this.offsetParent.offsetLeft,
				y = e.pageY - this.offsetParent.offsetTop;
			//Fighter.move(x, y);
			that.fighter.move(x, y);
		});
	},
	
	//组织游戏流程
	play: function(){
		let count = 0;
		//启动计时器，游戏开始
		var timer = setInterval(()=>{
			count++;
			if(count % 100 === 0){
				this.enemies.push(EnemyFactory.createEnemy("small"));
			}
			if(count % 211 === 0) { // 中
				this.enemies.push(EnemyFactory.createEnemy("middle"));
			}
			if (count % 322 === 0) { // 大
				this.enemies.push(EnemyFactory.createEnemy("big"));
			}
			if(count % 10 === 0){ //生成子弹
				this.bullets.push(createBullet(this.fighter));
			}
			//每架战机都移动
			this.enemies.forEach(curr=>{
				curr.move();
			});
			this.bullets.forEach(curr=>{
				curr.move();
			});
			
			// 判断敌机、子弹、战机是否碰撞
			for (let i = this.enemies.length - 1; i >= 0; i--) {
				const enemy = this.enemies[i];
				for (let j = this.bullets.length - 1; j >= 0; j--) {
					const bullet = this.bullets[j];
					// 调用方法，判断
					const b = this.check(enemy, bullet)
					console.log(b)
					if (b == false) { // 碰撞，销毁资源
						bullet.destory();
						enemy.destory();
						this.bullets.splice(j, 1);
						this.enemies.splice(i, 1);
						break;
					}
				}
			}
			for (let i = this.enemies.length - 1; i >= 0; i--) {
				const enemy = this.enemies[i];
				// 判断是否与战机碰撞
				if (this.check(enemy, this.fighter) == false) {
					enemy.destory();
					this.enemies.splice(i, 1);
					this.fighter.destory();
					clearInterval(timer);
					break;
				}
			}
		}, 1000/60);
		
	},
	
	//判断两战机是否相撞
	// 返回 false 表示碰撞  true 表示未碰撞
	check : function(role1, role2) {
		return (role1.y > role2.y + role2.height
			|| role1.y + role1.height < role2.y
			|| role1.x > role2.x + role2.width
			|| role1.x + role1.width < role2.x)
	},
	
	//开始游戏
	start: function(){
		this.addListener();
	}
};

Game.start();