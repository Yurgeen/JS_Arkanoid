var ANIMATION_ITEM_DEFAULT_CONFIG = {
    alive : true,
    visible : false,
    active : false,
    localTime : 0
};

function AnimationItem(config) {
    var me = this,
        id = AnimationManager.getNewItemID;

    Utils.apply(me, ANIMATION_ITEM_DEFAULT_CONFIG);

    if (config.image) {
        me.x = config.x || 0;
        me.y = config.y || 0;
        me.width = config.width || me.image.width;
        me.height = config.height || me.image.height;
    }

    if (config) {
        Utils.apply(me, config);
    }

    me.id = id;
}


/* Lifecycle methods */

AnimationItem.prototype.checkAlive = function(){
    var me = this;
    return me.alive;
};

AnimationItem.prototype.animationFunction = function () {};

AnimationItem.prototype.onCollision = function() {};

/* Control methods */

AnimationItem.prototype.play = function() {
    var me = this;
    me.visible = true;
    me.active = true;
};

AnimationItem.prototype.pause = function() {
    var me = this;
    me.active = false;
    me.visible = true;
}

AnimationItem.prototype.stop = function(){
    var me = this;
    me.active = false;
    me.visible = false;
    me.localTime = 0;
};

AnimationItem.prototype.doStep = function(dt) {
    var me = this;
    me.localTime += dt;
    if (me.checkAlive()) {
        me.animationFunction();
    }
    else {
        me.stop();
    }
};