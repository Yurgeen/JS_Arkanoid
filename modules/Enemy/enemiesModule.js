Modules.Loader.registerModule({

    MODULE_NAME : "Enemy",

    subscribe: function() {
        var me = this;
        return {
            "notify:UserInputManager.click" : me.onClicked
        };
    },

    constructor: function() {
        var me = this,
            item;

        CollisionManager.couples.push( [Enemy.TYPE, Enemy.TYPE] );

        me.items = [];
    },

    onClicked: function(config) {
        var me = this,
            item;
        item = new Enemy({
            image : "bird",
            x : config.pos.x,
            y :  config.pos.y,
            layer : 5,
            width : 50,
            height : 50,
            sprite : 0,
            fps : 30
        });

        item.direction = {
            x: Math.random() > 0.5 ? 1 : -1,
            y: Math.random() > 0.5 ? 1 : -1
        };

        me.items.push(item);

        item.play();
        Animation.SpriteManager.registerItem(item, 30, true);
        CollisionManager.registerItem(item, Enemy.TYPE);
        Animation.SceneManager.addItem(item);
    },

    start: function() {
        var me = this;
        me.fireEvent("request:background.sayHi", "wazzup");
    }

});
