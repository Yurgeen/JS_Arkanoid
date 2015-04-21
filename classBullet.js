function Bullet(x, y)
{
	this.x = x + Math.ceil(jet.model.width / 2) - Math.ceil(Bullet.model.width / 2);
	this.y = y;
	this.bornTime = Date.now();
}

Bullet.prototype.CalcPosition = function(t) 
{
	// I want to bullet move throw screen for 3 sec
	// So V = Y/t; V = 600 / 3000 = 0.4;
	var v = 0.2;
	
	var dy = - Math.ceil((t - this.bornTime)*0.4);
	if (this.y + dy >= -Bullet.model.height) // we're on screen 
	{
		this.y += dy;
		return true;
	}
	else return false;
} 