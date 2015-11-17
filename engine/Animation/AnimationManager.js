/** AnimationManager
 * singleton
 *
 * */

AnimationManager = {

    layers : [],
    items : {},

    init : function(callback) {
        var me = AnimationManager,
            scene = document.getElementById("scene"),
            buffer = document.createElement("canvas");

        me.ctx = scene.getContext("2d");
        me.width = scene.width;
        buffer.width = me.width;
        me.height = scene.height;
        buffer.height = me.height;
        me.buffer = buffer.getContext("2d");

        callback();

        me.localTime = 0;
    },

    addItem : function(item) {
        var me = AnimationManager,
            layer = item.layer;

        if (!me.layers[layer]) {
            me.layers[layer] = []
        }

        me.layers[layer][item.id] = item;
    },

    getNewItemID :(function(){
        var ID = 0;
        return (function() {
            return ID++;
        });
    })(),

    removeItem : function(item) {

    },

    performAnimation : function(dt) {
        var me = AnimationManager;

        CollisionManager.processCollisions();
        SpriteManager.processFrame(dt);

        me.layers.forEach(function(element){
            element.forEach(function(item){
                if (item.active){
                    item.doStep.call(item, dt);
                }
            });
        });

        me.localTime += dt;
    },

    getScene : function() {
        var me = AnimationManager;

        //Clear buffer
        //May be removed
        me.buffer.fillStyle = "#ffffff";
        me.buffer.fillRect(0, 0, me.width, me.height);

        for (var i = 0; i < me.layers.length; i++){
            if(me.layers[i]) {
                me.layers[i].forEach(function(element){
                    me.drawItem(element, me.buffer);
                });
            }
        }
        return me.buffer.canvas;
    },

    draw : function(timestamp) {
        var me = AnimationManager,
            dt;
        dt = (timestamp - me.previousRenderTime) || 0;
        AnimationManager.performAnimation(dt);
        me.ctx.drawImage(me.getScene(), 0, 0);
        me.previousRenderTime = timestamp;
        requestAnimationFrame(me.draw);
    },

    drawItem: function(item, ctx) {
        if (!item.visible) return;

        ctx.save();

        //Set position
        //ctx.translate(item.x, item.y);

        ctx.translate(item.x, item.y);

        //Rotation
        ctx.rotate(item.rotation || 0);

        //Opacity
        ctx.globalAlpha = item.opacity || 1;

        //Image or sprite animation
        if (item.image) {
            var res;

            if ((typeof item.image) === "string" ) {
                res = ResourceManager.graphics[item.image];
            } else {
                res = {image: item.image};
            }

            var sx = 0, sy = 0,
                swidth = res.image.width,
                sheight = res.image.height;

            if (Utils.isDefined(res.spriteConfig) && Utils.isDefined(item.sprite)) {
                sx = res.spriteConfig[item.sprite].x;
                sy = res.spriteConfig[item.sprite].y;
                swidth = res.spriteConfig.width;
                sheight = res.spriteConfig.height;
            }

            ctx.drawImage(res.image, sx, sy, swidth, sheight,
                -item.width/2, -item.height/2, item.width, item.height);
        }

        //Canvas
        if (item.canvas) {
            ctx.drawImage(item.canvas, item.x, item.y, item.width, item.height);
        }

        ctx.restore();
    }
};