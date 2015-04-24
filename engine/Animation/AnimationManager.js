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
                item.animationFunction(dt);
                if (!item.checkAlive()){

                }
            });
        });
    },

    getScene : function() {
        var me = AnimationManager;

        me.buffer.clearRect(0,0, me.width, me.height);

        for (var i = 0; i < me.layers.length; i++){
            if(me.layers[i]) {
                me.layers[i].forEach(function(element){

                });
            }
        }

        return me.buffer;
    },

    draw : function()
    {
        var me = AnimationManager,
            tnow = Date.now(),
            dt = tnow - me.previousRenderTime || 0;

        AnimationManager.performAnimation(dt);
        me.ctx.drawImage(me.getScene(), 0, 0);
        me.previousRenderTime = tnow();
        requestAnimationFrame(me.draw);
    }

};