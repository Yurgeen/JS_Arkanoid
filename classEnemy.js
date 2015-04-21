function Enemy(w, h)
{
	this.areaHeight = h;
	this.areaWidth = w;
	this.y = Math.ceil(Math.random()*h/2);
	this.yrange = Math.ceil(this.y/2);
	this.baseTrajectory = this.y;
	this.x = Math.random() > 0.5 ? -Enemy.t_w : w;
	this.direction = this.x < 0 ? 1 : -1;
	this.bornTime = Date.now();
}

Enemy.prototype.CalcPosition = function (tnow)
{
	/*var dt = 5000; // 5sec to fly over all battlefield
	// so velocity is 
	var dv = battlefield.width / dt;
	// and the distance change dx */
	
	var v = 0.16; //Commented all above to improve performance
	var dx = Math.ceil((tnow - this.bornTime)*v*this.direction);
	dx = this.direction > 0 ? dx : this.areaWidth + dx;
	if  ((dx > - (Enemy.w + 1)) && (dx < this.areaWidth + 1))
	{
		this.x = dx;
		this.y = this.baseTrajectory + Math.ceil(Math.sin(dx*6*3.14/800)*this.baseTrajectory/2);
		return true;
	}
	else return false;	
}

Enemy.prototype.getFrame = function(t)
{
	return Enemy.sprites[getAnimationFrameNumber(1000, Enemy.sprites.length, this.bornTime, t)];
}	

Enemy.Initialize = function(a_Sprite, r, c, cnt)
{	
	Enemy.sprites = makeSpiteArray(a_Sprite, r, c, cnt);
	Enemy.w = Enemy.sprites[0].width;
	Enemy.h = Enemy.sprites[0].height;
}