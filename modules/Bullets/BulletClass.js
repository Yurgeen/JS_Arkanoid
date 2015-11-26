Bullet = function(x, y, angle) {
    var me = this;

    Animation.Item.call(me, {
        image: "rocket",
        x: x,
        y: y,
        rotation: angle,
        layer: 4,
        height: 100,
        width: 40
    });
    me.direction = 0;
};

Bullet.prototype = new Animation.Item({

    TYPE: "bullet",

    animationFunction: function() {
        var me = this;

        me.x += 10*Math.sin(me.rotation);
        me.y -= 10*Math.cos(me.rotation);

        if ((me.x > Animation.SceneManager.width) || (me.x < 0)) {
            me.alive = false;
        }

        if ((me.y > Animation.SceneManager.width) || (me.y < 0)) {
            me.alive = false;
        }
    },

    onCollided: function () {
        var me = this;
        CollisionManager.unregisterItem("bullet", me);
        me.stop();
    }
});