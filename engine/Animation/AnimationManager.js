/** AnimationManager
 * singleton
 *
 * */

AnimationManager = {

    layers : [],
    items : [],

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

        me.layers[layer].push(item);
    },

    removeItem : function(item) {

    },

    performAnimation : function(dt) {
        var me = AnimationManager;

        //ToDo: add here CollisionManger implementation

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

    draw : function()
    {
        var me = AnimationManager,
            tnow = Date.now(),
            dt;
        dt = (tnow - me.previousRenderTime) || 0;
        AnimationManager.performAnimation(dt);
        me.ctx.drawImage(me.getScene(), 0, 0);
        me.previousRenderTime = tnow;
        requestAnimationFrame(me.draw);
    },

    drawItem: function(item, ctx) {

        if (!item.visible) return;

        //Rotation
        ctx.rotate(item.rotation || 0);

        //Opacity
        ctx.globalAlpha = item.opacity || 1;

        //Image or sprite animation
        if (item.image) {
            var img = ResourceManager.graphics[item.image].image,
                sx = 0,sy = 0,
                swidth = item.image.width,
                sheight = item.image.height;

            if (item.image.spriteConfig && item.sprite) {
                sx = item.spriteConfig[item.sprite].x;
                sy = item.spriteConfig[item.sprite].y;
                swidth = item.spriteConfig.width;
                sheight = item.spriteConfig.height;
            }

            ctx.drawImage(img, sx, sy, swidth, sheight,
                item.x, item.y, item.width, item.height);
        }

        //Canvas
        if (item.canvas) {
            ctx.drawImage(item.canvas, item.x, item.y, item.width, item.height);
        }
    }
};