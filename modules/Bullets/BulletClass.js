Bullet = function(x, y, angle) {
    var me = this,
        h = 32,
        w = 32;

    Animation.Item.call(me, {
        image: "rocket",
        x: x - Math.ceil(w/2),
        y: y - Math.ceil(h/2),
        rotation: angle, //+ 90*180/Math.PI,
        layer: 4,
        height: h,
        width: w,
        sprite: 0
    });

    me.direction = angle;
};

Bullet.prototype = new Animation.Item({

    TYPE: "bullet",

    animationFunction: function() {
        var me = this;

        me.x += 10*Math.sin(me.direction);
        me.y -= 10*Math.cos(me.direction);

        if ((me.x > Animation.SceneManager.width) || (me.x < 0)) {
            me.onCollided("borders");
        }

        if ((me.y > Animation.SceneManager.width) || (me.y < 0)) {
            me.onCollided("borders");
        }
    },

    onCollided: function () {
        var me = this;
        me.alive = false;
        CollisionManager.unregisterItem("bullet", me);
        me.stop();
    }
});