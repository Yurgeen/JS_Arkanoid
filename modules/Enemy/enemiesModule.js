var EnemiesModuleConfig = {

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

        /*for(var i = 0; i < 10; i++) {
            item = new Enemy({
                image : "bird",
                x : Math.random() * AnimationManager.width,
                y : Math.random() * AnimationManager.height,
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

            SpriteManager.registerItem(item, 30, true);
            CollisionManager.registerItem(item, Enemy.TYPE);
            AnimationManager.addItem(item);
        }*/
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
        SpriteManager.registerItem(item, 30, true);
        CollisionManager.registerItem(item, Enemy.TYPE);
        AnimationManager.addItem(item);
    },

    start: function() {
        var me = this;
        /*for (var i = 0; i < me.items.length; i++) {
            me.items[i].play();
        }*/
        me.fireEvent("request:background.sayHi", "wazzup");
    }

};

ModuleLoader.registerModule("Enemies", EnemiesModuleConfig);