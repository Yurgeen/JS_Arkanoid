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
    Utils.apply(this, this.ANIMATION_ITEM_DEFAULT_CONFIG);

    if (config.image) {
        this.image = config.image;
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.width = config.width || this.image.width;
        this.height = config.height || this.image.height;
        this.center = config.center || {x: Math.ceil(this.width/2), y: Math.ceil(this.height/2)};
    }

    if (config) {
        Utils.apply(this, config);
    }

    this.id = Animation.SceneManager.getNewItemID();
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
    return this.alive;
};

Animation.Item.prototype.animationFunction = function () {};

Animation.Item.prototype.onCollided = function() {};

/* Control methods */

Animation.Item.prototype.play = function() {
    this.visible = true;
    this.active = true;
};

Animation.Item.prototype.pause = function() {
    this.active = false;
    this.visible = true;
};

Animation.Item.prototype.stop = function(){
    this.active = false;
    this.visible = false;
    this.localTime = 0;
};

Animation.Item.prototype.doStep = function(dt) {
    this.localTime += dt;
    if (this.checkAlive()) {
        this.animationFunction();
    }
    else {
        this.stop();
    }
};