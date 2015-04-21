function Jet(Model, areaWidth, areaHeight)
{
	this.model = Model;
	this.x = Math.floor(areaWidth/2) - Math.floor(this.model.width/2);
	this.y = areaHeight - this.model.height;
	this.areaWidth = areaWidth;
	this.areaHeight = areaHeight;
}

Jet.prototype.move = function(Direction)
{
	switch (Direction)
	{
		case "l" :
			if (this.x >= 5) this.x -= 30;
			break;
		case "r" :
			if (this.x <= (this.areaWidth - this.model.width - 5)) this.x += 30;
			break;
		case "u" :
			if (this.y >= 5) this.y -= 5;
			break;
		case "d" :
			if (this.y <= (this.areaHeight - this.model.height)) this.y += 5;
			break;
	}
}	