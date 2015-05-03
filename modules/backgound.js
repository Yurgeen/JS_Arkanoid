function Background() {
    var me = this,
        pattern = ResourceManager.graphics["sky"],
        frameHeight = pattern.image.height,
        frameWidth = pattern.image.width,
        sceneWidth = AnimationManager.width,
        sceneHeight = AnimationManager.height,
        r = Math.floor(sceneHeight/frameHeight),
        c = Math.floor(sceneWidth/frameWidth),
        tiles = [],
        fps = 10,
        lastOffset = sceneHeight - frameHeight* r,
        item, n;


    for (var i = -1; i <= r; i++) {
        for(var j = 0; j <= c; j++) {
            item = new AnimationItem({
                x: j*frameWidth,
                y: i*frameHeight,
                depth: 0,
                image: pattern.image
            });
            item.animationFunction = function() {
                n = (frameHeight % this.localTime*fps/1000) || 0;
                this.y += n;

                if (this.y > sceneHeight) {
                    this.y = lastOffset - sceneHeight + n;
                }
            };
            tiles.push(item);
            AnimationManager.addItem(item);
        }
    }

    me.tiles = tiles;
}

Background.prototype.start = function(){
    var me = this;
    me.tiles.forEach(function(element){
       element.play();
    });
}

ModuleLoader.registerModule("Background", Background);