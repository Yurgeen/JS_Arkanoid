UserInputManager = {

    init: function(callback){
        var me = UserInputManager,
            scope = document.getElementById("scene");
        scope.addEventListener("click", me.onMouseClick);
        scope.addEventListener("mousemove", me.onMouseMove);
        scope.addEventListener("contextmenu", me.onMouseRightClick);
        me.fireEvent = EventSystem.fireEvent;
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