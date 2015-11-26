UserInputManager = {

    KEY_CODE_MAP : {
        UP : [87, 38],
        DOWN : [83, 40],
        LEFT : [65, 37],
        RIGHT : [68, 39]
    },

    init: function(callback){
        var scope = document.getElementById("scene");
        scope.addEventListener("click", this.onMouseClick);
        scope.addEventListener("mousemove", this.onMouseMove);
        scope.addEventListener("contextmenu", this.onMouseRightClick);
        document.addEventListener("keydown", this.onKeyDown);
        document.addEventListener("keyup", this.onKeyUp);

        this.fireEvent = EventSystem.fireEvent;
        callback();
    },

    onMouseMove: function(e) {
        var me = UserInputManager;
        me.fireEvent("notify:UserInputManager.mouseMove", {
                    x: e.clientX,
                    y: e.clientY
                });
    },

    onMouseClick : function(e, right) {
        var me = UserInputManager;
        me.fireEvent("notify:UserInputManager.click", {
            pos: {
                x: e.clientX,
                y: e.clientY
            },
            button : right ? "right" : "left"
        });
    },

    onMouseRightClick: function(e) {
        var me = UserInputManager;
        e.preventDefault();
        me.onMouseClick(e, true);
    },

    onKeyDown: function(e) {
        var me = UserInputManager;
        e.preventDefault();
        for (var key in me.KEY_CODE_MAP) if (me.KEY_CODE_MAP.hasOwnProperty(key)) {
            if (me.KEY_CODE_MAP[key].indexOf(e.keyCode) !== -1) {
                me.fireEvent("notify:UserInputManager.keyDown", key);
            }
        }
    },

    onKeyUp: function(e) {
        var me = UserInputManager;
        e.preventDefault();
        for (var key in me.KEY_CODE_MAP) if (me.KEY_CODE_MAP.hasOwnProperty(key)) {
            if (me.KEY_CODE_MAP[key].indexOf(e.keyCode) !== -1) {
                me.fireEvent("notify:UserInputManager.keyUp", key);
            }
        }
    }

};