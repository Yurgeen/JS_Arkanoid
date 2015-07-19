function Enemies() {
    var me = this,
        item;

    CollisionManager.couples.push( [Enemy.TYPE, Enemy.TYPE] );

    me.items = [];

    for(var i = 0; i < 5; i++) {
        item = new Enemy({
            image : "bird",
            x : Math.random() * AnimationManager.width,
            y : Math.random() * AnimationManager.height,
            layer : 3,
            width : 50,
            height : 50,
            sprite : 0,
            fps : 30
        });

        item.direction = {
            x: Math.random() > 0.5 ? 1 : -1,
            y: Math.random() > 0.5 ? 1 : -1
        };

        me.items.push(item);

        CollisionManager.registerItem(item, Enemy.TYPE);
        AnimationManager.addItem(item);
    }
};

Enemies.prototype.start = function()
{
    var me = this;
    for (var i = 0; i < me.items.length; i++) {
        me.items[i].play();
    }
};

/** Single enemy declaration */

Enemy = function(config) {
    var me = this;
    AnimationItem.call(me, config);
    me.direction = 0;
};

Enemy.prototype = new AnimationItem({});

Enemy.TYPE = "enemy";

Enemy.prototype.animationFunction = function() {
    var me = this;

    me.x += 10*me.direction.x;
    me.y += 10*me.direction.y;

    if ((me.x > AnimationManager.width) || (me.x < 0)) {
        me.direction.x = -me.direction.x;
    }

    if ((me.y > AnimationManager.width) || (me.y < 0)) {
        me.direction.y = -me.direction.y;
    }
};

Enemy.prototype.onCollided = function () {
    var me = this;
    me.direction = {
        x: 0,
        y: 0
    };
};

ModuleLoader.registerModule("Enemies", Enemies);