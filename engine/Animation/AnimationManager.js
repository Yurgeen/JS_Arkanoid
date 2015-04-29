AnimationManager = {
    layers : [],

    init : function(callback) {
        var me = AnimationManager,
            scene = document.getElementById("scene"),
            buffer = document.createElement('canvas');

        me.ctx = scene.getContext("2d");
        me.width = scene.width;
        buffer.width = me.width;
        me.height = scene.height;
        buffer.height = me.height;
        me.buffer = buffer.getContext("2d");
        callback();

        me.localTime = 0;
    },

    getNewItemID : function(){
      var ID = 0;
      return (function() {
          return ID++;
      })();
    },

    addItem : function(item) {
        var me = AnimationManager,
            depth = item.getDepths();
        if (!me.layers[depth]) {
            me.layers[depth] = []
        };
        me.layers[depth].push(item);
    },

    removeItem : function(item) {

    },

    performAnimation : function(dt) {
        var me = AnimationManager;
        me.layers.forEach(function(element){
            element.forEach(function(item){
                if (!item.active){
                    item.localTime += dt;
                    item.animationFunction.call(item,dt);
                }
            });
        });
        me.localTime += dt;
    },

    getScene : function() {
        var me = AnimationManager;

        me.buffer.fillStyle = "#ffffff";
        me.buffer.fillRect(0, 0, me.width, me.height);

        for (var i = 0; i < me.layers.length; i++){
            if(me.layers[i]) {
                me.layers[i].forEach(function(element){
                    var sx = 0,sy = 0,
                        swidth = element.image.width,
                        sheight = element.image.height;

                    me.buffer.drawImage(element.image, sx, sy, swidth, sheight,
                        element.x, element.y, element.width, element.height);
                });
            }
        }
        var img = ResourceManager.graphics.explosion,
            fps = 30,
            n = Math.round(me.localTime*fps/1000) % img.spriteConfig.frameN;

        me.buffer.drawImage(img.image, img.spriteConfig[n].x, img.spriteConfig[n].y,
            img.spriteConfig.width, img.spriteConfig.height,
            0, 0, img.spriteConfig.width, img.spriteConfig.height);

        return me.buffer.canvas;
    },

    draw : function()
    {
        var me = AnimationManager,
            tnow = Date.now(),
            dt = tnow - me.previousRenderTime || 0;

        AnimationManager.performAnimation(dt);
        me.ctx.drawImage(me.getScene(), 0, 0);
        me.previousRenderTime = tnow;
        requestAnimationFrame(me.draw);
    }

};