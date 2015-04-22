var battlefield;
var sky, jet, enemies, bullets, booms;
var startDrawTime;
var pew, bird, s;

function start()
{
	//Screen
	battlefield = document.getElementById("battlefield");
	
	//Sky
	var skyPattern = new Image();
	skyPattern.onload = function()
	{
		sky = new Sky(skyPattern, battlefield.width, battlefield.height);
	};
	skyPattern.src = "sky.jpg";
	
	//Jet
	jetModel = new Image();
	jetModel.onload = function()
	{
		jet = new Jet(jetModel, battlefield.width, battlefield.height);
	};
	jetModel.src = "jet.png";
	
	//Bullets
	Bullet.model = new Image();
	Bullet.model.onload = function()
	{
		Bullet.h = Bullet.model.height;
		Bullet.w = Bullet.model.width;
	}
	Bullet.model.src = "bullet.png";
	bullets = [];
	
	//Enemies
	var enemySprite = new Image();
	enemySprite.onload = function()
	{
		Enemy.Initialize(enemySprite, 3, 5, 14);
		s = new Enemy(battlefield.width, battlefield.height);
	}
	enemySprite.src = "enemy.png";
	
	//Explosions
	var boomSprite = new Image();
	boomSprite.onload = function()
	{
		Boom.Initialize(boomSprite, 5, 8, 40);
	}
	boomSprite.src = "boom.png";
	booms = []
	
	//Sound
	pew = new Audio("pew.wav");
	bird = new Audio("bird.wav");
	
	//Start animation
	startDrawTime = Date.now();
	bracker = false;
	draw();

}

function draw()
{
	requestAnimationFrame(draw);
	var ctx = battlefield.getContext('2d');
	
	//Remember the animation time
	var tnow = Date.now();
	
	//Draw sky
	ctx.drawImage(sky.getFrame(tnow), 0, 0);
	
	//Draw enemy
	ctx.drawImage(s.getFrame(tnow), s.x, s.y);
	
	//Draw bullets
	for (var key in bullets)
	{
		ctx.drawImage(Bullet.model, bullets[key].x,bullets[key].y)
	}
	
	//Draw jet
	ctx.drawImage(jet.model, jet.x, jet.y);
	
	//Draw explosions
	for (var key in booms)
	{
		ctx.drawImage(booms[key].getFrame(tnow), booms[key].x, booms[key].y);
	}
	computePositions(tnow);
}

function computePositions(t)
{
	//new position for enemy
	if (!s.CalcPosition(t)) 
	{	
		s = new Enemy(battlefield.width, battlefield.height);
	}
	
	//new position for bullets
	//and collision calculation
	for (var b_key in bullets)
	{
		if (bullets[b_key].CalcPosition(t))
		{
			console.log(Enemy.w, Enemy.h);
			if (isCollision(bullets[b_key].x, bullets[b_key].y, 
							Bullet.w, Bullet.h,
							
							s.x, s.y, 
							Enemy.w, Enemy.h )
			)
			{
				bird.play();
				booms[booms.length] = new Boom(s.x, s.y);
				s = new Enemy(sky.w, sky.h);
				bullets.splice(b_key, 1);
				console.log("collision");
			}
			else
			{
				console.log("no collision");
			}
		}
		else
		{
			bullets.splice(b_key, 1)
		}
	}
	
	for (var bm_key in booms)
	{
		if (!booms[bm_key].isActive)
		{
			console.log("deleted");
			booms.splice(bm_key, 1)
		}
	}
}

function isCollision(x1, y1, w1, h1, x2, y2, w2, h2)
{
	var x12 = x1 + w1;
	var x22 = x2 + w2;
	var y12 = y1 + h1;
	var y22 = y2 + h2;

	return (x1  < x22 &&
			 x12 > x2  &&
			 y1  < y22 &&
			 y12 < y2)

}

function makeSpiteArray(a_Sprite, r, c, cnt)
{	
	var canvas = document.createElement('canvas');
	canvas.width = 	a_Sprite.width;
	canvas.height = a_Sprite.height;
	var ctx = canvas.getContext("2d");
	ctx.drawImage(a_Sprite, 0, 0);
	
	sprites = new Array(cnt);
	t_w = Math.floor(a_Sprite.width/c);
	t_h = Math.floor(a_Sprite.height/r);
	
	var n = 0;
	for (var i = 0; i < r; i++)
	{
		for (var j = 0; j < c; j++)
		{
			var partCanvas = document.createElement('canvas');
			partCanvas.width = 	t_w;
			partCanvas.height = t_h;
			var partCtx = partCanvas.getContext("2d");
			var ImgData = ctx.getImageData(j*t_w, i*t_h, t_w - 1, t_h -1);
			partCtx.putImageData(ImgData, 0, 0);
			sprites[n] = partCanvas;
			n++;
			if (n > cnt) break;
		}
	}
	return sprites;
}

function keyPressed(e){

	// Space pressing
	if (e.which == 32) 
	{
		pew.play();
		var newBullet = new Bullet(jet.x, jet.y);
		bullets[bullets.length] = newBullet;
	};

	// Arrows
	switch (e.keyCode)
	{
		case 37 :
			jet.move("l");
			break;
		case 39 :
			jet.move("r");
			break;
		case 38 :
			jet.move("u");
			break;
		case 40 :
			jet.move("d");
			break;
	}
}

function getAnimationFrameNumber(AnimationTime, NumberOfFrames, StartTime, CurrentTime)
{
	return Math.floor(((CurrentTime - StartTime)%AnimationTime)*(NumberOfFrames - 1)/AnimationTime);
}	
