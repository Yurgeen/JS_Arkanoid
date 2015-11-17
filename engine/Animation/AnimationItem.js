/** Animation item class
 *
 * @param config
 * @constructor
 *
 * Configurable fields:
 *
 *  x, y - position coordinates
 *  width, height - display size
 *  image - reference to image resource
 *  sprite - frame number of image sprite
 *  rotation - angle of rotation [0-360]
 *  opacity - transparency value [0-1]
 *  layer - overlay value
 *  visible - visibility flag
 *
 */

function AnimationItem(config) {
    var me = this;

    Utils.apply(me, me.ANIMATION_ITEM_DEFAULT_CONFIG);

    if (config.image) {
        me.image = config.image;
        me.x = config.x || 0;
        me.y = config.y || 0;
        me.width = config.width || me.image.width;
        me.height = config.height || me.image.height;
    }

    if (config) {
        Utils.apply(me, config);
    }

    me.id = AnimationManager.getNewItemID();
}

AnimationItem.prototype.ANIMATION_ITEM_DEFAULT_CONFIG = {
    alive : true,
    visible : false,
    active : false,
    layer : 0,
    localTime : 0
};

/* Lifecycle methods */

AnimationItem.prototype.checkAlive = function(){
    var me = this;
    return me.alive;
};

AnimationItem.prototype.animationFunction = function () {};

AnimationItem.prototype.onCollided = function() {};

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
};

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