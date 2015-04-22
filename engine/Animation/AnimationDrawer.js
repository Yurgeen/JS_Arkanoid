AnimationDrawer = {
    init : function() {
       var me = this,
           scene = document.getElementById("scene");
       me.ctx = scene.getContext("2d");
    },

    draw : function()
    {
        requestAnimationFrame(draw);

        var me = this,
            tnow = Date.now(),
            dt = tnow - me.previousRenderTime || 0;

        AnimationManager.performAnimation(dt);
        me.ctx.drawImage(AnimationManager.getScene(), 0, 0);
        me.previousRenderTime = tnow();
    }
}