Enemy = function(config) {
    var me = this;
    AnimationItem.call(me, config);
    me.direction = 0;
};

Enemy.prototype = new AnimationItem({

    TYPE: "enemy",

    animationFunction: function() {
        var me = this;

        me.x += 10*me.direction.x;
        me.y += 10*me.direction.y;

        if ((me.x > AnimationManager.width) || (me.x < 0)) {
            me.direction.x = -me.direction.x;
        }

        if ((me.y > AnimationManager.width) || (me.y < 0)) {
            me.direction.y = -me.direction.y;
        }
    },

    onCollided: function () {
        var me = this;
        me.direction = {
            x: 0,
            y: 0
        }
    }

});

