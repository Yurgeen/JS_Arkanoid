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

        me.item = new Animation.Item({
            image: "jet",
            x: 200,
            y: 200,
            height: 70,
            width: 80,
            layer: 3
        });
        me.item.animationFunction = function() {
            for ( var key in me.INPUTS._pressed) {
                switch (key) {
                    case "UP" :
                        this.y -= 10;
                        break;
                    case "DOWN" :
                        this.y += 10;
                        break;
                    case "LEFT" :
                        this.x -= 10;
                        break;
                    case "RIGHT" :
                        this.x += 10;
                        break;
                }
            }
        };
        Animation.SceneManager.addItem(me.item);
    },


    start: function(){
        var me = this;
        me.item.play();
    },

    onMouseMove: function(pos){
        var me = this;
        me.item.rotation = Math.atan2(pos.x -  me.item.x, me.item.y - pos.y);
    },

    onMouseClick: function(conf) {
        if (conf.button === "left") {
            this.fireEvent("request:bullets.createBullet", this.item.x + this.item.center.x, this.item.y + this.item.center.y, this.item.rotation);
        }
    },

    onKeyDown: function(key) {
        this.INPUTS.onKeydown(key);
    },

    onKeyUp: function(key) {
        this.INPUTS.onKeyup(key);
    }
});
