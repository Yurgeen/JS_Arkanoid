Enemy = function(x, y) {
    var me = this;
    
    var size = Math.ceil(50 + Math.random()*50);

    Animation.Item.call(me, {
        image : "bird",
        x : x,
        y :  y,
        layer : 5,
        width : size,
        height : size,
        sprite : 0,
        fps : 30
    });
    me.direction = 0;
};

Enemy.prototype = new Animation.Item({

    TYPE: "enemy",

    isExploded: false,

    animationFunction: function() {
        var me = this;

        if (me.isExploded) {
            return;
        }

        me.x += 10*me.direction.x;
        me.y += 10*me.direction.y;

        if ((me.x > Animation.SceneManager.width) || (me.x < 0)) {
            me.direction.x = -me.direction.x;
        }

        if ((me.y > Animation.SceneManager.width) || (me.y < 0)) {
            me.direction.y = -me.direction.y;
        }
    },

    onCollided: function (sender) {
        var me = this;
        if (sender === "enemy") {

            me.direction = {
                x: 0,
                y: 0
            }
        }
        if (sender === "bullet") {
            CollisionManager.unregisterItem("enemy", me);
            me.stop();
            me.explode();
        }
    },

    explode: function() {
        var me = this;
        me.image = "explosion";
        me.sprite = 0;
        me.isExploded = true;
        me.play();
        me.loop = false;
    }
});
