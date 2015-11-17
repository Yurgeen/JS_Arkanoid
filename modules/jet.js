Modules.Loader.registerModule({

    MODULE_NAME: "Jet",

    subscribe: function() {
        var me = this;
        return {
            "notify:UserInputManager.mouseMove" : me.onMouseMove
        };
    },

    constructor: function() {
        var me = this;

        me.item = new Animation.Item({
            image: "jet",
            x: 200,
            y: 200,
            height: 70,
            width: 80,
            layer: 3
        });

        Animation.SceneManager.addItem(me.item);
    },


    start: function(){
        var me = this;
        me.item.play();
    },

    onMouseMove: function(pos){
        var me = this;
        me.item.rotation = Math.atan2(pos.x -  me.item.x, me.item.y - pos.y);
    }
});
