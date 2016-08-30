Modules.Loader.registerModule({

    MODULE_NAME: "Jet",

    INPUTS : {
        _pressed: {},

        isDown: function(key) {
            return this._pressed[key];
        },

        onKeydown: function(key) {
            this._pressed[key] = true;
        },

        onKeyup: function(key) {
            delete this._pressed[key];
        }
    },

    subscribe: function() {
        var me = this;
        return {
            "notify:UserInputManager.mouseMove" : me.onMouseMove,
            "notify:UserInputManager.click" : me.onMouseClick,
            "notify:UserInputManager.keyDown" : me.onKeyDown,
            "notify:UserInputManager.keyUp" : me.onKeyUp
        };
    },

    constructor: function() {
        var me = this;

        me.item1 = new Animation.Item({
            image: "jet",
            x: 200,
            y: 200,
            height: 48,
            width: 48,
            layer: 5
        });
        me.item2 = new Animation.Item({
            image: "jet2",
            x: 200,
            y: 200,
            height: 48,
            width: 48,
            layer: 3
        });
        me.item1.animationFunction = function() {
            for ( var key in me.INPUTS._pressed) {
                switch (key) {
                    case "UP" :
                        this.y -= 1;
                        break;
                    case "DOWN" :
                        this.y += 1;
                        break;
                    case "LEFT" :
                        this.x -= 1;
                        break;
                    case "RIGHT" :
                        this.x += 1;
                        break;
                }
            }
        };
        me.item2.animationFunction = me.item1.animationFunction;
        Animation.SceneManager.addItem(me.item1);
        Animation.SceneManager.addItem(me.item2);
    },


    start: function(){
        var me = this;
        me.item1.play();
        me.item2.play();
    },

    onMouseMove: function(pos){
        var me = this,
            alpha = Math.atan2(pos.x - me.item1.x - me.item1.center.x, me.item1.y - pos.y + me.item1.center.y);
        me.item1.rotation = alpha;
        me.item2.rotation = alpha;
    },

    onMouseClick: function(conf) {
        if (conf.button === "left") {
            this.fireEvent("request:bullets.createBullet", this.item1.x + this.item1.center.x, this.item1.y + this.item1.center.y, this.item1.rotation);
        }
    },

    onKeyDown: function(key) {
        this.INPUTS.onKeydown(key);
    },

    onKeyUp: function(key) {
        this.INPUTS.onKeyup(key);
    }
});
