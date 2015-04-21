function Sky(Pattern, width, height)
{
	this.pattern = Pattern;
	this.w = width;
	this.h = height;
	this.fillCache();
	this.startAnimation = Date.now();
}
	
Sky.prototype.getFrame = function (t)
{
	return this.frameCache[getAnimationFrameNumber(3000, this.frameCache.length, this.startAnimation, t)];
}
	
Sky.prototype.fillCache = function()
{
	this.numberOfFrames = this.pattern.height > this.h ? this.h : this.pattern.height;
	this.frameCache = new Array(this.numberOfFrames);
	for (var i = 0; i < this.numberOfFrames; i++)
	{
		this.frameCache[i] = this.calculateFrame(i);
	}
}

Sky.prototype.calculateFrame = function(n)
{
	var canvas = document.createElement('canvas');
	canvas.width = this.w;
	canvas.height = this.h;
	var ctx = canvas.getContext('2d');
			
	for (var i = 0; i < Math.ceil(this.w/this.pattern.width); i++)
		for (var j = -1; j < Math.ceil(this.h/ this.pattern.height); j++)
		{
			ctx.drawImage(this.pattern, i*this.pattern.width, j*this.pattern.height + n );
		}
	return canvas;
}