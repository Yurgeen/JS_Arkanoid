function Boom(x, y)
{
	this.x = x;   
	this.y = y;
	this.bornTime = Date.now();
	this.isActive = true;
}

Boom.Initialize = function(a_Sprite, r, c, cnt)
{
	Boom.sprites = makeSpiteArray(a_Sprite, r, c, cnt);
	Boom.w = Boom.sprites[0].width;
	Boom.h = Boom.sprites[0].height;
}

Boom.prototype.getFrame = function(t)
{	
	dt = 1000; // 2 sec animation
	
	var d = t - this.bornTime;
	if (d > dt)
	{
		this.isActive = false;
		return Boom.sprites[Boom.sprites.length - 1];
	}
	return Boom.sprites[Math.floor((d*Boom.sprites.length)/dt)];
}