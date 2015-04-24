function AnimationItem(config) {
    var me = this,
        x, y,
        depths,
        image,
        animationFunction,
        id = AnimationManager.getNewItemID;

    me.setCoordinates = function(pos) {
        x = pos.x || 0;
        y = pos.y || 0;
    };

    me.getCoordinates = function() {
        return {"x" : x, "y" : y};
    };

    me.setDepths = function(value) {
        depths = value || 0;
    };

    me.getDepths = function(){
        return depths;
    };

    me.setImage = function(value) {
        image = value;
    };

    me.getImage = function() {
        return image;
    };

    me.setCoordinates( {"x" : config.x, "y" : config.y} );
    me.setImage(config.image);
    me.setDepths(config.depth);

    me.animationFunction = config.animationFunction;
    me.checkAlive = config.checkAlive;
};

AnimationItem.prototype.animationFunction = function () {

};

AnimationItem.prototype.checkAlive = function(){
    return true;
};