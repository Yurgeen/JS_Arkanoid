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

        CollisionManager.couples.push( ["enemy", "enemy"] );

        me.items = [];
    },

    onClicked: function(config) {
        var me = this,
            item;
        if (config.button !== "right") return;

        item = new Enemy(config.pos.x, config.pos.y);

        item.direction = {
            x: Math.random() > 0.5 ? 1 : -1,
            y: Math.random() > 0.5 ? 1 : -1
        };

        me.items.push(item);

        item.play();
        Animation.SpriteManager.registerItem(item, 30, true);
        CollisionManager.registerItem(item, "enemy");
        Animation.SceneManager.addItem(item);
    },

    start: function() {
        var me = this;
        me.fireEvent("request:background.sayHi", "wazzup");
    }

});
