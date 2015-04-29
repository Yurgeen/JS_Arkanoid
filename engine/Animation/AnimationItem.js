function AnimationItem(config) {
    var me = this,
        depths,
        id = AnimationManager.getNewItemID;

    me.alive = true;
    me.visible = false;
    me.active = false;
    me.localTime = 0;

    me.image = config.image;
    me.x = config.x || 0;
    me.y = config.y || 0;
    me.width = config.width || me.image.width;
    me.height = config.height || me.image.height;
    me.spriteConfig = config.spriteConfig;

    me.setDepths = function(value) {
        depths = value || 0;
    };
    me.getDepths = function(){
        return depths;
    };

    me.setDepths(config.depth);
};

AnimationItem.prototype.animationFunction = function (dt) {
    var me = this;
   // me.localTime += dt;
};

AnimationItem.prototype.checkAlive = function(){
    var me = this;
    return me.isAlive;
};

AnimationItem.prototype.onCollision = function() {
    var me = this;
    me.isAlive = false;
};

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