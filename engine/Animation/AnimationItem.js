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

Animation.Item = function (config) {
    var me = this;

    Utils.apply(me, me.ANIMATION_ITEM_DEFAULT_CONFIG);

    if (config.image) {
        me.image = config.image;
        me.x = config.x || 0;
        me.y = config.y || 0;
        me.width = config.width || me.image.width;
        me.height = config.height || me.image.height;
        me.center = config.center || {x: Math.ceil(me.width/2), y: Math.ceil(me.height/2)};
    }

    if (config) {
        Utils.apply(me, config);
    }

    me.id = Animation.SceneManager.getNewItemID();
};

Animation.Item.prototype.ANIMATION_ITEM_DEFAULT_CONFIG = {
    alive : true,
    visible : false,
    active : false,
    layer : 0,
    localTime : 0
};

/* Lifecycle methods */

Animation.Item.prototype.checkAlive = function(){
    var me = this;
    return me.alive;
};

Animation.Item.prototype.animationFunction = function () {};

Animation.Item.prototype.onCollided = function() {};

/* Control methods */

Animation.Item.prototype.play = function() {
    var me = this;
    me.visible = true;
    me.active = true;
};

Animation.Item.prototype.pause = function() {
    var me = this;
    me.active = false;
    me.visible = true;
};

Animation.Item.prototype.stop = function(){
    var me = this;
    me.active = false;
    me.visible = false;
    me.localTime = 0;
};

Animation.Item.prototype.doStep = function(dt) {
    var me = this;
    me.localTime += dt;
    if (me.checkAlive()) {
        me.animationFunction();
    }
    else {
        me.stop();
    }
};