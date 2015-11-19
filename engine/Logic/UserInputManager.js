UserInputManager = {

    init: function(callback){
        var scope = document.getElementById("scene");
        scope.addEventListener("click", this.onMouseClick);
        scope.addEventListener("mousemove", this.onMouseMove);
        scope.addEventListener("contextmenu", this.onMouseRightClick);
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
    }

};