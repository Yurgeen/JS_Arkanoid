Sugar.useGlobal("Animation");

/** AnimationManager
 * @singleton
 *
 * 
 */

Animation.SceneManager = {
    debug : false,
    layers : [],
    items : {},

    init : function(callback) {
        var me = Animation.SceneManager,
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
        var me = Animation.SceneManager,
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
        var me = Animation.SceneManager;

        CollisionManager.processCollisions();
        Animation.SpriteManager.processFrame(dt);

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
        var me = Animation.SceneManager;

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
        var me = Animation.SceneManager,
            dt;
        dt = (timestamp - me.previousRenderTime) || 0;
        me.performAnimation(dt);
        me.ctx.drawImage(me.getScene(), 0, 0);
        me.previousRenderTime = timestamp;
        requestAnimationFrame(me.draw);
    },

    drawItem: function(item, ctx) {
        if (!item.visible) return;

        ctx.save();

        //Set position
        ctx.translate(item.x + item.center.x, item.y + item.center.y);

        //Rotation
        ctx.rotate(item.rotation || 0);

        //Opacity
        ctx.globalAlpha = item.opacity || 1;

        //Image or sprite animation
        if (item.image) {
            var res;

            if ((typeof item.image) === "string" ) {
                res = Modules.ResourceManager.graphics[item.image];
            } else {
                res = {image: item.image};
            }

            var sx = 0, sy = 0,
                swidth = res.image.width,
                sheight = res.image.height;

            if (Sugar.isDefined(res.spriteConfig) && Sugar.isDefined(item.sprite)) {
                sx = res.spriteConfig[item.sprite].x;
                sy = res.spriteConfig[item.sprite].y;
                swidth = res.spriteConfig.width;
                sheight = res.spriteConfig.height;
            }

            ctx.drawImage(res.image, sx, sy, swidth, sheight,
                -item.center.x, -item.center.y, item.width, item.height);
        }

        //Canvas
        if (item.canvas) {
            ctx.drawImage(item.canvas, item.x - item.center.x, item.y - item.center.y, item.width, item.height);
        }

        if (this.debug) {
            ctx.strokeStyle = "red";
            ctx.strokeRect(-item.center.x, -item.center.y, item.width, item.height);
        }

        ctx.restore();
    }
};